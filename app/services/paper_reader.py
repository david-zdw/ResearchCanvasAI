from __future__ import annotations

import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree


def extract_text(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix in {".txt", ".md", ".csv"}:
        return path.read_text(encoding="utf-8", errors="replace")
    if suffix == ".docx":
        return _extract_docx(path)
    if suffix == ".pdf":
        return _extract_pdf_light(path)
    return path.read_bytes().decode("utf-8", errors="replace")


def analyze_paper(text: str) -> dict:
    compact = normalize_text(text)
    title = _guess_title(compact)
    abstract = _section(compact, "abstract", ["introduction", "keywords", "1."])
    methods = _section(compact, "methods", ["results", "discussion", "conclusion"])
    results = _section(compact, "results", ["discussion", "conclusion", "references"])
    figure_candidates = _figure_candidates(compact)
    keywords = _keywords(compact)
    return {
        "title": title,
        "abstract": abstract[:1800],
        "methods": methods[:1800],
        "results": results[:1800],
        "keywords": keywords,
        "figure_candidates": figure_candidates,
        "preview": compact[:5000],
        "char_count": len(compact),
    }


def normalize_text(text: str) -> str:
    text = text.replace("\x00", " ")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def _extract_docx(path: Path) -> str:
    with zipfile.ZipFile(path) as archive:
        xml = archive.read("word/document.xml")
    root = ElementTree.fromstring(xml)
    namespace = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    paragraphs: list[str] = []
    for paragraph in root.findall(".//w:p", namespace):
        texts = [node.text or "" for node in paragraph.findall(".//w:t", namespace)]
        if texts:
            paragraphs.append("".join(texts))
    return "\n".join(paragraphs)


def _extract_pdf_light(path: Path) -> str:
    raw = path.read_bytes()
    text = raw.decode("latin-1", errors="ignore")
    stream_text = " ".join(re.findall(r"\(([^()]{0,2000})\)", text))
    if len(stream_text) < 500:
        stream_text = re.sub(r"[^A-Za-z0-9\u4e00-\u9fff.,;:!?%()\[\]\-+/=\s]", " ", text)
    return normalize_text(stream_text)


def _guess_title(text: str) -> str:
    for line in text.splitlines():
        cleaned = line.strip()
        if 12 <= len(cleaned) <= 180 and not cleaned.lower().startswith(("abstract", "keywords")):
            return cleaned
    return "Untitled paper"


def _section(text: str, heading: str, end_markers: list[str]) -> str:
    lower = text.lower()
    start = lower.find(heading)
    if start < 0:
        return ""
    end = len(text)
    for marker in end_markers:
        marker_pos = lower.find(marker, start + len(heading))
        if marker_pos > start:
            end = min(end, marker_pos)
    return text[start:end].strip()


def _figure_candidates(text: str) -> list[dict]:
    matches = []
    patterns = [
        r"(Figure|Fig\.)\s*([0-9A-Za-z]+)[\.:]?\s+(.{40,500})",
        r"(图)\s*([0-9A-Za-z]+)[\.:：]?\s+(.{20,300})",
    ]
    for pattern in patterns:
        for match in re.finditer(pattern, text, flags=re.IGNORECASE):
            caption = normalize_text(match.group(3))
            matches.append({"label": f"{match.group(1)} {match.group(2)}", "caption": caption[:360]})
            if len(matches) >= 8:
                return matches
    return matches


def _keywords(text: str) -> list[str]:
    words = re.findall(r"\b[A-Za-z][A-Za-z0-9\-]{4,}\b", text.lower())
    stop = {"therefore", "however", "between", "within", "using", "based", "shown", "figure", "results"}
    counts: dict[str, int] = {}
    for word in words:
        if word not in stop:
            counts[word] = counts.get(word, 0) + 1
    return [word for word, _ in sorted(counts.items(), key=lambda item: item[1], reverse=True)[:16]]

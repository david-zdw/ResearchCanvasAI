const text = {
  requestFailed: "\u8bf7\u6c42\u5931\u8d25",
  processing: "\u5904\u7406\u4e2d",
  reading: "\u8bfb\u53d6\u4e2d",
  readDone: "\u5df2\u8bfb\u53d6",
  readFailed: "\u8bfb\u53d6\u5931\u8d25",
  paperSummary: "\u8bba\u6587\u6458\u8981",
  paperReadDone: "\u8bba\u6587\u8bfb\u53d6\u5b8c\u6210",
  chars: "\u5b57\u7b26",
  extracted: "\u5df2\u63d0\u53d6",
  noAbstract: "\u672a\u8bc6\u522b\u5230\u6458\u8981\uff0c\u4f46\u4ecd\u53ef\u4ee5\u6839\u636e\u5168\u6587\u7247\u6bb5\u751f\u6210\u63d0\u793a\u8bcd\u3002",
  captionGoal: "\u6839\u636e\u8fd9\u6bb5\u56fe\u6ce8\u91cd\u65b0\u7ed8\u5236\u79d1\u7814\u56fe\uff1a",
  generating: "\u751f\u6210\u4e2d",
  promptAi: "AI \u5df2\u751f\u6210",
  promptLocal: "\u672c\u5730\u5df2\u751f\u6210",
  promptDone: "\u63d0\u793a\u8bcd\u751f\u6210\u5b8c\u6210",
  failed: "\u5931\u8d25",
  promptOptimized: "\u63d0\u793a\u8bcd\u5df2\u4f18\u5316",
  promptNote: "\u7ed8\u56fe\u63d0\u793a\u8bcd",
  promptNeeded: "\u8bf7\u5148\u751f\u6210\u6216\u586b\u5199\u63d0\u793a\u8bcd",
  aiFigure: "AI \u79d1\u7814\u56fe",
  imageDone: "\u79d1\u7814\u56fe\u751f\u6210\u5b8c\u6210",
  placeholder: "\u5df2\u751f\u6210\u5360\u4f4d\u56fe\uff0c\u8bf7\u914d\u7f6e API Key \u540e\u91cd\u8bd5",
  textNote: "\u6587\u672c\u6807\u6ce8",
  textNoteBody: "\u5728\u8fd9\u91cc\u8bb0\u5f55\u56fe\u6ce8\u3001\u4fee\u6539\u5efa\u8bae\u6216\u6392\u7248\u8bf4\u660e\u3002",
  noneSelected: "\u672a\u9009\u4e2d",
  selectImage: "\u8bf7\u5148\u9009\u4e2d\u4e00\u5f20\u56fe\u7247",
  cropSourceNeeded: "\u8bf7\u5148\u9009\u4e2d\u751f\u6210\u56fe\u6216\u4e0a\u4f20\u56fe",
  cropDragHint: "\u62d6\u62fd\u6846\u9009\u56fe\u7247\u533a\u57df",
  cropSelectionNeeded: "\u8bf7\u5148\u5728\u56fe\u7247\u4e0a\u6846\u9009\u4e00\u4e2a\u533a\u57df",
  cropSaved: "\u5c40\u90e8\u622a\u56fe\u5df2\u751f\u6210\u4e3a\u56fe\u7247\u8282\u70b9",
  maskNeeded: "\u8bf7\u5148\u6d82\u62b9\u6216\u6846\u9009\u9700\u8981\u91cd\u7ed8\u7684\u533a\u57df",
  maskedRepaintDone: "\u5c40\u90e8\u8499\u7248\u91cd\u7ed8\u5b8c\u6210",
  editImageHint: "\u70b9\u51fb\u56fe\u7247\u53ef\u6253\u5f00\u79d1\u7814\u56fe\u5c40\u90e8\u7f16\u8f91\u5668",
  editImage: "\u79d1\u7814\u56fe\u7f16\u8f91",
  repaint: "\u5c40\u90e8\u91cd\u7ed8",
  upscale: "\u9ad8\u6e05\u653e\u5927",
  vector: "\u77e2\u91cf\u56fe",
  done: "\u5b8c\u6210",
  relayoutDone: "\u5df2\u5feb\u901f\u91cd\u6392\u7248",
  saved: "\u753b\u5e03\u5df2\u4fdd\u5b58\uff1a",
  saving: "\u4fdd\u5b58\u4e2d",
  settingsSaved: "\u5df2\u4fdd\u5b58",
  apiSaved: "API \u8bbe\u7f6e\u5df2\u4fdd\u5b58",
  apiConfigured: "API \u5df2\u914d\u7f6e",
  apiMissing: "API \u672a\u914d\u7f6e",
  providerNew: "\u5df2\u65b0\u589e\u4f9b\u5e94\u5546",
  providerDeleted: "\u4f9b\u5e94\u5546\u5df2\u5220\u9664",
  providerKeyCleared: "\u5df2\u6807\u8bb0\u6e05\u7a7a Key\uff0c\u70b9\u51fb\u4fdd\u5b58\u540e\u751f\u6548",
  settingsMissing: "\u672a\u914d\u7f6e API Key",
  settingsConfigured: "\u5df2\u914d\u7f6e\uff1a",
  syncingModels: "\u540c\u6b65\u6a21\u578b\u4e2d",
  modelsSynced: "\u6a21\u578b\u5df2\u540c\u6b65\uff0c\u8bf7\u4fdd\u5b58\u8bbe\u7f6e",
  modelsSyncFailed: "\u6a21\u578b\u540c\u6b65\u5931\u8d25",
  workspace: "\u5de5\u4f5c\u533a",
  workspaceBody: "\u4e0a\u4f20\u8bba\u6587\u540e\uff0c\u7cfb\u7edf\u4f1a\u63d0\u53d6\u6458\u8981\u3001\u5173\u952e\u8bcd\u548c\u56fe\u6ce8\u5019\u9009\u3002\u751f\u6210\u63d0\u793a\u8bcd\u540e\uff0c\u53ef\u4ee5\u751f\u6210\u79d1\u7814\u56fe\u5e76\u7ee7\u7eed\u7f16\u8f91\u3001\u653e\u5927\u3001\u77e2\u91cf\u5316\u548c\u6392\u7248\u3002",
  imageNode: "\u56fe\u50cf\u8282\u70b9",
  uploadImage: "\u4e0a\u4f20\u56fe\u7247",
  uploadImageDone: "\u56fe\u7247\u5df2\u4e0a\u4f20",
  uploadImageFailed: "\u56fe\u7247\u4e0a\u4f20\u5931\u8d25",
  t2iNode: "\u6587\u751f\u56fe\u8282\u70b9",
  promptNode: "\u63d0\u793a\u8bcd\u8282\u70b9",
  outputArmed: "\u5df2\u9009\u4e2d\u8f93\u51fa\u7aef\u53e3\uff0c\u8bf7\u70b9\u51fb\u4e0b\u6e38\u8282\u70b9\u7684 IN\u3002",
  linked: "\u8282\u70b9\u5df2\u8fde\u63a5",
  imageToImage: "\u56fe\u751f\u56fe",
  textToImage: "\u6587\u751f\u56fe",
  reversePrompt: "\u53cd\u63a8\u63d0\u793a\u8bcd",
  imageToImageHint: "\u8bf7\u5148\u628a\u4e00\u5f20\u6216\u591a\u5f20\u56fe\u7247\u8282\u70b9\u7684 OUT \u8fde\u5230\u56fe\u751f\u56fe\u8282\u70b9\u7684 IN\u3002",
  textToImageHint: "\u8bf7\u5148\u5728\u6587\u751f\u56fe\u8282\u70b9\u91cc\u586b\u5199\u63d0\u793a\u8bcd\u3002",
  reversePromptHint: "\u8bf7\u5148\u628a\u56fe\u7247\u8282\u70b9\u7684 OUT \u8fde\u5230\u53cd\u63a8\u63d0\u793a\u8bcd\u8282\u70b9\u7684 IN\u3002",
  nodePromptPlaceholder: "\u5728\u8fd9\u91cc\u5199\u8be5\u8282\u70b9\u7684\u56fe\u751f\u56fe\u63d0\u793a\u8bcd...",
  textNodePlaceholder: "\u5728\u8fd9\u91cc\u5199\u8be5\u8282\u70b9\u8981\u8f93\u51fa\u7684\u63d0\u793a\u8bcd...",
  reverseNodePlaceholder: "\u8fd9\u91cc\u4f1a\u8f93\u51fa\u56fe\u7247\u53cd\u63a8\u5f97\u5230\u7684\u4fee\u56fe\u63d0\u793a\u8bcd...",
  nodeSize: "\u5c3a\u5bf8",
  nodeRatio: "\u6bd4\u4f8b",
  nodeResolution: "\u5206\u8fa8\u7387\u6863\u4f4d",
  nodeQuality: "\u8d28\u91cf",
  nodeFormat: "\u683c\u5f0f",
  nodeCount: "\u6570\u91cf",
  nodeBackground: "\u80cc\u666f/\u900f\u660e",
  resolution: "\u5206\u8fa8\u7387",
  presetSaved: "\u9884\u8bbe\u5df2\u4fdd\u5b58",
  presetDeleted: "\u9884\u8bbe\u5df2\u5220\u9664",
  presetAdded: "\u9884\u8bbe\u5df2\u52a0\u5165\u753b\u5e03",
  presetNew: "\u6b63\u5728\u65b0\u589e\u9884\u8bbe",
  workflowSaved: "\u5de5\u7a0b\u5df2\u4fdd\u5b58",
  workflowLoaded: "\u5de5\u7a0b\u5df2\u52a0\u8f7d",
  workflowNone: "\u8fd8\u6ca1\u6709\u4fdd\u5b58\u7684\u5de5\u7a0b",
};

const state = {
  paper: null,
  items: [],
  links: [],
  selectedId: null,
  tool: "select",
  viewport: { x: 0, y: 0, scale: 1 },
  drag: null,
  settings: null,
  pendingLink: null,
  linkDrag: null,
  crop: null,
  imageEditor: null,
  promptPresets: [],
  promptPresetCategory: "全部",
  apiProviders: [],
  activeProviderId: null,
  workflows: [],
  canvasId: null,
  canvasTitle: "Research canvas",
  bootstrapped: false,
};

const $ = (id) => document.getElementById(id);
const world = $("canvasWorld");
const wrap = $("canvasWrap");
const template = $("canvasItemTemplate");
const linkLayer = $("linkLayer");

const SIZE_MAP = {
  standard: {
    "1:1": "1024x1024",
    "2:3": "1024x1536",
    "3:2": "1536x1024",
    "3:4": "768x1024",
    "4:3": "1024x768",
    "9:16": "1008x1792",
    "16:9": "1792x1008",
  },
  "2k": {
    "1:1": "2048x2048",
    "2:3": "1344x2016",
    "3:2": "2016x1344",
    "3:4": "1536x2048",
    "4:3": "2048x1536",
    "9:16": "1152x2048",
    "16:9": "2048x1152",
  },
  "4k": {
    "1:1": "2880x2880",
    "2:3": "2336x3504",
    "3:2": "3504x2336",
    "3:4": "2448x3264",
    "4:3": "3264x2448",
    "9:16": "2160x3840",
    "16:9": "3840x2160",
  },
};

async function api(url, payload, method = "POST") {
  const options = { method };
  if (method !== "GET") {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload || {});
  }
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok || data.status === "error") {
    throw new Error(data.message || text.requestFailed);
  }
  return data;
}

function setBusy(button, busy, label) {
  if (!button) return;
  if (busy) {
    button.dataset.label = button.textContent;
    button.textContent = label || text.processing;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.label || button.textContent;
    button.disabled = false;
  }
}

function setStatus(message) {
  $("canvasStatus").textContent = message;
}

function dataUrlToFile(dataUrl, fileName) {
  const [header, payload] = dataUrl.split(",");
  const mime = header.match(/data:([^;]+)/)?.[1] || "image/png";
  const binary = atob(payload || "");
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new File([bytes], fileName, { type: mime });
}

async function uploadImageFile(file) {
  const form = new FormData();
  form.append("image[]", file);
  const response = await fetch("/api/images/upload", { method: "POST", body: form });
  const data = await response.json();
  if (data.status === "error" || !response.ok) throw new Error(data.message || text.requestFailed);
  return data.images?.[0] || data.image;
}

function modelOptions(selectedModel) {
  const configured = state.settings?.image_model || "gpt-image-2";
  const configuredList = state.settings?.image_models || [];
  return [...new Set([configured, ...configuredList, selectedModel].filter(Boolean))]
    .map((model) => ({ model, selected: model === selectedModel }));
}

function linesToModels(value) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function modelsToLines(models) {
  return (models || []).join("\n");
}

function currentProvider() {
  return state.apiProviders.find((provider) => provider.id === state.activeProviderId) || state.apiProviders[0] || null;
}

function renderProviderSelect() {
  const select = $("providerSelect");
  if (!select) return;
  select.innerHTML = "";
  for (const provider of state.apiProviders) {
    const option = document.createElement("option");
    option.value = provider.id;
    option.textContent = `${provider.name || "Provider"}${provider.has_api_key ? " · key" : " · no key"}`;
    option.selected = provider.id === state.activeProviderId;
    select.appendChild(option);
  }
}

function renderProviderForm(provider) {
  if (!provider) return;
  $("providerNameInput").value = provider.name || "Provider";
  $("baseUrlInput").value = provider.base_url || "https://api.openai.com";
  $("textModelInput").value = provider.text_model || "gpt-4.1-mini";
  $("imageModelInput").value = provider.image_model || "gpt-image-2";
  $("textModelsInput").value = modelsToLines(provider.text_models);
  $("imageModelsInput").value = modelsToLines(provider.image_models);
  $("apiKeyInput").value = "";
  $("apiKeyInput").placeholder = provider.has_api_key
    ? `\u5df2\u4fdd\u5b58 ${provider.api_key_hint || "API Key"}\uff1b\u7559\u7a7a\u4e0d\u4fee\u6539`
    : "\u672a\u914d\u7f6e Key\uff1b\u8f93\u5165\u540e\u4fdd\u5b58";
  delete $("apiKeyInput").dataset.dirty;
}

function commitProviderForm() {
  const provider = currentProvider();
  if (!provider) return;
  provider.name = $("providerNameInput").value.trim() || "Provider";
  provider.base_url = $("baseUrlInput").value.trim() || "https://api.openai.com";
  provider.text_model = $("textModelInput").value.trim() || "gpt-4.1-mini";
  provider.image_model = $("imageModelInput").value.trim() || "gpt-image-2";
  provider.text_models = linesToModels($("textModelsInput").value);
  provider.image_models = linesToModels($("imageModelsInput").value);
  if ($("apiKeyInput").dataset.dirty === "true") {
    provider.pending_api_key = $("apiKeyInput").value.trim();
    provider.has_api_key = Boolean(provider.pending_api_key);
    provider.api_key_hint = provider.pending_api_key ? "\u5f85\u4fdd\u5b58" : "";
  }
}

function settingsPayload() {
  commitProviderForm();
  return {
    active_provider_id: state.activeProviderId,
    providers: state.apiProviders.map((provider) => {
      const payload = {
        id: provider.id,
        name: provider.name,
        base_url: provider.base_url,
        text_model: provider.text_model,
        image_model: provider.image_model,
        text_models: provider.text_models,
        image_models: provider.image_models,
      };
      if (Object.prototype.hasOwnProperty.call(provider, "pending_api_key")) {
        payload.api_key = provider.pending_api_key;
      }
      return payload;
    }),
  };
}

function newProviderConfig() {
  return {
    id: `provider_${crypto.randomUUID()}`,
    name: "\u65b0\u4f9b\u5e94\u5546",
    has_api_key: false,
    api_key_hint: "",
    base_url: "https://api.openai.com",
    text_model: "gpt-4.1-mini",
    image_model: "gpt-image-2",
    text_models: ["gpt-4.1-mini"],
    image_models: ["gpt-image-2"],
    pending_api_key: "",
  };
}

/*
Legacy prompt preset implementation disabled. The categorized library implementation
near the end of this file now owns loading, rendering, saving, and deleting presets.
async function loadPromptPresets() {
  const data = await api("/api/prompts/presets", null, "GET");
  state.promptPresets = data.presets || [];
  renderPromptPresets(state.promptPresets[0]?.id || "");
}

async function savePromptPreset() {
  const name = $("presetNameInput").value.trim() || "Untitled preset";
  const prompt = $("presetPromptInput").value.trim() || $("promptOutput").value.trim();
  const category = $("presetCategoryInput").value.trim() || "未分类";
  const reference_image = $("presetReferenceInput").value.trim();
  const keywords = $("presetKeywordsInput").value.trim();
  if (!prompt) {
    $("presetStatus").textContent = text.promptNeeded;
    return;
  }
  const data = await api("/api/prompts/presets/save", {
    id: $("presetSelect").value || $("presetCardGrid").querySelector("[data-selected='true']")?.dataset.presetId || null,
    name,
    prompt,
    category,
    reference_image,
    keywords,
  });
  state.promptPresets = data.presets || [];
  renderPromptPresets(data.preset?.id);
  $("presetStatus").textContent = text.presetSaved;
}

async function deletePromptPreset() {
  const selectedId = $("presetSelect").value || $("presetCardGrid").querySelector("[data-selected='true']")?.dataset.presetId;
  if (!selectedId) return;
  const data = await api("/api/prompts/presets/delete", { id: selectedId });
  state.promptPresets = data.presets || [];
  renderPromptPresets();
  $("presetStatus").textContent = text.presetDeleted;
}

function renderPromptPresets(selectedId) {
  const search = ($("presetSearchInput")?.value || "").trim().toLowerCase();
  const groups = new Map();
  const categories = [];
  for (const preset of state.promptPresets) {
    const category = preset.category || "未分类";
    if (!groups.has(category)) {
      groups.set(category, []);
      categories.push(category);
    }
    const haystack = [preset.name, preset.category, preset.prompt, preset.keywords?.join(" "), preset.reference_image].join(" ").toLowerCase();
    if (!search || haystack.includes(search)) {
      groups.get(category).push(preset);
    }
  }
  const categoryList = $("presetCategoryList");
  const grid = $("presetCardGrid");
  if (!categoryList || !grid) return;
  if (!state.promptPresetCategory || !groups.has(state.promptPresetCategory)) {
    state.promptPresetCategory = categories[0] || "全部";
  }
  categoryList.innerHTML = "";
  const categoryButtons = [
    { label: "全部", value: "全部", count: state.promptPresets.filter((preset) => !search || [preset.name, preset.category, preset.prompt, preset.keywords?.join(" "), preset.reference_image].join(" ").toLowerCase().includes(search)).length },
    ...categories.map((category) => ({ label: category, value: category, count: groups.get(category)?.length || 0 })),
  ];
  for (const item of categoryButtons) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `preset-chip${state.promptPresetCategory === item.value ? " active" : ""}`;
    button.textContent = `${item.label} (${item.count})`;
    button.addEventListener("click", () => {
      state.promptPresetCategory = item.value;
      renderPromptPresets(selectedId);
    });
    categoryList.appendChild(button);
  }
  grid.innerHTML = "";
  const visible = [];
  for (const category of categories) {
    if (state.promptPresetCategory !== "全部" && state.promptPresetCategory !== category) {
      continue;
    }
    visible.push(...(groups.get(category) || []));
  }
  if (!visible.length) {
    $("presetLibraryCount").textContent = "0";
  } else {
    $("presetLibraryCount").textContent = String(visible.length);
  }
  for (const preset of visible) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `preset-card${preset.id === (selectedId || $("presetSelect").value) ? " selected" : ""}`;
    card.dataset.presetId = preset.id;
    card.dataset.selected = preset.id === (selectedId || $("presetSelect").value) ? "true" : "false";
    card.innerHTML = `
      <div class="preset-card-head">
        <div>
          <strong>${escapeHtml(preset.name || "Untitled")}</strong>
          <span>${escapeHtml(preset.category || "未分类")}</span>
        </div>
        <small>${escapeHtml((preset.keywords || []).slice(0, 3).join(" · "))}</small>
      </div>
      <p>${escapeHtml((preset.prompt || "").slice(0, 180))}</p>
      <div class="preset-card-foot">
        <span>${preset.reference_image ? "有参考图" : "无参考图"}</span>
        <span>加入画布</span>
      </div>
    `;
    card.addEventListener("click", () => selectPromptPreset(preset.id));
    grid.appendChild(card);
  }
  const active = state.promptPresets.find((preset) => preset.id === (selectedId || $("presetSelect")?.value)) || visible[0] || state.promptPresets[0] || null;
  if (active) {
    selectPromptPreset(active.id, { quiet: true });
  } else {
    fillPresetEditor(null);
  }
  $("presetLibraryCount").textContent = String(visible.length);
  $("presetCurrentCategory").textContent = state.promptPresetCategory || "全部";
}

function fillPresetEditor(preset) {
  $("presetSelect").value = preset?.id || "";
  $("presetNameInput").value = preset?.name || "";
  $("presetCategoryInput").value = preset?.category || "未分类";
  $("presetPromptInput").value = preset?.prompt || "";
  $("presetReferenceInput").value = preset?.reference_image || "";
  $("presetKeywordsInput").value = (preset?.keywords || []).join("、");
  $("presetStatus").textContent = preset ? `${preset.category || "未分类"} · ${preset.name || "Untitled"}` : text.workflowNone;
  for (const card of $("presetCardGrid").querySelectorAll(".preset-card")) {
    card.dataset.selected = card.dataset.presetId === preset?.id ? "true" : "false";
    card.classList.toggle("selected", card.dataset.presetId === preset?.id);
  }
}

function selectPromptPreset(presetId, options = {}) {
  const preset = state.promptPresets.find((entry) => entry.id === presetId) || null;
  fillPresetEditor(preset);
  if (!options.quiet && preset) {
    $("presetStatus").textContent = `${preset.category || "未分类"} · ${preset.name}`;
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

*/

function renderModelSelect(select, selectedModel) {
  select.innerHTML = "";
  for (const option of modelOptions(selectedModel)) {
    const node = document.createElement("option");
    node.value = option.model;
    node.textContent = option.model;
    node.selected = option.selected;
    select.appendChild(node);
  }
}

function textModelOptions(selectedModel) {
  const configured = state.settings?.text_model || "gpt-4.1-mini";
  const configuredList = state.settings?.text_models || [];
  return [...new Set([configured, ...configuredList, selectedModel].filter(Boolean))]
    .map((model) => ({ model, selected: model === selectedModel }));
}

function renderTextModelSelect(select, selectedModel) {
  if (!select) return;
  select.innerHTML = "";
  for (const option of textModelOptions(selectedModel)) {
    const node = document.createElement("option");
    node.value = option.model;
    node.textContent = option.model;
    node.selected = option.selected;
    select.appendChild(node);
  }
}

function nodeUsesModel(item) {
  return ["text-to-image", "image-to-image", "image-edit", "upscale", "vector", "generated-image", "reverse-prompt"].includes(item?.nodeKind);
}

function nodeUsesTextModel(item) {
  return item?.nodeKind === "reverse-prompt";
}

function renderNodeModelSelect(select, item, selectedModel) {
  if (nodeUsesTextModel(item)) {
    renderTextModelSelect(select, selectedModel || state.settings?.text_model);
  } else {
    renderModelSelect(select, selectedModel || state.settings?.image_model);
  }
}

function nodeHasEditableText(item) {
  return ["prompt", "text-to-image", "image-to-image", "reverse-prompt", "note"].includes(item?.nodeKind) && item?.type !== "image" && item?.type !== "svg";
}

function nodeAcceptsInput(item) {
  return item?.nodeKind !== "uploaded-image";
}

function nodeAcceptsMultipleInputs(item) {
  return item?.nodeKind === "image-to-image";
}

function imageGenerationOptions(item) {
  const ratio = item?.imageRatio || "auto";
  const resolution = item?.imageResolution || "standard";
  const mappedSize = resolveImageSize(ratio, resolution);
  return {
    size: mappedSize || "auto",
    ratio,
    resolution,
    quality: item?.imageQuality || "auto",
    output_format: item?.outputFormat || "png",
    n: item?.imageCount || 1,
    background: item?.imageBackground || "auto",
  };
}

function resolveImageSize(ratio, resolution) {
  if (ratio && ratio !== "auto" && resolution && resolution !== "auto") {
    return SIZE_MAP[resolution]?.[ratio] || null;
  }
  return null;
}

function resolutionText(item) {
  const width = item?.imageWidth || item?.image_width || item?.width_px;
  const height = item?.imageHeight || item?.image_height || item?.height_px;
  if (!width || !height) return "";
  return `${width} x ${height}`;
}

function toolbarGenerationOptions() {
  const ratio = $("toolbarRatio")?.value || "auto";
  const resolution = $("toolbarResolution")?.value || "standard";
  return {
    ratio,
    resolution,
    size: resolveImageSize(ratio, resolution) || "auto",
    quality: "auto",
    output_format: "png",
    n: 1,
    background: "auto",
  };
}

function updateToolbarSizeLabel() {
  const options = toolbarGenerationOptions();
  const label = $("toolbarSizeLabel");
  if (label) label.textContent = options.size === "auto" ? "Auto" : options.size.replace("x", " x ");
}

function applyViewport() {
  const { x, y, scale } = state.viewport;
  const transform = `translate(${x}px, ${y}px) scale(${scale})`;
  world.style.transform = transform;
  document.querySelector(".canvas-grid").style.transform = transform;
  $("zoomLabel").textContent = `${Math.round(scale * 100)}%`;
  renderLinks();
}

function renderCanvas() {
  world.innerHTML = "";
  for (const item of state.items) {
    const node = template.content.firstElementChild.cloneNode(true);
    node.dataset.id = item.id;
    node.style.transform = `translate(${item.x}px, ${item.y}px)`;
    node.style.width = `${item.width || 360}px`;
    node.classList.toggle("selected", item.id === state.selectedId);
    node.classList.toggle("no-input", !nodeAcceptsInput(item));
    node.querySelector(".item-title").textContent = item.title || item.type;
    node.querySelector(".node-type-label").textContent = item.nodeKind || item.type || "node";

    const modelSelect = node.querySelector(".node-model-select");
    if (nodeUsesModel(item)) {
      renderNodeModelSelect(modelSelect, item, item.model);
      modelSelect.addEventListener("pointerdown", (event) => event.stopPropagation());
      modelSelect.addEventListener("change", (event) => {
        item.model = event.target.value;
        if (item.id === state.selectedId) $("selectedModel").value = item.model;
      });
    } else {
      modelSelect.remove();
      node.classList.add("no-model");
    }

    const body = node.querySelector(".item-body");
    if (nodeHasEditableText(item)) {
      const promptBox = document.createElement("textarea");
      promptBox.className = "node-prompt-input";
      promptBox.placeholder = item.nodeKind === "reverse-prompt"
        ? text.reverseNodePlaceholder
        : (["image-to-image", "text-to-image"].includes(item.nodeKind) ? text.nodePromptPlaceholder : text.textNodePlaceholder);
      promptBox.value = item.prompt || item.text || "";
      promptBox.addEventListener("pointerdown", (event) => event.stopPropagation());
      promptBox.addEventListener("input", (event) => {
        item.prompt = event.target.value;
        item.text = event.target.value;
      });
      body.appendChild(promptBox);
      if (item.nodeKind === "text-to-image") {
        body.appendChild(imageOptionControls(item));
        const runButton = document.createElement("button");
        runButton.type = "button";
        runButton.className = "node-run-btn";
        runButton.textContent = "\u542f\u52a8\u6587\u751f\u56fe";
        runButton.addEventListener("pointerdown", (event) => event.stopPropagation());
        runButton.addEventListener("click", (event) => {
          event.stopPropagation();
          runTextToImage(item.id, runButton);
        });
        body.appendChild(runButton);
      } else if (item.nodeKind === "image-to-image") {
        const sourceCount = imageSourcesForItem(item).length;
        const sourceHint = document.createElement("p");
        sourceHint.className = "node-source-count";
        sourceHint.textContent = `\u53c2\u8003\u56fe\uff1a${sourceCount}`;
        body.appendChild(sourceHint);
        body.appendChild(imageOptionControls(item));
        const runButton = document.createElement("button");
        runButton.type = "button";
        runButton.className = "node-run-btn";
        runButton.textContent = "\u542f\u52a8\u56fe\u751f\u56fe";
        runButton.addEventListener("pointerdown", (event) => event.stopPropagation());
        runButton.addEventListener("click", (event) => {
          event.stopPropagation();
          runImageToImage(item.id, runButton);
        });
        body.appendChild(runButton);
      } else if (item.nodeKind === "reverse-prompt") {
        const sourceCount = imageSourcesForItem(item).length;
        const sourceHint = document.createElement("p");
        sourceHint.className = "node-source-count";
        sourceHint.textContent = `\u8f93\u5165\u56fe\uff1a${sourceCount}`;
        body.appendChild(sourceHint);
        const runButton = document.createElement("button");
        runButton.type = "button";
        runButton.className = "node-run-btn";
        runButton.textContent = "\u542f\u52a8\u53cd\u63a8";
        runButton.addEventListener("pointerdown", (event) => event.stopPropagation());
        runButton.addEventListener("click", (event) => {
          event.stopPropagation();
          runReversePrompt(item.id, runButton);
        });
        body.appendChild(runButton);
      }
    } else if (item.type === "image" || item.type === "svg") {
      if (item.generationStatus === "loading") {
        const loading = document.createElement("div");
        loading.className = "image-loading-card";
        loading.innerHTML = `
          <div class="image-loading-spinner" aria-hidden="true"></div>
          <strong>${text.generating}</strong>
          <span>${item.generationProgress || ""}</span>
        `;
        body.appendChild(loading);
        if (item.provider_note) {
          const note = document.createElement("p");
          note.textContent = item.provider_note;
          body.appendChild(note);
        }
      } else {
      const img = document.createElement("img");
      img.src = item.url || "";
      img.alt = item.title || "generated figure";
      img.title = text.editImageHint;
      img.addEventListener("pointerdown", (event) => event.stopPropagation());
      img.addEventListener("click", (event) => {
        event.stopPropagation();
        selectItem(item.id);
        openImageEditor(item);
      });
      img.addEventListener("load", () => {
        if ((!item.imageWidth || !item.imageHeight) && img.naturalWidth && img.naturalHeight) {
          item.imageWidth = img.naturalWidth;
          item.imageHeight = img.naturalHeight;
          renderCanvas();
        }
      }, { once: true });
      body.appendChild(img);
      const resolution = resolutionText(item);
      if (resolution) {
        const badge = document.createElement("p");
        badge.className = "image-resolution";
        badge.textContent = `${text.resolution}: ${resolution}`;
        body.appendChild(badge);
      }
      if (item.provider_note) {
        const note = document.createElement("p");
        note.textContent = item.provider_note;
        body.appendChild(note);
      }
      }
    } else {
      body.textContent = item.text || "";
    }

    node.querySelector('[data-action="delete"]').addEventListener("click", (event) => {
      event.stopPropagation();
      state.items = state.items.filter((entry) => entry.id !== item.id);
      state.links = state.links.filter((link) => link.from !== item.id && link.to !== item.id);
      if (state.selectedId === item.id) state.selectedId = null;
      renderCanvas();
      updateSelectionPanel();
    });
    if (!nodeAcceptsInput(item)) {
      node.querySelectorAll('[data-port="input"]').forEach((port) => port.remove());
    }
    node.querySelectorAll("[data-port]").forEach((port) => {
      port.addEventListener("click", (event) => handlePortClick(event, item.id, port.dataset.port));
      port.addEventListener("pointerdown", (event) => handlePortPointerDown(event, item.id, port.dataset.port));
    });
    if (state.pendingLink?.from === item.id) {
      node.querySelector('[data-port="output"]').classList.add("armed");
    }
    node.addEventListener("click", (event) => handleNodeLinkClick(event, item.id));
    node.addEventListener("pointerdown", (event) => startItemDrag(event, item.id));
    world.appendChild(node);
  }
  renderLinks();
}

function imageOptionControls(item) {
  const options = imageGenerationOptions(item);
  const controls = document.createElement("div");
  controls.className = "node-generation-options";
  controls.appendChild(optionField(text.nodeRatio, "imageRatio", options.ratio, [
    ["auto", "Auto"],
    ["1:1", "1:1"],
    ["2:3", "2:3"],
    ["3:2", "3:2"],
    ["3:4", "3:4"],
    ["4:3", "4:3"],
    ["9:16", "9:16"],
    ["16:9", "16:9"],
  ], item));
  controls.appendChild(optionField(text.nodeResolution, "imageResolution", options.resolution, [
    ["auto", "Auto"],
    ["standard", "Standard"],
    ["2k", "2K"],
    ["4k", "4K"],
  ], item));
  controls.appendChild(readonlyOptionField(text.nodeSize, options.size === "auto" ? "Auto" : options.size.replace("x", " x ")));
  controls.appendChild(optionField(text.nodeQuality, "imageQuality", options.quality, [
    ["auto", "Auto"],
    ["low", "Low"],
    ["medium", "Medium"],
    ["high", "High"],
  ], item));
  controls.appendChild(optionField(text.nodeFormat, "outputFormat", options.output_format, [
    ["png", "PNG"],
    ["webp", "WebP"],
    ["jpeg", "JPEG"],
  ], item));
  controls.appendChild(optionField(text.nodeCount, "imageCount", String(options.n), [
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["4", "4"],
  ], item));
  controls.appendChild(optionField(text.nodeBackground, "imageBackground", options.background, [
    ["auto", "Auto"],
    ["opaque", "Opaque"],
    ["transparent", "Transparent"],
  ], item));
  return controls;
}

function optionField(labelText, key, value, options, item) {
  const label = document.createElement("label");
  label.className = "node-option-field";
  const span = document.createElement("span");
  span.textContent = labelText;
  const select = document.createElement("select");
  select.value = String(value);
  for (const [optionValue, optionLabel] of options) {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionLabel;
    option.selected = String(value) === optionValue;
    select.appendChild(option);
  }
  select.addEventListener("pointerdown", (event) => event.stopPropagation());
  select.addEventListener("change", (event) => {
    item[key] = key === "imageCount" ? Number(event.target.value) : event.target.value;
  });
  label.append(span, select);
  return label;
}

function readonlyOptionField(labelText, value) {
  const label = document.createElement("label");
  label.className = "node-option-field node-option-readonly";
  const span = document.createElement("span");
  span.textContent = labelText;
  const output = document.createElement("output");
  output.textContent = value;
  label.append(span, output);
  return label;
}

function handlePortClick(event, itemId, port) {
  event.stopPropagation();
  if (state.linkDrag) return;
  if (port === "output") {
    state.pendingLink = { from: itemId };
    setStatus(text.outputArmed);
    renderCanvas();
    return;
  }
  if (!state.pendingLink || state.pendingLink.from === itemId) return;
  connectNodes(state.pendingLink.from, itemId);
}

function addItem(item) {
  const id = item.id || `item_${crypto.randomUUID()}`;
  state.items.push({
    id,
    x: item.x ?? Math.round(60 - state.viewport.x),
    y: item.y ?? Math.round(60 - state.viewport.y),
    width: item.width || 360,
    height: item.height,
    model: item.model || (nodeUsesTextModel(item) ? state.settings?.text_model || "gpt-4.1-mini" : (nodeUsesModel(item) ? state.settings?.image_model || "gpt-image-2" : "")),
    nodeKind: item.nodeKind || item.type || "node",
    ...item,
    id,
  });
  state.selectedId = id;
  renderCanvas();
  updateSelectionPanel();
}

function selectItem(id) {
  state.selectedId = id;
  renderCanvas();
  updateSelectionPanel();
}

function selectedItem() {
  return state.items.find((item) => item.id === state.selectedId);
}

function itemById(id) {
  return state.items.find((item) => item.id === id);
}

function linkedInputItem(targetId) {
  const link = state.links.find((entry) => entry.to === targetId);
  return link ? itemById(link.from) : null;
}

function linkedInputItems(targetId) {
  return state.links
    .filter((entry) => entry.to === targetId)
    .map((entry) => itemById(entry.from))
    .filter(Boolean);
}

function imageSourceForItem(item) {
  const sources = imageSourcesForItem(item);
  return sources[0] || null;
}

function imageSourcesForItem(item) {
  if (!item) return [];
  if (item.image_id) return [item];
  return linkedInputItems(item.id).filter((entry) => entry.image_id);
}

function promptSourceForItem(item) {
  if (!item) return "";
  if ((item.prompt || item.text || "").trim()) return (item.prompt || item.text).trim();
  const source = linkedInputItems(item.id).find((entry) => !entry.image_id && (entry.prompt || entry.text || "").trim());
  return source ? (source.prompt || source.text || "").trim() : "";
}

function updateSelectionPanel() {
  const item = selectedItem();
  $("selectionStatus").textContent = item ? item.nodeKind || item.type : text.noneSelected;
  $("selectedTitle").value = item?.title || "";
  renderNodeModelSelect($("selectedModel"), item, item?.model);
  $("selectedModel").disabled = !item || !nodeUsesModel(item);
}

function startItemDrag(event, id) {
  if (event.target.dataset.action || event.target.dataset.port) return;
  const item = itemById(id);
  if (!item) return;
  if (state.tool === "select" && !isInteractiveNodeTarget(event.target)) {
    selectItem(id);
    startLinkDrag(id, event);
    event.preventDefault();
    return;
  }
  selectItem(id);
  state.drag = {
    type: "item",
    id,
    startX: event.clientX,
    startY: event.clientY,
    itemX: item.x,
    itemY: item.y,
    scale: state.viewport.scale,
  };
  event.currentTarget.setPointerCapture(event.pointerId);
}

function isInteractiveNodeTarget(target) {
  return Boolean(target.closest("button, input, select, textarea, img, [data-action], [data-port], .item-head"));
}

function startPan(event) {
  state.drag = {
    type: "pan",
    startX: event.clientX,
    startY: event.clientY,
    x: state.viewport.x,
    y: state.viewport.y,
  };
  wrap.classList.add("dragging");
}

function portPoint(item, port) {
  const node = world.querySelector(`[data-id="${item.id}"]`);
  const selector = port === "out" ? ".port-out" : ".port-in";
  const portNode = node?.querySelector(selector);
  if (portNode) {
    return elementCenterInWrap(portNode);
  }
  const width = item.width || 360;
  const height = node ? node.offsetHeight : (item.height || (item.type === "image" || item.type === "svg" ? 390 : 190));
  const worldX = item.x + (port === "out" ? width : 0);
  const worldY = item.y + height / 2;
  return worldPointToScreen(worldX, worldY);
}

function worldPointToScreen(worldX, worldY) {
  return {
    x: wrap.clientWidth / 2 + state.viewport.x + worldX * state.viewport.scale,
    y: wrap.clientHeight / 2 + state.viewport.y + worldY * state.viewport.scale,
  };
}

function elementCenterInWrap(element) {
  const wrapRect = wrap.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 - wrapRect.left,
    y: rect.top + rect.height / 2 - wrapRect.top,
  };
}

function pointerPointInWrap(event) {
  const rect = wrap.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function linkPath(start, end, className = "link-path") {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const tension = Math.max(70, Math.abs(end.x - start.x) * 0.42);
  path.setAttribute("d", `M ${start.x} ${start.y} C ${start.x + tension} ${start.y}, ${end.x - tension} ${end.y}, ${end.x} ${end.y}`);
  path.setAttribute("class", className);
  return path;
}

function renderLinks() {
  if (!linkLayer) return;
  linkLayer.innerHTML = "";
  linkLayer.setAttribute("viewBox", `0 0 ${wrap.clientWidth} ${wrap.clientHeight}`);
  for (const link of state.links) {
    const from = itemById(link.from);
    const to = itemById(link.to);
    if (!from || !to) continue;
    linkLayer.appendChild(linkPath(portPoint(from, "out"), portPoint(to, "in")));
  }
  if (state.linkDrag?.from) {
    const from = itemById(state.linkDrag.from);
    if (from) {
      linkLayer.appendChild(linkPath(portPoint(from, "out"), state.linkDrag.toPoint, "link-path pending"));
    }
  }
}

function connectNodes(fromId, toId) {
  if (!fromId || !toId || fromId === toId) return false;
  const target = itemById(toId);
  if (!nodeAcceptsInput(target)) return false;
  if (nodeAcceptsMultipleInputs(target)) {
    state.links = state.links.filter((link) => !(link.from === fromId && link.to === toId));
  } else {
    state.links = state.links.filter((link) => link.to !== toId);
  }
  state.links.push({ from: fromId, to: toId });
  state.pendingLink = null;
  setStatus(text.linked);
  renderCanvas();
  return true;
}

function startLinkDrag(fromId, event) {
  const source = itemById(fromId);
  if (!source) return;
  state.pendingLink = { from: fromId };
  state.linkDrag = { from: fromId, toPoint: pointerPointInWrap(event), startedAt: Date.now() };
  wrap.classList.add("linking");
  setStatus(text.outputArmed);
  renderLinks();
}

function finishLinkDrag(event) {
  if (!state.linkDrag) return;
  const fromId = state.linkDrag.from;
  const targetNode = document.elementFromPoint(event.clientX, event.clientY)?.closest(".canvas-item");
  const toId = targetNode?.dataset.id;
  state.linkDrag = null;
  if (!connectNodes(fromId, toId)) {
    state.pendingLink = null;
    renderCanvas();
  }
}

function handlePortPointerDown(event, itemId, port) {
  event.stopPropagation();
  if (port === "output") {
    event.preventDefault();
    startLinkDrag(itemId, event);
  }
}

function handleNodeLinkClick(event, itemId) {
  if (event.defaultPrevented || event.target.closest("button, input, select, textarea, img, [data-action], [data-port]")) return;
  if (!state.pendingLink || state.pendingLink.from === itemId) return;
  connectNodes(state.pendingLink.from, itemId);
}

document.addEventListener("pointermove", (event) => {
  if (state.linkDrag) {
    state.linkDrag.toPoint = pointerPointInWrap(event);
    renderLinks();
    return;
  }
  if (!state.drag) return;
  if (state.drag.type === "item") {
    const item = itemById(state.drag.id);
    if (!item) return;
    item.x = state.drag.itemX + (event.clientX - state.drag.startX) / state.drag.scale;
    item.y = state.drag.itemY + (event.clientY - state.drag.startY) / state.drag.scale;
    const node = world.querySelector(`[data-id="${item.id}"]`);
    if (node) node.style.transform = `translate(${item.x}px, ${item.y}px)`;
    renderLinks();
  }
  if (state.drag.type === "pan") {
    state.viewport.x = state.drag.x + event.clientX - state.drag.startX;
    state.viewport.y = state.drag.y + event.clientY - state.drag.startY;
    applyViewport();
  }
});

document.addEventListener("pointerup", (event) => {
  if (state.linkDrag) {
    finishLinkDrag(event);
    wrap.classList.remove("linking");
    return;
  }
  state.drag = null;
  wrap.classList.remove("dragging");
  renderLinks();
});

window.addEventListener("resize", renderLinks);

wrap.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".canvas-item")) return;
  if (state.tool === "pan" || event.button === 1 || event.altKey) {
    startPan(event);
  } else {
    state.selectedId = null;
    state.pendingLink = null;
    renderCanvas();
    updateSelectionPanel();
  }
});

wrap.addEventListener("wheel", (event) => {
  event.preventDefault();
  const delta = event.deltaY > 0 ? 0.9 : 1.1;
  state.viewport.scale = Math.min(3, Math.max(0.25, state.viewport.scale * delta));
  applyViewport();
}, { passive: false });

document.querySelectorAll("[data-tool]").forEach((button) => {
  button.addEventListener("click", () => {
    state.tool = button.dataset.tool;
    document.querySelectorAll("[data-tool]").forEach((entry) => entry.classList.remove("active"));
    button.classList.add("active");
  });
});

$("paperInput").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const form = new FormData();
  form.append("paper", file);
  $("paperStatus").textContent = text.reading;
  try {
    const response = await fetch("/api/papers/upload", { method: "POST", body: form });
    const data = await response.json();
    if (data.status === "error") throw new Error(data.message);
    state.paper = data.paper;
    renderPaper();
    addItem({
      id: `paper_${state.paper.id}`,
      type: "note",
      nodeKind: "paper",
      title: text.paperSummary,
      text: `${state.paper.title}\n\n${state.paper.abstract || state.paper.preview}`,
      x: -520,
      y: -240,
      width: 420,
    });
    $("paperStatus").textContent = text.readDone;
    setStatus(text.paperReadDone);
  } catch (error) {
    $("paperStatus").textContent = text.readFailed;
    setStatus(error.message);
  }
});

function renderPaper() {
  const paper = state.paper;
  if (!paper) return;
  $("paperCard").classList.remove("hidden");
  $("paperTitle").textContent = paper.title;
  $("paperMeta").textContent = `${paper.filename} - ${paper.char_count || 0} ${text.chars}`;
  $("summaryStatus").textContent = text.extracted;
  $("summaryBox").textContent = paper.abstract || paper.preview || text.noAbstract;
  $("keywordList").innerHTML = "";
  for (const keyword of paper.keywords || []) {
    const chip = document.createElement("span");
    chip.textContent = keyword;
    $("keywordList").appendChild(chip);
  }
  $("captionList").innerHTML = "";
  const captions = paper.figure_candidates || [];
  $("captionCount").textContent = String(captions.length);
  for (const caption of captions) {
    const button = document.createElement("button");
    button.textContent = `${caption.label}: ${caption.caption}`;
    button.addEventListener("click", () => {
      $("goalInput").value = `${text.captionGoal}${caption.label}: ${caption.caption}`;
    });
    $("captionList").appendChild(button);
  }
}

$("generatePromptBtn").addEventListener("click", async () => {
  const button = $("generatePromptBtn");
  setBusy(button, true, text.generating);
  $("promptStatus").textContent = text.generating;
  try {
    const data = await api("/api/prompts/generate", {
      paper_id: state.paper?.id,
      goal: $("goalInput").value,
      figure_type: $("figureType").value,
      style: $("styleInput").value,
      model: $("promptModelSelect").value,
    });
    $("promptOutput").value = data.prompt.prompt;
    $("promptStatus").textContent = data.prompt.source === "api" ? text.promptAi : text.promptLocal;
    setStatus(data.prompt.provider_note || text.promptDone);
  } catch (error) {
    $("promptStatus").textContent = text.failed;
    setStatus(error.message);
  } finally {
    setBusy(button, false);
  }
});

$("rewritePromptBtn").addEventListener("click", async () => {
  const instruction = $("editInstruction").value || "Make it clearer, more publication-ready, and better organized.";
  const data = await api("/api/prompts/rewrite", {
    prompt: $("promptOutput").value,
    instruction,
    model: $("promptModelSelect").value,
  });
  $("promptOutput").value = data.prompt.prompt;
  setStatus(text.promptOptimized);
});

$("addPromptNoteBtn").addEventListener("click", () => {
  addItem({ type: "note", nodeKind: "prompt", title: text.promptNote, text: $("promptOutput").value, x: -40, y: -180, width: 460 });
});

$("openPresetBtn").addEventListener("click", async () => {
  await loadPromptPresets();
  if ($("promptOutput").value.trim()) {
    $("presetNameInput").value = "Current prompt";
    $("presetPromptInput").value = $("promptOutput").value.trim();
    $("presetSelect").value = "";
  }
  $("presetDialog").showModal();
});

$("promptRepoBtn").addEventListener("click", () => {
  $("promptRepoDialog").showModal();
});

$("promptRepoDialog")?.addEventListener("click", (event) => {
  if (event.target === $("promptRepoDialog")) {
    $("promptRepoDialog").close();
  }
});

$("drawingRefBtn").addEventListener("click", () => {
  $("drawingRefDialog").showModal();
});

$("drawingRefDialog")?.addEventListener("click", (event) => {
  if (event.target === $("drawingRefDialog")) {
    $("drawingRefDialog").close();
  }
});

$("presetSelect").addEventListener("change", () => {
  const preset = state.promptPresets.find((entry) => entry.id === $("presetSelect").value);
  if (!preset) return;
  $("presetNameInput").value = preset.name;
  $("presetPromptInput").value = preset.prompt;
});

$("newPresetBtn").addEventListener("click", () => {
  $("presetSelect").value = "";
  $("presetNameInput").value = "";
  $("presetPromptInput").value = $("promptOutput").value.trim();
  $("presetStatus").textContent = text.presetNew;
});

$("savePresetBtn").addEventListener("click", async () => {
  try {
    await savePromptPreset();
  } catch (error) {
    $("presetStatus").textContent = error.message;
  }
});

$("deletePresetBtn").addEventListener("click", async () => {
  try {
    await deletePromptPreset();
  } catch (error) {
    $("presetStatus").textContent = error.message;
  }
});

$("addPresetNodeBtn").addEventListener("click", () => {
  const name = $("presetNameInput").value.trim() || text.promptNode;
  const prompt = $("presetPromptInput").value.trim();
  if (!prompt) {
    $("presetStatus").textContent = text.promptNeeded;
    return;
  }
  $("promptOutput").value = prompt;
  addItem({ type: "note", nodeKind: "prompt", title: name, text: prompt, prompt, x: -60, y: -120, width: 430 });
  $("presetStatus").textContent = text.presetAdded;
});

$("presetSearchInput")?.addEventListener("input", () => {
  state.promptPresetCategory = "全部";
  renderPromptPresets($("presetSelect")?.value || "");
});

$("addPromptNodeBtn").addEventListener("click", () => {
  addItem({ type: "note", nodeKind: "prompt", title: text.promptNode, text: $("promptOutput").value || text.promptNeeded, x: -60, y: -120, width: 430 });
});

$("addT2INodeBtn").addEventListener("click", () => {
  addTextToImagePlaceholder();
});

$("addI2INodeBtn").addEventListener("click", () => {
  addImageToImagePlaceholder();
});

$("addReversePromptNodeBtn").addEventListener("click", () => {
  addReversePromptPlaceholder();
});

$("toolbarRatio").addEventListener("change", updateToolbarSizeLabel);
$("toolbarResolution").addEventListener("change", updateToolbarSizeLabel);

$("generateImageBtn").addEventListener("click", async () => {
  const prompt = $("promptOutput").value.trim();
  if (!prompt) {
    setStatus(text.promptNeeded);
    return;
  }
  const button = $("generateImageBtn");
  setBusy(button, true, text.generating);
  try {
    const activeNode = selectedItem();
    const finalPrompt = promptSourceForItem(activeNode) || prompt;
    const model = nodeUsesModel(activeNode) ? activeNode.model : state.settings?.image_model;
    const options = toolbarGenerationOptions();
    const payload = {
      prompt: finalPrompt,
      size: options.size,
      ratio: options.ratio,
      resolution: options.resolution,
      title: text.aiFigure,
      model,
    };
    await runImageBatch("/api/images/generate", payload, options, activeNode || { x: -400, y: -220 }, model);
  } catch (error) {
    setStatus(error.message);
  } finally {
    setBusy(button, false);
    renderCanvas();
  }
});

async function runTextToImage(targetId, triggerButton) {
  const target = itemById(targetId) || selectedItem();
  const prompt = promptSourceForItem(target) || $("promptOutput").value.trim();
  if (!prompt) {
    setStatus(text.textToImageHint);
    return;
  }
  const button = triggerButton || $("generateImageBtn");
  setBusy(button, true, text.generating);
  try {
    const model = nodeUsesModel(target) ? target.model : state.settings?.image_model;
    const options = imageGenerationOptions(target);
    const payload = {
      prompt,
      size: options.size,
      ratio: options.ratio,
      resolution: options.resolution,
      quality: options.quality,
      output_format: options.output_format,
      n: options.n,
      background: options.background,
      title: text.textToImage,
      model,
    };
    await runImageBatch("/api/images/generate", payload, options, target, model);
  } catch (error) {
    setStatus(error.message);
  } finally {
    setBusy(button, false);
    renderCanvas();
  }
}

const imageToImageToolbarBtn = $("imageToImageBtn");
if (imageToImageToolbarBtn) {
  imageToImageToolbarBtn.addEventListener("click", () => runImageToImage());
}

$("uploadImageToolbarBtn").addEventListener("click", () => $("imageInput").click());
$("uploadImageNodeBtn").addEventListener("click", () => $("imageInput").click());

$("imageInput").addEventListener("change", async (event) => {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  const form = new FormData();
  files.forEach((file) => form.append("image[]", file));
  setStatus(text.processing);
  try {
    const response = await fetch("/api/images/upload", { method: "POST", body: form });
    const data = await response.json();
    if (data.status === "error") throw new Error(data.message);
    const images = data.images?.length ? data.images : [data.image];
    images.forEach((image, index) => {
      addImageAssetNode(image, {
        nodeKind: "uploaded-image",
        title: image.title || text.uploadImage,
        x: -80,
        y: 90 + index * 430,
      });
    });
    setStatus(text.uploadImageDone);
  } catch (error) {
    setStatus(`${text.uploadImageFailed}: ${error.message}`);
  } finally {
    event.target.value = "";
  }
});

async function runImageToImage(targetId, triggerButton) {
  const target = itemById(targetId) || selectedItem();
  const sources = imageSourcesForItem(target);
  const source = sources[0];
  if (!sources.length) {
    setStatus(text.imageToImageHint);
    return;
  }
  const prompt = promptSourceForItem(target)
    || $("editInstruction").value.trim()
    || $("promptOutput").value.trim()
    || text.imageToImage;
  const button = triggerButton || imageToImageToolbarBtn;
  setBusy(button, true, text.generating);
  try {
    const model = nodeUsesModel(target) ? target.model : state.settings?.image_model;
    const options = imageGenerationOptions(target);
    const payload = {
      image_id: source.image_id,
      image_ids: sources.map((entry) => entry.image_id),
      prompt,
      title: text.imageToImage,
      size: options.size,
      ratio: options.ratio,
      resolution: options.resolution,
      quality: options.quality,
      output_format: options.output_format,
      n: options.n,
      background: options.background,
      model,
    };
    await runImageBatch("/api/images/edit", payload, options, target || source, model);
  } catch (error) {
    setStatus(error.message);
  } finally {
    setBusy(button, false);
    renderCanvas();
  }
}

async function runReversePrompt(targetId, triggerButton) {
  const target = itemById(targetId) || selectedItem();
  const source = imageSourceForItem(target);
  if (!source) {
    setStatus(text.reversePromptHint);
    return;
  }
  const button = triggerButton;
  setBusy(button, true, text.generating);
  try {
    const data = await api("/api/prompts/reverse", {
      image_id: source.image_id,
      instruction: $("editInstruction").value.trim(),
      model: target?.model || state.settings?.text_model,
    });
    target.prompt = data.prompt.prompt;
    target.text = data.prompt.prompt;
    target.title = data.prompt.title || text.reversePrompt;
    setStatus(data.prompt.provider_note || text.promptDone);
  } catch (error) {
    setStatus(error.message);
  } finally {
    setBusy(button, false);
    renderCanvas();
    updateSelectionPanel();
  }
}

function appendGeneratedImages(data, sourceNode, model, options = {}) {
  const images = normalizeGeneratedImages(data);
  const batchOffset = Number(options.batchOffset || 0);
  images.forEach((image, index) => {
    addItem({
      id: image.id,
      image_id: image.id,
      type: image.url.endsWith(".svg") ? "svg" : "image",
      nodeKind: options.nodeKind || "generated-image",
      title: options.title || image.title,
      url: image.url,
      provider_note: image.provider_note,
      model,
      imageWidth: image.image_width,
      imageHeight: image.image_height,
      x: (sourceNode?.x || 0) + 520,
      y: (sourceNode?.y || 0) + (batchOffset + index) * 470,
      width: 460,
      height: 430,
      imageSize: options.size,
      imageRatio: options.ratio,
      imageResolution: options.resolution,
      imageQuality: options.quality,
      outputFormat: options.output_format,
      imageBackground: options.background,
    });
    const linkFrom = options.linkFrom || sourceNode?.id;
    if (linkFrom) state.links.push({ from: linkFrom, to: image.id });
  });
}

async function runImageBatch(url, payload, options, sourceNode, model) {
  const count = clampImageCount(options?.n || payload?.n || 1);
  const basePayload = { ...payload, n: 1 };
  const placeholders = createGenerationPlaceholders(count, sourceNode, model, options, payload);
  const results = [];
  renderCanvas();
  const settled = await Promise.allSettled(placeholders.map(async (placeholder, index) => {
    updateGenerationPlaceholder(placeholder.id, {
      generationProgress: `${index + 1}/${count}`,
      provider_note: `${text.generating} ${index + 1}/${count}`,
    });
    renderCanvas();
    const data = await api(url, basePayload);
    const images = normalizeGeneratedImages(data);
    if (!images.length) throw new Error(text.requestFailed);
    const image = images[0];
    results.push(image);
    replaceGenerationPlaceholder(placeholder.id, image, model, {
      ...options,
      title: count > 1 ? `${payload.title || text.aiFigure} ${index + 1}` : payload.title,
    });
    setStatus(`${text.imageDone} ${results.length}/${count}`);
    renderCanvas();
  }));
  settled.forEach((result, index) => {
    if (result.status !== "rejected") return;
    updateGenerationPlaceholder(placeholders[index].id, {
      generationStatus: "failed",
      provider_note: result.reason?.message || text.requestFailed,
      title: `${payload.title || text.aiFigure} ${index + 1}`,
    });
  });
  renderCanvas();
  const failed = settled.filter((result) => result.status === "rejected").length;
  setStatus(failed ? `${text.imageDone} ${results.length}/${count}，失败 ${failed}` : `${text.imageDone} ${results.length}/${count}`);
  return results;
}

function createGenerationPlaceholders(count, sourceNode, model, options = {}, payload = {}) {
  const placeholders = [];
  for (let index = 0; index < count; index += 1) {
    const id = `pending_${crypto.randomUUID()}`;
    const title = count > 1 ? `${payload.title || text.aiFigure} ${index + 1}` : (payload.title || text.aiFigure);
    const item = {
      id,
      image_id: "",
      type: "image",
      nodeKind: options.nodeKind || "generated-image",
      title,
      url: "",
      generationStatus: "loading",
      generationProgress: `${index + 1}/${count}`,
      provider_note: `${text.generating} ${index + 1}/${count}`,
      model,
      x: (sourceNode?.x || 0) + 520,
      y: (sourceNode?.y || 0) + index * 470,
      width: 460,
      height: 430,
      imageSize: options.size,
      imageRatio: options.ratio,
      imageResolution: options.resolution,
      imageQuality: options.quality,
      outputFormat: options.output_format,
      imageBackground: options.background,
    };
    addItem(item);
    const linkFrom = options.linkFrom || sourceNode?.id;
    if (linkFrom) state.links.push({ from: linkFrom, to: id });
    placeholders.push(item);
  }
  return placeholders;
}

function updateGenerationPlaceholder(id, patch) {
  const item = itemById(id);
  if (item) Object.assign(item, patch);
}

function replaceGenerationPlaceholder(id, image, model, options = {}) {
  const item = itemById(id);
  if (!item) return;
  Object.assign(item, {
    image_id: image.id,
    type: image.url.endsWith(".svg") ? "svg" : "image",
    nodeKind: options.nodeKind || item.nodeKind || "generated-image",
    title: options.title || image.title,
    url: image.url,
    provider_note: image.provider_note,
    generationStatus: "done",
    generationProgress: "",
    model,
    imageWidth: image.image_width,
    imageHeight: image.image_height,
    imageSize: options.size,
    imageRatio: options.ratio,
    imageResolution: options.resolution,
    imageQuality: options.quality,
    outputFormat: options.output_format,
    imageBackground: options.background,
  });
}

function normalizeGeneratedImages(data) {
  return (data?.images?.length ? data.images : [data?.image]).filter(Boolean);
}

function clampImageCount(value) {
  const count = Number(value || 1);
  if (!Number.isFinite(count)) return 1;
  return Math.max(1, Math.min(Math.round(count), 4));
}

$("addImageNodeBtn").addEventListener("click", () => {
  addImageToImagePlaceholder();
});

function addTextToImagePlaceholder() {
  addItem({
    type: "note",
    nodeKind: "text-to-image",
    title: text.t2iNode,
    text: $("promptOutput").value || "",
    prompt: $("promptOutput").value || "",
    imageSize: "1024x1024",
    imageRatio: "auto",
    imageResolution: "standard",
    imageQuality: "auto",
    outputFormat: "png",
    imageCount: 1,
    imageBackground: "auto",
    x: 70,
    y: -90,
    width: 390,
  });
}

function addImageToImagePlaceholder() {
  addItem({
    type: "note",
    nodeKind: "image-to-image",
    title: text.imageNode,
    text: "",
    prompt: "",
    imageSize: "1024x1024",
    imageRatio: "auto",
    imageResolution: "standard",
    imageQuality: "auto",
    outputFormat: "png",
    imageCount: 1,
    imageBackground: "auto",
    x: 120,
    y: 120,
    width: 360,
  });
}

function addReversePromptPlaceholder() {
  addItem({
    type: "note",
    nodeKind: "reverse-prompt",
    title: text.reversePrompt,
    text: "",
    prompt: "",
    model: state.settings?.text_model || "gpt-4.1-mini",
    x: 120,
    y: 280,
    width: 380,
  });
}

function addImageAssetNode(image, overrides = {}) {
  addItem({
    id: image.id,
    image_id: image.id,
    type: image.url.endsWith(".svg") ? "svg" : "image",
    nodeKind: overrides.nodeKind || "image",
    title: overrides.title || image.title || text.imageNode,
    url: image.url,
    provider_note: image.provider_note,
    model: overrides.model || "",
    imageWidth: image.image_width,
    imageHeight: image.image_height,
    x: overrides.x ?? 120,
    y: overrides.y ?? -220,
    width: overrides.width || 420,
    height: overrides.height || 400,
  });
}

function openCropDialog() {
  openImageEditor(selectedItem(), { mode: "repaint" });
}

function openRegionCropDialog() {
  openImageEditor(selectedItem(), { mode: "crop" });
}

function openImageEditor(item, options = {}) {
  const source = imageSourceForItem(item);
  if (!source?.url) {
    setStatus(text.cropSourceNeeded);
    return;
  }
  const editorMode = options.mode || "repaint";
  const isCropMode = editorMode === "crop";
  state.imageEditor = {
    source,
    editorMode,
    mode: isCropMode ? "rect" : "brush",
    dragging: false,
    hasMask: false,
    rect: null,
    lastPoint: null,
  };
  const image = $("cropImage");
  const selection = $("cropSelection");
  const maskCanvas = $("maskCanvas");
  image.onload = () => {
    resetEditorMask();
    syncEditorCanvasToImage();
  };
  image.src = source.url;
  image.alt = source.title || "edit source";
  selection.style.display = "none";
  maskCanvas.style.display = "none";
  $("cropDialog").querySelector(".crop-card").classList.toggle("crop-mode", isCropMode);
  $("cropDialogKicker").textContent = isCropMode ? "LOCAL REGION CAPTURE" : "SCIENTIFIC IMAGE EDITOR";
  $("cropDialogTitle").textContent = isCropMode ? "\u5c40\u90e8\u6846\u9009\u622a\u56fe" : "\u79d1\u7814\u56fe\u5c40\u90e8\u7f16\u8f91";
  $("cropDialogDescription").textContent = isCropMode
    ? "\u5728\u56fe\u7247\u4e0a\u62d6\u62fd\u6846\u9009\u9700\u8981\u4f5c\u4e3a\u53c2\u8003\u7684\u533a\u57df\uff0c\u4fdd\u5b58\u540e\u4f1a\u751f\u6210\u65b0\u56fe\u7247\u8282\u70b9\uff0c\u53ef\u8fde\u5230\u56fe\u751f\u56fe\u8282\u70b9\u7684 IN\u3002"
    : "\u5728\u56fe\u7247\u4e0a\u7528\u534a\u900f\u660e\u7ea2\u8272\u6d82\u62b9\u6216\u6846\u9009\u9700\u8981\u4fee\u6539\u7684\u533a\u57df\uff0c\u7136\u540e\u7528\u7f16\u8f91\u6307\u4ee4\u8fdb\u884c\u5c40\u90e8\u91cd\u7ed8\u3002";
  $("saveCropBtn").style.display = isCropMode ? "inline-flex" : "inline-flex";
  $("runMaskedRepaintBtn").style.display = isCropMode ? "none" : "inline-flex";
  $("resetCropBtn").textContent = isCropMode ? "\u91cd\u7f6e\u6846\u9009" : "\u6e05\u7a7a\u6807\u8bb0";
  $("editorInstruction").value = $("editInstruction").value.trim();
  setEditorMode(isCropMode ? "rect" : "brush");
  updateBrushSizeLabel();
  $("cropStatus").textContent = isCropMode ? text.cropDragHint : "\u6d82\u62b9\u7ea2\u8272\u533a\u57df\u6216\u6846\u9009\u9700\u8981\u4fee\u6539\u7684\u90e8\u5206";
  $("cropDialog").showModal();
  requestAnimationFrame(syncEditorCanvasToImage);
}

function setEditorMode(mode) {
  if (!state.imageEditor) state.imageEditor = {};
  state.imageEditor.mode = mode;
  $("editorBrushBtn").classList.toggle("active", mode === "brush");
  $("editorRectBtn").classList.toggle("active", mode === "rect");
  $("cropSelection").style.display = "none";
  $("cropStage").style.cursor = mode === "brush" ? "crosshair" : "cell";
}

function updateBrushSizeLabel() {
  $("editorBrushSizeLabel").textContent = `${$("editorBrushSize").value} px`;
}

function renderedImageRect() {
  const stageRect = $("cropStage").getBoundingClientRect();
  const imageRect = $("cropImage").getBoundingClientRect();
  return {
    left: imageRect.left - stageRect.left,
    top: imageRect.top - stageRect.top,
    width: imageRect.width,
    height: imageRect.height,
  };
}

function syncEditorCanvasToImage() {
  const image = $("cropImage");
  const maskCanvas = $("maskCanvas");
  if (!image.src || !image.naturalWidth || !image.naturalHeight) return;
  const rect = renderedImageRect();
  maskCanvas.width = image.naturalWidth;
  maskCanvas.height = image.naturalHeight;
  maskCanvas.style.left = `${rect.left}px`;
  maskCanvas.style.top = `${rect.top}px`;
  maskCanvas.style.width = `${rect.width}px`;
  maskCanvas.style.height = `${rect.height}px`;
  maskCanvas.style.display = state.imageEditor?.editorMode === "crop" ? "none" : "block";
  redrawEditorMask();
}

function resetEditorMask() {
  if (!state.imageEditor) return;
  const image = $("cropImage");
  state.imageEditor.maskShapes = [];
  state.imageEditor.hasMask = false;
  state.imageEditor.rectImage = null;
  const maskCanvas = $("maskCanvas");
  if (image.naturalWidth && image.naturalHeight) {
    maskCanvas.width = image.naturalWidth;
    maskCanvas.height = image.naturalHeight;
  }
  const context = maskCanvas.getContext("2d");
  context.clearRect(0, 0, maskCanvas.width || 1, maskCanvas.height || 1);
  $("cropSelection").style.display = "none";
}

function cropPointFromEvent(event) {
  const rect = renderedImageRect();
  const x = Math.max(0, Math.min(event.offsetX - rect.left, rect.width));
  const y = Math.max(0, Math.min(event.offsetY - rect.top, rect.height));
  const image = $("cropImage");
  const scaleX = image.naturalWidth / Math.max(1, rect.width);
  const scaleY = image.naturalHeight / Math.max(1, rect.height);
  return {
    x,
    y,
    imageX: x * scaleX,
    imageY: y * scaleY,
    displayRect: rect,
    scaleX,
    scaleY,
  };
}

function addBrushStroke(from, to) {
  if (!state.imageEditor) return;
  const displaySize = Number($("editorBrushSize").value || 32);
  const imageSize = displaySize * ((to.scaleX + to.scaleY) / 2);
  state.imageEditor.maskShapes.push({
    type: "stroke",
    x1: from.imageX,
    y1: from.imageY,
    x2: to.imageX,
    y2: to.imageY,
    size: imageSize,
  });
  state.imageEditor.hasMask = true;
  redrawEditorMask();
  $("cropStatus").textContent = "\u5df2\u6807\u8bb0\u8499\u7248\u533a\u57df";
}

function addRectMask(start, end) {
  if (!state.imageEditor) return;
  const left = Math.min(start.imageX, end.imageX);
  const top = Math.min(start.imageY, end.imageY);
  const width = Math.abs(end.imageX - start.imageX);
  const height = Math.abs(end.imageY - start.imageY);
  if (width < 4 || height < 4) return;
  state.imageEditor.maskShapes.push({ type: "rect", left, top, width, height });
  state.imageEditor.hasMask = true;
  redrawEditorMask();
  $("cropStatus").textContent = `${Math.round(width)} x ${Math.round(height)} px`;
}

function redrawEditorMask() {
  const canvas = $("maskCanvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width || 1, canvas.height || 1);
  context.fillStyle = "rgba(209, 35, 35, 0.42)";
  context.strokeStyle = "rgba(209, 35, 35, 0.72)";
  context.lineCap = "round";
  context.lineJoin = "round";
  for (const shape of state.imageEditor?.maskShapes || []) {
    if (shape.type === "stroke") {
      context.lineWidth = shape.size;
      context.beginPath();
      context.moveTo(shape.x1, shape.y1);
      context.lineTo(shape.x2, shape.y2);
      context.stroke();
      context.beginPath();
      context.arc(shape.x2, shape.y2, shape.size / 2, 0, Math.PI * 2);
      context.fill();
    } else if (shape.type === "rect") {
      context.fillRect(shape.left, shape.top, shape.width, shape.height);
      context.lineWidth = Math.max(2, Math.min(canvas.width, canvas.height) * 0.003);
      context.strokeRect(shape.left, shape.top, shape.width, shape.height);
    }
  }
}

function updateCropSelection(start, end) {
  const rect = renderedImageRect();
  const left = rect.left + Math.min(start.x, end.x);
  const top = rect.top + Math.min(start.y, end.y);
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);
  state.imageEditor.rect = { left, top, width, height };
  const selection = $("cropSelection");
  selection.style.display = width > 2 && height > 2 ? "block" : "none";
  selection.style.left = `${left}px`;
  selection.style.top = `${top}px`;
  selection.style.width = `${width}px`;
  selection.style.height = `${height}px`;
  $("cropStatus").textContent = `${Math.round(width)} x ${Math.round(height)} px`;
}

function maskDataUrlFromEditor() {
  const editor = state.imageEditor;
  const image = $("cropImage");
  if (!editor?.hasMask || !image.naturalWidth || !image.naturalHeight) return "";
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  context.fillStyle = "rgba(255, 255, 255, 1)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = "destination-out";
  context.fillStyle = "rgba(0, 0, 0, 1)";
  context.strokeStyle = "rgba(0, 0, 0, 1)";
  context.lineCap = "round";
  context.lineJoin = "round";
  for (const shape of editor.maskShapes || []) {
    if (shape.type === "stroke") {
      context.lineWidth = shape.size;
      context.beginPath();
      context.moveTo(shape.x1, shape.y1);
      context.lineTo(shape.x2, shape.y2);
      context.stroke();
      context.beginPath();
      context.arc(shape.x2, shape.y2, shape.size / 2, 0, Math.PI * 2);
      context.fill();
    } else if (shape.type === "rect") {
      context.fillRect(shape.left, shape.top, shape.width, shape.height);
    }
  }
  context.globalCompositeOperation = "source-over";
  return canvas.toDataURL("image/png");
}

async function saveCropAsImageNode() {
  const editor = state.imageEditor;
  const image = $("cropImage");
  const rectShape = [...(editor?.maskShapes || [])].reverse().find((shape) => shape.type === "rect")
    || editor?.rectImage;
  if (!editor?.source || !rectShape || rectShape.width < 4 || rectShape.height < 4) {
    $("cropStatus").textContent = text.cropSelectionNeeded;
    return;
  }
  const sx = Math.max(0, Math.round(rectShape.left));
  const sy = Math.max(0, Math.round(rectShape.top));
  const sw = Math.min(image.naturalWidth - sx, Math.round(rectShape.width));
  const sh = Math.min(image.naturalHeight - sy, Math.round(rectShape.height));
  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const context = canvas.getContext("2d");
  context.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
  const file = dataUrlToFile(canvas.toDataURL("image/png"), `region-${Date.now()}.png`);
  const uploaded = await uploadImageFile(file);
  addImageAssetNode(uploaded, {
    nodeKind: "region-crop",
    title: `\u5c40\u90e8\u622a\u56fe - ${editor.source.title || text.repaint}`,
    x: (editor.source.x || 0) + 500,
    y: editor.source.y || 0,
    width: 420,
    height: 400,
  });
  state.links.push({ from: editor.source.id, to: uploaded.id });
  $("cropDialog").close();
  setStatus(text.cropSaved);
  renderCanvas();
}

async function runMaskedRepaint(button) {
  const editor = state.imageEditor;
  const maskDataUrl = maskDataUrlFromEditor();
  if (!editor?.source || !maskDataUrl) {
    $("cropStatus").textContent = text.maskNeeded;
    return;
  }
  const instruction = $("editorInstruction").value.trim() || $("editInstruction").value.trim() || text.repaint;
  $("editInstruction").value = instruction;
  setBusy(button, true, text.generating);
  try {
    const options = toolbarGenerationOptions();
    const data = await api("/api/images/repaint", {
      image_id: editor.source.image_id,
      instruction,
      prompt: instruction,
      mask_data_url: maskDataUrl,
      title: text.repaint,
      size: options.size,
      ratio: options.ratio,
      resolution: options.resolution,
      quality: options.quality,
      output_format: options.output_format,
      n: options.n,
      background: options.background,
      model: editor.source.model || state.settings?.image_model,
    });
    appendGeneratedImages(data, editor.source, editor.source.model || state.settings?.image_model, {
      ...options,
      linkFrom: editor.source.id,
      title: text.repaint,
      nodeKind: "image-edit",
    });
    $("cropDialog").close();
    setStatus(data.image?.source === "api" ? text.maskedRepaintDone : text.placeholder);
  } catch (error) {
    $("cropStatus").textContent = error.message;
    setStatus(error.message);
  } finally {
    setBusy(button, false);
    renderCanvas();
  }
}

$("cropStage").addEventListener("pointerdown", (event) => {
  if (!$("cropImage").src || !state.imageEditor) return;
  if (event.button !== undefined && event.button !== 0) return;
  const point = cropPointFromEvent(event);
  state.imageEditor.dragging = true;
  state.imageEditor.start = point;
  state.imageEditor.lastPoint = point;
  if (state.imageEditor.mode === "brush" && state.imageEditor.editorMode !== "crop") {
    addBrushStroke(point, point);
  } else {
    updateCropSelection(point, point);
  }
  $("cropStage").setPointerCapture(event.pointerId);
});

$("cropStage").addEventListener("pointermove", (event) => {
  const editor = state.imageEditor;
  if (!editor?.dragging) return;
  const point = cropPointFromEvent(event);
  if (editor.mode === "brush" && editor.editorMode !== "crop") {
    addBrushStroke(editor.lastPoint || point, point);
    editor.lastPoint = point;
  } else {
    updateCropSelection(editor.start, point);
  }
});

$("cropStage").addEventListener("pointerup", (event) => {
  const editor = state.imageEditor;
  if (!editor?.dragging) return;
  const point = cropPointFromEvent(event);
  if (editor.mode === "rect" || editor.editorMode === "crop") {
    updateCropSelection(editor.start, point);
    if (editor.editorMode === "crop") {
      const left = Math.min(editor.start.imageX, point.imageX);
      const top = Math.min(editor.start.imageY, point.imageY);
      const width = Math.abs(point.imageX - editor.start.imageX);
      const height = Math.abs(point.imageY - editor.start.imageY);
      editor.rectImage = { left, top, width, height };
    } else {
      addRectMask(editor.start, point);
    }
  }
  editor.dragging = false;
  editor.lastPoint = null;
  $("cropStage").releasePointerCapture(event.pointerId);
});

$("cropStage").addEventListener("pointerleave", () => {
  if (state.imageEditor?.dragging && state.imageEditor.mode === "brush") {
    state.imageEditor.dragging = false;
    state.imageEditor.lastPoint = null;
  }
});

$("editorBrushBtn").addEventListener("click", () => setEditorMode("brush"));
$("editorRectBtn").addEventListener("click", () => setEditorMode("rect"));
$("editorBrushSize").addEventListener("input", updateBrushSizeLabel);
window.addEventListener("resize", syncEditorCanvasToImage);

$("resetCropBtn").addEventListener("click", () => {
  resetEditorMask();
  if (state.imageEditor) state.imageEditor.rectImage = null;
  $("cropStatus").textContent = state.imageEditor?.editorMode === "crop"
    ? text.cropDragHint
    : "\u6d82\u62b9\u7ea2\u8272\u533a\u57df\u6216\u6846\u9009\u9700\u8981\u4fee\u6539\u7684\u90e8\u5206";
});

$("saveCropBtn").addEventListener("click", async () => {
  const button = $("saveCropBtn");
  setBusy(button, true, text.processing);
  try {
    await saveCropAsImageNode();
  } catch (error) {
    $("cropStatus").textContent = error.message;
  } finally {
    setBusy(button, false);
  }
});

$("runMaskedRepaintBtn").addEventListener("click", async () => {
  await runMaskedRepaint($("runMaskedRepaintBtn"));
});

$("addTextBtn").addEventListener("click", () => {
  addItem({ type: "note", nodeKind: "note", title: text.textNote, text: text.textNoteBody, x: 80, y: 80, width: 300 });
});

$("selectedTitle").addEventListener("input", () => {
  const item = selectedItem();
  if (!item) return;
  item.title = $("selectedTitle").value;
  renderCanvas();
});

$("selectedModel").addEventListener("change", () => {
  const item = selectedItem();
  if (!item) return;
  item.model = $("selectedModel").value;
  renderCanvas();
});

async function imageOperation(url, fallbackTitle) {
  const item = selectedItem();
  const source = imageSourceForItem(item);
  if (!source) {
    setStatus(text.selectImage);
    return;
  }
  const instruction = $("editInstruction").value || fallbackTitle;
  const payload = {
    image_id: source.image_id,
    prompt: instruction,
    instruction,
    title: fallbackTitle,
    size: toolbarGenerationOptions().size,
    ratio: toolbarGenerationOptions().ratio,
    resolution: toolbarGenerationOptions().resolution,
    model: nodeUsesModel(item) ? item.model : state.settings?.image_model,
  };
  if (url.includes("upscale")) {
    payload.scale = Number($("upscaleScale").value || 4);
  }
  const data = await api(url, payload);
  const image = data.image || data.asset;
  addItem({
    id: image.id,
    image_id: image.id,
    type: image.url.endsWith(".svg") ? "svg" : "image",
    nodeKind: operationNodeKind(url),
    title: image.title || fallbackTitle,
    url: image.url,
    provider_note: image.provider_note,
    model: nodeUsesModel(item) ? item.model : state.settings?.image_model,
    imageWidth: image.image_width,
    imageHeight: image.image_height,
    x: (item || source).x + 500,
    y: (item || source).y,
    width: 460,
    height: 430,
  });
  state.links.push({ from: source.id, to: image.id });
  setStatus(`${fallbackTitle}${text.done}`);
  renderCanvas();
}

function operationNodeKind(url) {
  if (url.includes("upscale")) return "upscale";
  if (url.includes("vectorize")) return "vector";
  return "image-edit";
}

$("editImageBtn").addEventListener("click", openRegionCropDialog);
$("repaintBtn").addEventListener("click", openCropDialog);
$("upscaleBtn").addEventListener("click", () => imageOperation("/api/images/upscale", text.upscale));
$("vectorizeBtn").addEventListener("click", () => imageOperation("/api/images/vectorize", text.vector));

$("relayoutBtn").addEventListener("click", async () => {
  const data = await api("/api/canvas/relayout", { items: state.items, mode: "grid" });
  state.items = data.items;
  renderCanvas();
  setStatus(text.relayoutDone);
});

$("saveCanvasBtn").addEventListener("click", async () => {
  await saveWorkflow();
});

$("openWorkflowBtn").addEventListener("click", async () => {
  await loadWorkflowList();
  $("workflowTitleInput").value = state.canvasTitle || "Research canvas";
  $("workflowDialog").showModal();
});

$("workflowSelect").addEventListener("change", () => {
  const workflow = state.workflows.find((entry) => entry.id === $("workflowSelect").value);
  if (!workflow) return;
  $("workflowTitleInput").value = workflow.title || "Research canvas";
  $("workflowMetaBox").textContent = workflowSummary(workflow);
});

$("saveWorkflowBtn").addEventListener("click", async () => {
  await saveWorkflow($("workflowTitleInput").value.trim());
  await loadWorkflowList(state.canvasId);
});

$("loadWorkflowBtn").addEventListener("click", async () => {
  const selectedId = $("workflowSelect").value;
  if (!selectedId) {
    $("workflowStatus").textContent = text.workflowNone;
    return;
  }
  await loadWorkflowById(selectedId);
  $("workflowStatus").textContent = text.workflowLoaded;
});

$("newWorkflowBtn").addEventListener("click", () => {
  startNewWorkflow();
  $("workflowTitleInput").value = state.canvasTitle;
  $("workflowStatus").textContent = "\u5df2\u65b0\u5efa\u672a\u4fdd\u5b58\u5de5\u7a0b";
});

$("zoomInBtn").addEventListener("click", () => {
  state.viewport.scale = Math.min(3, state.viewport.scale * 1.12);
  applyViewport();
});

$("zoomOutBtn").addEventListener("click", () => {
  state.viewport.scale = Math.max(0.25, state.viewport.scale / 1.12);
  applyViewport();
});

$("fitBtn").addEventListener("click", () => {
  state.viewport = { x: 0, y: 0, scale: 1 };
  applyViewport();
});

$("openSettingsBtn").addEventListener("click", () => {
  loadSettings().finally(() => $("settingsDialog").showModal());
});

$("apiKeyInput").addEventListener("input", () => {
  $("apiKeyInput").dataset.dirty = "true";
});

$("providerSelect").addEventListener("change", () => {
  commitProviderForm();
  state.activeProviderId = $("providerSelect").value;
  renderProviderForm(currentProvider());
  renderProviderSelect();
});

$("newProviderBtn").addEventListener("click", () => {
  commitProviderForm();
  const provider = newProviderConfig();
  state.apiProviders.push(provider);
  state.activeProviderId = provider.id;
  renderProviderSelect();
  renderProviderForm(provider);
  $("settingsStatus").textContent = text.providerNew;
});

$("deleteProviderBtn").addEventListener("click", () => {
  const provider = currentProvider();
  if (!provider) return;
  state.apiProviders = state.apiProviders.filter((entry) => entry.id !== provider.id);
  if (!state.apiProviders.length) state.apiProviders.push(newProviderConfig());
  state.activeProviderId = state.apiProviders[0].id;
  renderProviderSelect();
  renderProviderForm(currentProvider());
  $("settingsStatus").textContent = text.providerDeleted;
});

$("clearProviderKeyBtn").addEventListener("click", () => {
  $("apiKeyInput").value = "";
  $("apiKeyInput").dataset.dirty = "true";
  const provider = currentProvider();
  if (provider) {
    provider.pending_api_key = "";
    provider.has_api_key = false;
    provider.api_key_hint = "";
  }
  $("settingsStatus").textContent = text.providerKeyCleared;
});

$("saveSettingsBtn").addEventListener("click", async () => {
  const button = $("saveSettingsBtn");
  setBusy(button, true, text.saving);
  $("settingsStatus").textContent = text.saving;
  try {
    const data = await api("/api/settings", settingsPayload());
    applySettings(data.settings);
    $("settingsStatus").textContent = text.settingsSaved;
    setStatus(text.apiSaved);
  } catch (error) {
    $("settingsStatus").textContent = error.message;
  } finally {
    setBusy(button, false);
  }
});

$("syncModelsBtn").addEventListener("click", async () => {
  const button = $("syncModelsBtn");
  setBusy(button, true, text.syncingModels);
  $("settingsStatus").textContent = text.syncingModels;
  try {
    await api("/api/settings", settingsPayload());
    const data = await api("/api/models", null, "GET");
    $("textModelsInput").value = modelsToLines(data.text_models);
    $("imageModelsInput").value = modelsToLines(data.image_models);
    $("settingsStatus").textContent = text.modelsSynced;
  } catch (error) {
    $("settingsStatus").textContent = `${text.modelsSyncFailed}: ${error.message}`;
  } finally {
    setBusy(button, false);
  }
});

async function saveWorkflow(title) {
  const finalTitle = title || state.canvasTitle || "Research canvas";
  const data = await api("/api/canvas/save", {
    id: state.canvasId,
    title: finalTitle,
    items: state.items,
    links: state.links,
    viewport: state.viewport,
  });
  state.canvasId = data.canvas.id;
  state.canvasTitle = data.canvas.title || finalTitle;
  setStatus(`${text.workflowSaved}: ${state.canvasTitle}`);
  if ($("workflowStatus")) $("workflowStatus").textContent = `${text.saved}${data.canvas.id}`;
  return data.canvas;
}

async function loadWorkflowList(selectedId) {
  const data = await api("/api/canvas/list", null, "GET");
  state.workflows = data.canvases || [];
  renderWorkflowList(selectedId || state.canvasId);
}

function renderWorkflowList(selectedId) {
  const select = $("workflowSelect");
  if (!select) return;
  select.innerHTML = "";
  for (const workflow of state.workflows) {
    const option = document.createElement("option");
    option.value = workflow.id;
    option.textContent = `${workflow.title || "Research canvas"} - ${workflow.updated_at || ""}`;
    option.selected = workflow.id === selectedId;
    select.appendChild(option);
  }
  const active = state.workflows.find((workflow) => workflow.id === (selectedId || select.value)) || state.workflows[0];
  $("workflowMetaBox").textContent = active ? workflowSummary(active) : text.workflowNone;
  if (active) {
    select.value = active.id;
    $("workflowTitleInput").value = active.title || "Research canvas";
  }
}

function workflowSummary(workflow) {
  const itemCount = workflow.items?.length || 0;
  const linkCount = workflow.links?.length || 0;
  return `ID: ${workflow.id}\n\u8282\u70b9: ${itemCount}\n\u8fde\u7ebf: ${linkCount}\n\u66f4\u65b0: ${workflow.updated_at || "-"}`;
}

async function loadWorkflowById(canvasId) {
  const data = await api(`/api/canvas/${canvasId}`, null, "GET");
  applyWorkflow(data.canvas);
  setStatus(`${text.workflowLoaded}: ${data.canvas.title || data.canvas.id}`);
}

async function loadLatestWorkflow() {
  try {
    const data = await api("/api/canvas/latest", null, "GET");
    if (data.canvas) {
      applyWorkflow(data.canvas);
      return true;
    }
  } catch (error) {
    setStatus(error.message);
  }
  return false;
}

function applyWorkflow(canvas) {
  if (!canvas) return;
  state.canvasId = canvas.id;
  state.canvasTitle = canvas.title || "Research canvas";
  state.items = canvas.items || [];
  state.links = canvas.links || [];
  state.viewport = canvas.viewport || { x: 0, y: 0, scale: 1 };
  state.selectedId = null;
  state.pendingLink = null;
  applyViewport();
  renderCanvas();
  updateSelectionPanel();
}

function startNewWorkflow() {
  state.canvasId = null;
  state.canvasTitle = `Research canvas ${new Date().toLocaleString()}`;
  state.items = [];
  state.links = [];
  state.viewport = { x: 0, y: 0, scale: 1 };
  state.selectedId = null;
  state.pendingLink = null;
  applyViewport();
  addWelcomeNode();
}

function addWelcomeNode() {
  addItem({
    type: "note",
    nodeKind: "note",
    title: text.workspace,
    text: text.workspaceBody,
    x: -180,
    y: -120,
    width: 420,
  });
}

async function loadSettings() {
  try {
    const data = await api("/api/settings", null, "GET");
    applySettings(data.settings);
    $("settingsStatus").textContent = data.settings.has_api_key
      ? `${text.settingsConfigured}${data.settings.api_key_hint}`
      : text.settingsMissing;
  } catch (error) {
    $("settingsStatus").textContent = error.message;
  }
}

function applySettings(settings) {
  state.settings = settings;
  state.apiProviders = (settings.providers?.length ? settings.providers : [{
    id: settings.active_provider_id || "default",
    name: settings.active_provider_name || "Default provider",
    has_api_key: settings.has_api_key,
    api_key_hint: settings.api_key_hint,
    base_url: settings.base_url,
    text_model: settings.text_model,
    image_model: settings.image_model,
    text_models: settings.text_models,
    image_models: settings.image_models,
  }]).map((provider) => ({ ...provider }));
  state.activeProviderId = settings.active_provider_id || state.apiProviders[0]?.id;
  renderProviderSelect();
  renderProviderForm(currentProvider());
  renderTextModelSelect($("promptModelSelect"), settings.text_model);
  $("apiStatus").textContent = settings.has_api_key
    ? `${text.apiConfigured} - ${settings.active_provider_name || settings.image_model}`
    : text.apiMissing;
  updateSelectionPanel();
  renderCanvas();
}

async function bootstrap() {
  applyViewport();
  updateToolbarSizeLabel();
  await loadSettings();
  try {
    await loadPromptPresets();
  } catch (error) {
    setStatus(error.message);
  }
  const restored = await loadLatestWorkflow();
  if (!restored) {
    addWelcomeNode();
  }
}

bootstrap();

state.promptPresetCategory = state.promptPresetCategory || "全部";

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function promptPresetVisibleData() {
  const search = ($("presetSearchInput")?.value || "").trim().toLowerCase();
  const presets = state.promptPresets || [];
  const visible = presets.filter((preset) => {
    const haystack = [
      preset.name,
      preset.category,
      preset.prompt,
      (preset.keywords || []).join(" "),
      preset.reference_image,
    ]
      .join(" ")
      .toLowerCase();
    return !search || haystack.includes(search);
  });
  const categories = [];
  const grouped = new Map();
  for (const preset of visible) {
    const category = preset.category || "未分类";
    if (!grouped.has(category)) {
      grouped.set(category, []);
      categories.push(category);
    }
    grouped.get(category).push(preset);
  }
  return { visible, categories, grouped };
}

function syncPromptPresetEditor(preset) {
  const selected = preset || null;
  if ($("presetSelect")) $("presetSelect").value = selected?.id || "";
  if ($("presetNameInput")) $("presetNameInput").value = selected?.name || "";
  if ($("presetCategoryInput")) $("presetCategoryInput").value = selected?.category || "未分类";
  if ($("presetPromptInput")) $("presetPromptInput").value = selected?.prompt || "";
  if ($("presetReferenceInput")) $("presetReferenceInput").value = selected?.reference_image || "";
  if ($("presetKeywordsInput")) $("presetKeywordsInput").value = (selected?.keywords || []).join("、");
  const preview = $("presetPreviewImage");
  const fallback = $("presetPreviewFallback");
  const previewButton = $("presetPreviewButton");
  if (preview) {
    preview.hidden = !selected?.reference_image;
    preview.src = selected?.reference_image || "";
  }
  if (previewButton) {
    previewButton.disabled = !selected?.reference_image;
    previewButton.dataset.imageUrl = selected?.reference_image || "";
    previewButton.dataset.imageTitle = selected?.name || "参考图";
  }
  if (fallback) {
    fallback.hidden = Boolean(selected?.reference_image);
    fallback.textContent = selected?.reference_image ? "" : "暂无参考图";
  }
  if ($("presetStatus")) {
    $("presetStatus").textContent = selected ? `${selected.category || "未分类"} · ${selected.name || "Untitled"}` : text.workflowNone;
  }
}

function renderPromptPresets(selectedId) {
  const { visible, categories, grouped } = promptPresetVisibleData();
  const categoryList = $("presetCategoryList");
  const grid = $("presetCardGrid");
  if (!categoryList || !grid) return;
  const currentCategory = state.promptPresetCategory || "全部";
  if (currentCategory !== "全部" && !categories.includes(currentCategory)) {
    state.promptPresetCategory = categories[0] || "全部";
  }
  const totalCount = visible.length;
  const currentCount = currentCategory === "全部"
    ? totalCount
    : (grouped.get(state.promptPresetCategory) || []).length;
  if ($("presetLibraryCount")) $("presetLibraryCount").textContent = String(currentCount);
  if ($("presetCurrentCategory")) $("presetCurrentCategory").textContent = state.promptPresetCategory || "全部";
  categoryList.innerHTML = "";
  const categoryEntries = [
    { label: "全部", value: "全部", count: totalCount },
    ...categories.map((category) => ({ label: category, value: category, count: grouped.get(category)?.length || 0 })),
  ];
  for (const entry of categoryEntries) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `preset-chip${(state.promptPresetCategory || "全部") === entry.value ? " active" : ""}`;
    button.textContent = `${entry.label} (${entry.count})`;
    button.addEventListener("click", () => {
      state.promptPresetCategory = entry.value;
      renderPromptPresets(selectedId);
    });
    categoryList.appendChild(button);
  }
  grid.innerHTML = "";
  const selectedPresetId = selectedId || $("presetSelect")?.value || "";
  const visibleByCategory = currentCategory === "全部"
    ? visible
    : (grouped.get(currentCategory) || []);
  for (const preset of visibleByCategory) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `preset-card${preset.id === selectedPresetId ? " selected" : ""}`;
    card.dataset.presetId = preset.id;
    card.dataset.selected = preset.id === selectedPresetId ? "true" : "false";
    card.innerHTML = `
      <div class="preset-card-head">
        <div>
          <strong>${escapeHtml(preset.name || "Untitled")}</strong>
          <span>${escapeHtml(preset.category || "未分类")}</span>
        </div>
        <small>${escapeHtml((preset.keywords || []).slice(0, 3).join(" · "))}</small>
      </div>
      <p>${escapeHtml((preset.prompt || "").slice(0, 220))}</p>
      <div class="preset-card-foot">
        <span>${preset.reference_image ? "有参考图" : "无参考图"}</span>
        <span>点击查看</span>
      </div>
    `;
    card.addEventListener("click", () => syncPromptPresetEditor(preset));
    grid.appendChild(card);
  }
  const active = state.promptPresets.find((preset) => preset.id === selectedPresetId) || visibleByCategory[0] || visible[0] || null;
  syncPromptPresetEditor(active);
}

async function savePromptPreset() {
  const prompt = $("presetPromptInput")?.value.trim() || $("promptOutput").value.trim();
  if (!prompt) {
    $("presetStatus").textContent = text.promptNeeded;
    return;
  }
  const payload = {
    id: $("presetSelect")?.value || null,
    name: $("presetNameInput")?.value.trim() || "Untitled preset",
    category: $("presetCategoryInput")?.value.trim() || "未分类",
    prompt,
    reference_image: $("presetReferenceInput")?.value.trim() || "",
    keywords: $("presetKeywordsInput")?.value.trim() || "",
  };
  const data = await api("/api/prompts/presets/save", payload);
  state.promptPresets = data.presets || [];
  renderPromptPresets(data.preset?.id);
  $("presetStatus").textContent = text.presetSaved;
}

async function deletePromptPreset() {
  const selectedId = $("presetSelect")?.value;
  if (!selectedId) return;
  const data = await api("/api/prompts/presets/delete", { id: selectedId });
  state.promptPresets = data.presets || [];
  renderPromptPresets();
  $("presetStatus").textContent = text.presetDeleted;
}

async function loadPromptPresets() {
  const data = await api("/api/prompts/presets", null, "GET");
  state.promptPresets = data.presets || [];
  renderPromptPresets(state.promptPresets[0]?.id || "");
}

$("presetPreviewButton")?.addEventListener("click", () => {
  const imageUrl = $("presetPreviewButton").dataset.imageUrl;
  if (!imageUrl) return;
  $("imageLightboxImage").src = imageUrl;
  $("imageLightboxTitle").textContent = $("presetPreviewButton").dataset.imageTitle || "参考图";
  $("imageLightbox").showModal();
});

$("imageLightbox")?.addEventListener("click", (event) => {
  if (event.target === $("imageLightbox")) {
    $("imageLightbox").close();
  }
});

# Research Canvas AI 科研 AI 画板

Research Canvas AI 是一个本地运行的科研绘图画板软件。它把“论文阅读、提示词生成、AI 生图、图像编辑、高清放大、矢量化、节点式工作流”放在一个无限画布里，适合用来制作论文图、机制示意图、图形摘要和科研汇报插图。

项目采用轻量的 Python 后端和原生 HTML/CSS/JS 前端，Windows 下可以双击脚本一键启动。

## 主要功能

- 论文读取：支持上传 PDF、TXT、Markdown、DOCX，并提取摘要、关键词和图注候选内容。
- 提示词生成：根据论文内容、绘图目标、图类型和视觉风格生成科研绘图提示词。
- 文生图：通过 OpenAI 兼容的 `/v1/images/generations` 接口调用 `gpt-image-2` 等图像模型。
- 图生图：支持上传一张或多张参考图，通过 `/v1/images/edits` 生成修改后的科研图。
- 节点画布：文生图、图生图、提示词、上传图片、反推提示词等都可以作为节点连接。
- 多图并发：选择生成多张图时，会创建多个图片。
- 局部截图与重绘：可以框选图片局部作为新的图像来源，也可以绘制蒙版进行局部重绘。
- 高清放大：集成 Upscayl 后端，可对图片进行本地放大。
- 位图转矢量：集成 VTracer，用于将位图转换为 SVG。
- 提示词预设：内置科研绘图提示词库，支持分类、保存和复用。
- 工作流保存：画布工程可以保存，方便重启后继续编辑。

## 一键启动

Windows 下双击：

```text
Start Research Canvas AI.bat
```

启动后会自动打开：

```text
http://127.0.0.1:8765
```

停止后台服务请双击：

```text
Stop Research Canvas AI.bat
```

## API 配置

进入软件后，点击左上角设置按钮，在 API 设置页填写：

- API Base URL
- API Key
- 文本模型
- 图像模型
- 可选模型列表

配置会保存在本地 `.env` 文件中。`.env` 已被 `.gitignore` 忽略，不会上传到 GitHub。

也可以参考 `.env.example` 手动创建 `.env`：

```text
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com
TEXT_MODEL=gpt-4.1-mini
IMAGE_MODEL=gpt-image-2
SERVER_HOST=127.0.0.1
SERVER_PORT=8765
```


## 数据保存位置

本地运行时，数据默认保存在：

```text
data/
```

其中包括：

- `data/state.json`：提示词预设、工程、图片记录等状态数据。
- `data/assets/`：生成图、上传图、矢量图等资源。
- `data/uploads/`：上传的论文或图片。
- `data/logs/`：运行日志和接口调试日志。


## 项目结构

```text
app/        Python 后端接口与服务逻辑
static/     前端页面、样式和画布交互
scripts/    启动、停止、检查和打包脚本
tools/      Upscayl、VTracer 等本地工具
server.py   服务入口
```

## 注意事项

- 本项目是本地优先工具，适合个人科研绘图工作流。
- 使用第三方 API 时，请自行确认模型名称、接口地址、价格和速率限制。
- 4K 图片生成通常耗时更长、费用更高，建议必要时再使用。
- 生成结果请结合科研事实人工检查，避免误导性图示。

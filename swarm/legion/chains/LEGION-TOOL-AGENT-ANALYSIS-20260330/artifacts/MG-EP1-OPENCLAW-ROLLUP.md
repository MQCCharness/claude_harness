# MG-OPENCLAW-RUNTIME 汇流块 — EP-1

**CHAIN**：`LEGION-TOOL-AGENT-ANALYSIS-20260330`  
**EP**：EP-1  
**ROLE**：MG-OPENCLAW-RUNTIME  
**来源**：Sub-agent Task（ROUND=2）  
**PARENT_REF**：用户指令「派发 EP-1」

已遵守 EX-EP0 的 **A/B/C** 分级与禁止项（P-1～P-6）；本链**不**声称已完成 OpenClaw **安装/运行类 TC-E** 实测，下文仅为**文档级（A 锚点）**机制归纳。

---

## 机制说明（OpenClaw 长时运行与记忆 · A 级锚点）

以下四条均指回 **OpenClaw 官方文档**（同域 `docs.openclaw.ai`）；措辞已与 [Memory Overview](https://docs.openclaw.ai/concepts/memory) 拉取内容核对（**A**）。

### 1. Markdown 外存（工作区明文记忆）

OpenClaw 通过在智能体**工作区**写入**纯 Markdown 文件**来持久化记忆；模型侧「记得」的内容以**已落盘**为准，**无隐藏状态**。详见：[Memory Overview](https://docs.openclaw.ai/concepts/memory)（开篇「remembers things by writing plain Markdown files」及「no hidden state」）。

### 2. `MEMORY.md` 与 `memory/YYYY-MM-DD.md`

文档定义两处存储位置：

- **`MEMORY.md`**：长期记忆； durable facts、偏好与决策；**每次 DM 会话开始时会加载**。  
- **`memory/YYYY-MM-DD.md`**：按日笔记；运行中的上下文与观察；**当天与昨天的笔记会自动加载**。

文件位于 agent workspace（默认 `~/.openclaw/workspace`）。详见：[Memory Overview — How it works](https://docs.openclaw.ai/concepts/memory)。

### 3. `memory_search` / `memory_get`

智能体有两个与记忆相关的工具：

- **`memory_search`**：语义检索相关笔记（措辞与原文不必一致也能命中）。  
- **`memory_get`**：读取指定记忆文件或行范围。

二者由**当前启用的 memory 插件**提供（默认：`memory-core`）。检索在配置 embedding 时，`memory_search` 使用**混合检索**（向量相似度 + 关键词）；细节见子页。  
- 工具列举与插件说明：[Memory Overview — Memory tools](https://docs.openclaw.ai/concepts/memory)  
- 检索管线、提供方与调参：[Memory Search](https://docs.openclaw.ai/concepts/memory-search)

### 4. Compaction 前的 automatic memory flush

在 **[compaction](https://docs.openclaw.ai/concepts/compaction)** 对会话做摘要**之前**，OpenClaw 会先跑一轮**静默回合**，提醒智能体把重要上下文**写入记忆文件**；**默认开启、无需额外配置**。文档表述目的为：**防止 compaction 导致上下文丢失**；若重要事实尚在对话中、尚未写入文件，会在摘要发生前尽量自动保存。  
- 因果顺序与默认行为：[Memory Overview — Automatic memory flush](https://docs.openclaw.ai/concepts/memory)（文中链向 [Compaction](https://docs.openclaw.ai/concepts/compaction)）  
- compaction 与记忆的交互：亦见 [Compaction](https://docs.openclaw.ai/concepts/compaction)（Further reading 与 Memory Overview 交叉引用）

---

## → OP-DOC-VERIFY：待核对 URL/条款清单

供黑盒核对（逐条打开页面，核对**标题、段落是否存在**及**与上文化述是否一致**，不依赖本机安装）：

1. [Memory Overview](https://docs.openclaw.ai/concepts/memory) — 是否仍写明：Markdown 落盘、无隐藏状态；`MEMORY.md` / `memory/YYYY-MM-DD.md` 的职责与「DM 加载 / 今日与昨日自动加载」表述。  
2. 同上页 **Memory tools** — 是否仍列出 `memory_search`、`memory_get`，并写明由 active memory 插件（默认 `memory-core`）提供。  
3. [Memory Search](https://docs.openclaw.ai/concepts/memory-search) — 是否在 embedding 已配置时描述 hybrid search（语义 + 关键词）及提供方/调参入口，与 Overview 的交叉链接是否有效。  
4. [Memory Overview — Automatic memory flush](https://docs.openclaw.ai/concepts/memory) — 是否仍写明：**在 compaction 摘要之前**执行静默 flush、默认开启、目的在于避免 compaction 时上下文丢失。  
5. [Compaction](https://docs.openclaw.ai/concepts/compaction) — 是否与 Memory 文档一致描述 **compaction 与 memory 的交互**（含 Further reading 或等价小节指向 memory）。  
6. （扩展）[Memory configuration reference](https://docs.openclaw.ai/reference/memory-config) — 若需验收「可配置项」边界，核对与 Overview 中「默认行为」是否无矛盾。  
7. （扩展）[Builtin Memory Engine](https://docs.openclaw.ai/concepts/memory-builtin) — 若需核对默认 SQLite 后端与「开箱即用」表述是否与当前文档一致。

---

**B 级隔离说明**：未使用社区教程、论坛帖作为上述机制句的依据；若 OP 发现官方页改版导致与上表不一致，以**当前线上文档**为准并标 **B/待更新** 回灌统帅。

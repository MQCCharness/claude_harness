# OP-DOC-VERIFY 关门稿 — EP-2

**CHAIN**：`LEGION-TOOL-AGENT-ANALYSIS-20260330`  
**ROUND**：3  
**ROLE**：OP-DOC-VERIFY（叶 OP，文档黑盒核对）  
**PARENT_REF**：MG-OPENCLAW-RUNTIME EP-1 汇流块  
**核对方式**：对清单 1～7 使用线上文档抓取（WebFetch，2026-03-30），对照 `MG-EP1-OPENCLAW-ROLLUP.md` 机制句。

**范围声明**：Claude 子代理通讯与 `MG-EP1-CLAUDE-ROLLUP.md` 非本 OP 范围。

---

## 1. 核对表

| 清单编号 | URL | MG 声称要点 | 线上文档是否支持 | 一句证据 |
| --- | --- | --- | --- | --- |
| 1 | https://docs.openclaw.ai/concepts/memory | Markdown 落盘、无隐藏状态；`MEMORY.md` / `memory/YYYY-MM-DD.md` 职责；DM 会话开始加载长期记忆；今日与昨日日笔记自动加载；工作区默认路径 | **PASS** | 页内：「writing plain Markdown files」「no hidden state」；「Loaded at the start of every DM session」「Today and yesterday's notes are loaded automatically」；「default `~/.openclaw/workspace`」 |
| 2 | 同上页「Memory tools」 | 列出 `memory_search`、`memory_get`；由 active memory 插件提供，默认 `memory-core` | **PASS** | 页内：「`memory_search`」「`memory_get`」；「Both tools are provided by the active memory plugin (default: `memory-core`).」 |
| 3 | https://docs.openclaw.ai/concepts/memory-search | embedding 配置语境下混合检索（向量 + 关键词/BM25）；提供方与调参入口；与 Overview 交叉链接有效 | **PASS** | 页内「How search works」：两路并行 Vector Search 与 BM25、合并；Quick start / Supported providers / `agents.defaults.memorySearch`；Further reading 含 [Memory](https://docs.openclaw.ai/concepts/memory) |
| 4 | https://docs.openclaw.ai/concepts/memory（Automatic memory flush） | compaction **摘要之前**静默回合提醒写入记忆；默认开启；目的为避免 compaction 时上下文丢失 | **PASS** | 页内：「Before compaction summarizes … runs a silent turn」「on by default」「The memory flush prevents context loss during compaction」 |
| 5 | https://docs.openclaw.ai/concepts/compaction | 与 Memory 文档一致描述 compaction 与 memory 交互；存在指向 memory 的延伸阅读或等价指向 | **PASS** | 「Auto-compaction」：「Before compacting … save important notes to memory files」并链至 `/concepts/memory`；Troubleshooting 含「memory flush」链回 Memory（无单独「Further reading」列表，**内联链视为等价**） |
| 6 | https://docs.openclaw.ai/reference/memory-config | 与 Overview「默认行为」无矛盾（可配置项边界） | **PASS** | 文首指向 Memory Overview / Builtin / Memory Search；Hybrid 默认 `enabled: true` 等与 Overview「配置 embedding 时 hybrid」可并存；无与「默认 flush / 默认插件」相冲突的表述 |
| 7 | https://docs.openclaw.ai/concepts/memory-builtin | 默认 SQLite 后端、「开箱即用」、无额外依赖起步 | **PASS** | 「default memory backend」「per-agent SQLite」「needs no extra dependencies to get started」「Works out of the box」 |

---

## 2. P0 与军令状⑤

**军令状 `MISSION-BRIEF.md` ⑤ — TC-B（OpenClaw）**  
要求至少覆盖下列中的**三项及以上**且带官方 URL：**Markdown 外存**、`MEMORY.md` / `memory/YYYY-MM-DD.md`、**memory_search / memory_get**、**compaction 前 memory flush**。

| 项 | 文档证据 |
| --- | --- |
| Markdown 外存 | Memory Overview：plain Markdown、no hidden state |
| `MEMORY.md` / `memory/YYYY-MM-DD.md` | Memory Overview — How it works |
| memory_search / memory_get | Memory Overview — Memory tools |
| compaction 前 memory flush | Memory Overview — Automatic memory flush；Compaction — Auto-compaction |

**结论**：四项均有当前官方页支持且可指 URL → **军令状 TC-B（OpenClaw）文档级：PASS**。

**ECHO-CHECK `EC-P1-TC`**（军令状 TC-B 四项 + URL，待 OP 核对后标 A/B）：  
本轮线上页与 MG 机制句一致，可指回 `docs.openclaw.ai` 当前正文 → **`EC-P1-TC`：PASS（证据等级按军令状为 A 级锚点）**。

**ECHO-CHECK `EC-P0-03`**（OpenClaw ≥3 项机制且带 URL）：已由同一批 URL 覆盖，**PASS**（与本轮核对一致）。

---

## 3. 漏项

- **MG 未点明、文档存在的信息**：`memory-config` 与 `memory-builtin` 含较多调参项（MMR、temporal decay、session memory 实验项、QMD/Honcho 等）；MG EP-1 聚焦四条主机制，**不构成与 MG 陈述的矛盾**，仅属扩展阅读未写入汇流块。
- **Compaction 页结构**：无与 Memory 页对称的「Further reading」列表标题，但正文与排错节已**多次**链至 Memory；与清单 5「Further reading **或**等价」一致，**不记为 FAIL**。

**未发现**「文档之间存在与 MG 汇流块直接打架」的条款（索引路径 `~/.openclaw/memory/…` 与工作区 Markdown 路径分层，属不同概念，MG 未误混为同一文件路径）。

---

## 4. RISK_OWNER

- 本次 **7 个 URL 均成功抓取**，无 404、无抓取失败。
- **后续风险**：若 OpenClaw 改版导致正文变更，以**当时线上文档**为准；汇流块需由 **MG / 统帅** 按变更重跑文档核对或标 **B/待更新**（见 MG rollup 末段 B 级隔离说明）。**读者**在引用旧截图或缓存时自负与时效不一致风险。

---

**OP 收口结论**：清单 1～7 文档黑盒核对 **PASS**；**EC-P1-TC** 与军令状⑤ OpenClaw TC-B **PASS**（文档级，非安装实测）。

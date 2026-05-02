# 完整分析报告（合并版）

**任务链**：`LEGION-TOOL-AGENT-ANALYSIS-20260330`  
**生成日期**：2026-03-30  
**形态**：军团 L3 知识型分析；EP-0 → EP-1（双 MG）→ EP-2（OP）已执行完毕。

**本文件**：将 `artifacts/` 内各阶段汇流与关门稿**合并为单份 Markdown**，便于对外转发或归档。分件原文路径见文末「分件索引」。

---

## 目录

1. [执行摘要](#1-执行摘要)  
2. [原始需求与冻结目标](#2-原始需求与冻结目标)  
3. [分析组织架构](#3-分析组织架构)  
4. [EP-0：证据分级与约束（EX）](#4-ep-0证据分级与约束ex)  
5. [EP-1：Claude sub-agent 与多启（MG）](#5-ep-1claude-sub-agent-与多启mg)  
6. [EP-1：OpenClaw 长时记忆（MG）](#6-ep-1openclaw-长时记忆mg)  
7. [EP-2：OpenClaw 官方文档核对（OP）](#7-ep-2openclaw-官方文档核对op)  
8. [链终态、回声与风险](#8-链终态回声与风险)  
9. [分件索引](#9-分件索引)

---

## 1. 执行摘要

| 主题 | 结论要点 | 证据等级（本链） |
|------|----------|------------------|
| **Claude sub-agent「通讯」** | 公开文档可复核部分：**父级编排**、**子代理独立会话（上下文隔离）**、**仅终态回流父级**、**可多子并发**；**无**官方「子代–子代对等总线」的 A 级叙述。团队共享盘/目录属 **B**（组织实践），不得与 SDK 隔离语义混为同层 A。 | 机制句多 **A**（[Anthropic Subagents SDK](https://docs.anthropic.com/en/docs/claude-code/sdk/subagents)）；跨 SKU/版本边界 **B** 待 R2 |
| **简短描述/文件多启** | 注册 `description` / 代码注册 / **`.claude/agents/*.md`** 等路径；运行时由父侧 `spawn`、归并结果。 | **A**（同上官方文档） |
| **OpenClaw 长时上下文** | **工作区 Markdown 为真源**（`MEMORY.md` + 按日 `memory/…`）；**memory_search / memory_get**；**compaction 前 automatic memory flush**；检索侧 hybrid（文档级描述）。 | **A**（[docs.openclaw.ai](https://docs.openclaw.ai/concepts/memory)）；**未**做本链 TC-E 安装实测 |
| **文档核对** | MG 汇流块所列 **7 个官方 URL** 经 OP 黑盒核对均为 **PASS**（2026-03-30 抓取）。 | OP 关门稿 **PASS** |

**链终态**：**COND_PASS** —— OpenClaw 文档轨道 **PASS（A，文档级）**；Claude 产品版本/SKU 边界仍为 **B**（读者或 R2 复核）。详见 [§8](#8-链终态回声与风险)。

---

## 2. 原始需求与冻结目标

### 2.1 原始需求（用户原文，未改写）

假如你是一个专业的软件工具分析师团队去分析一下claude软件的sub agent之间是如何进行通讯的它是怎么实现一个简短的agent描述文件就可以启动多个agent或者说你可以给我举个例子说明它是怎么实现的第二个问题是openclow作为一个长时间运行的智能体它是怎么解决长时间运行的上下文的诗意问题呢年轻你分析。军团模式执行

### 2.2 冻结目标句与硬约束（摘录）

- **目标**：交付可理解、可核验层级分明的说明：（1）Claude sub-agent **协调拓扑**（父级/磁盘等）、**简短描述多启**与概念级示例；（2）**OpenClaw** 长时运行下**上下文与记忆**机制（官方文档 **A**；社区 **B**）。「诗意」按 **上下文窗口 / 失忆与压缩** 解读。  
- **硬约束**：OpenClaw 须可指回 Memory Overview 及子链；Claude 无内部源码不得将实现细节标 **A**；本链**不**索要密钥；默认**不要求** OpenClaw 安装实测（TC-E）。  
- **非目标**：逆向闭源 Claude；将「军团架构满编」与「满编蜂群五段」混用。  

全文见同目录 [`MISSION-BRIEF.md`](./MISSION-BRIEF.md)。

---

## 3. 分析组织架构

```
军团统帅（+1）
├── EX·证据与分级（EX-EVIDENCE-RUBRIC）
├── MG·Claude 多代理（MG-CLAUDE-SUBAGENT）
└── MG·OpenClaw 长时运行（MG-OPENCLAW-RUNTIME）
        └── OP·文档核对（OP-DOC-VERIFY）
```

详见 [`ARCHITECTURE.md`](./ARCHITECTURE.md)、[`SCHEDULE.md`](./SCHEDULE.md)。

---

## 4. EP-0：证据分级与约束（EX）

*来源：`artifacts/EX-EP0-EVIDENCE-RUBRIC-ROLLUP.md`*

### EX-EVIDENCE-RUBRIC 汇流块 — EP-0

**CHAIN**：`LEGION-TOOL-AGENT-ANALYSIS-20260330`  
**EP**：EP-0 · **ROLE**：EX-EVIDENCE-RUBRIC  

### 1. A/B/C 分级表（本链适用）

| 等级 | 含义 | 可否写入「已拍板」主结论 |
|------|------|--------------------------|
| **A** | 可复核证据：官方公开文档 URL + 可定位条款/小节；或本仓库已冻结的 `MISSION-BRIEF.md` / `ARCHITECTURE.md` / `SCHEDULE.md` 字段（作链内契约，非厂商行为证明）。 | 是（须能指回链接或冻结路径+要点）。 |
| **B** | 逻辑自洽或多方一致叙述，但**未**经官方文档或本链约定 TC 复核；含第三方博文、推断、类比、过时产品说明。 | 否；须标「待核实/第三方」并避免与 A 混写。 |
| **C** | 偏好、经验法则、无证据链的「像/应该」。 | 否；仅可作非约束性备选。 |

**Claude 侧（无内部源码时）**  
- **实现层**（进程间协议、客户端源码级调用图、闭源 UI 行为细节）：**默认不得标 A**；若仅有公开帮助/营销页且未给出可逐条核验的机制描述，整体按 **B** 管理。  
- **产品叙述层**：仅当能指回 **Anthropic/Claude 产品公开文档**可引用段落时可升 **A**；否则为 **B**。  
- **Teams / 磁盘协作**：可为 **B**；**禁止**在无官方锚点时写成 A。

**OpenClaw 侧如何达到 A**  
- 须指回 [`Memory Overview`](https://docs.openclaw.ai/concepts/memory) 及 **compaction、memory flush、search** 等官方子链。社区教程：**仅 B/C**。

### 2. 禁止项清单（P-1～P-6）

| 编号 | 禁止项 |
|------|--------|
| P-1 | B/C 冒充 A 或不标等级 |
| P-2 | 索要 API Key 等凭证 |
| P-3 | 非公开链接作 A 依据 |
| P-4 | 闭源实现无来源的 A 级断言 |
| P-5 | 谎称本链已通过 OpenClaw 安装实测 |
| P-6 | 军团满编 vs 蜂群五段混用 |

### 3. → MG-CLAUDE-SUBAGENT（硬约束 6 条）

1. **拓扑口径三选一不打架**：汇流须对 **子代理间是否直连**、**父级归并**、**可选磁盘协作（Teams 叙述，B）** 给出**一致**结论边界；冲突处显式标 B 或待决，**禁止**静默合并。  
2. **子代理「通讯」表述**：优先使用 **协调/编排/上下文隔离** 等产品可观察语义；**禁止**在无 A 锚点下描写臆测「内部总线名、私有 RPC」。  
3. **简短描述多启**：仅交付 **概念级步骤或伪代码级示例**，满足「可理解」即可；**禁止**展开为逆向教程或冒充完整实现复现。  
4. **证据钉死**：凡称「Anthropic/Claude 官方如此」须 **URL + 摘录要点** 或可引用段落指针；否则整体按 **B** 并注明第三方。  
5. **与 EX 块互引**：最终汇流须在文首或摘要处 **显式声明** 本块 A/B/C 规则与禁止项已遵守（可一句）。  
6. **长度**：分析汇流块以 **机制说明 + 概念示例** 为限，**禁止**替代统帅全文终稿或写成冗长教程。

### 4. → MG-OPENCLAW-RUNTIME（硬约束 6 条）

1. **官方 URL 锚点**：机制陈述若作为事实进入「已拍板」，须指回 **Memory Overview**（`https://docs.openclaw.ai/concepts/memory`）及文档内 **compaction、memory flush、search** 相关链接；**禁止**仅用社区文章支撑 A。  
2. **须覆盖的文档主题（与 TC-B 对齐）**：汇流中应组织覆盖至少 **三项及以上** —— **Markdown 外存**、`MEMORY.md` / `memory/YYYY-MM-DD.md`、**memory_search / memory_get**、**compaction 前 memory flush** —— 且 **每项** 带官方 URL 或「由 Memory Overview 导航可达」的明确指针。  
3. **compaction / flush 用语**：使用 **官方文档中的术语与因果顺序**（尤其 compaction 与 flush 的先后/条件）；**禁止**自造与文档冲突的流程名或省略 flush 纪律。  
4. **→ OP 的 I/O**：向 **OP-DOC-VERIFY** 传递 **待核对 URL/条款列表**（条目化），不得要求 OP 依赖未给出的链接；统帅代发 OP 时 `PARENT_REF` 指 MG Task（见 `ARCHITECTURE.md`）。  
5. **工程边界**：默认 **不要求** 本链内完成安装与命令行实测；若做步骤描述，**禁止**写成已通过 TC-E，除非新波次冻结。  
6. **B 级素材隔离**：社区解读单独成段并标 **B**；**禁止**与 A 级官方句混在同一句结论中不加等级。

### 5. 开放风险（全文）

1. **「诗意」一词**：本链已冻结按 **上下文窗口 / 失忆与压缩** 解读；若用户原意含修辞/文学隐喻等其他维度，**待用户确认**后再扩写验收口径（否则 OP/MG 仅按当前冻结执行）。  
2. **Claude 产品文档时效与 SKU**：公开帮助页与具体客户端版本是否一致 **低置信**，若 MG 需把某拓扑句升为 A，**建议 R2** 核对当前官方页面版本与适用范围（Consumer / Team / API 文档分区）。  
3. **OpenClaw 文档与实现漂移**：官方文档更新快于用户本地认知时，**以 OP 对照文档的核对结论为准**；若出现「文档有而行为未验证」的灰色区，在汇流中标 **B** 或 **COND_PASS** 条件，**不**冒充端到端 A。

---

## 5. EP-1：Claude sub-agent 与多启（MG）

*来源：`artifacts/MG-EP1-CLAUDE-ROLLUP.md`*

已遵守 EP-0 的 A/B/C 与 P-1～P-6；**OpenClaw** 由另一轨道交付。

### 5.1 协调拓扑（三口径一致）

| 口径 | 结论边界 | 证据等级 |
|------|----------|----------|
| 子代理间「直连」 | 各子代理**独立会话**；未描述子代–子代对等信道；可观察为**父级发起调用**、结果**回流父侧** | **A**（指回官方）；未公开 peer 通道 **不写入已拍板** |
| 父级归并 | 中间步骤不全部进主会话；**仅终态回父级** | **A** |
| 磁盘/Teams | 组织面共享媒介；**不同于** SDK 内隔离语义 | **B** |

**一句话**：A 层 = 父级编排 + 子会话隔离 + 终态回流；B 层 = 团队存储实践，不升格为子代直连总线。

### 5.2 简短描述多启：步骤 + 伪代码

1. 注册子代理（`description` / prompt / tools）或 **Markdown 规格文件**（如 `.claude/agents/`）。  
2. 父会话按任务匹配或点名调用。  
3. **独立子会话**执行；可**并行**多子。  
4. **终态**交回父级归并。

```text
specs = load_agent_specs()
for name, spec in specs.items():
    register(name, description=spec.desc, prompt=spec.prompt, tools=spec.tools)
pending = []
for task in decompose(parent_goal):
    pending.append(spawn_subagent(task.matched_agent_name, task.input))
results = merge_parallel(pending)
parent_context += summarize_to_parent(results)
```

### 5.3 证据表（K-1～K-8）

| ID | 要点 | 等级 |
|----|------|------|
| K-1～K-5 | spawn、隔离、并行、description 委派、Markdown 文件定义 | **A** |
| K-6 | 官方子代–子代 RPC 总线 | **C**（不采纳） |
| K-7～K-8 | Teams/盘=直连；闭源实现细节 | **B** |

**官方锚点**：[Subagents in the SDK](https://docs.anthropic.com/en/docs/claude-code/sdk/subagents) — spawn、fresh conversation、仅 final message 回父级、并发、description、`.claude/agents/` 等。

### 5.4 TC-B（Claude）

三口径分层一致；**EC-P0-02** 在链上仍标 **B** 待版本/SKU 复核（见 §8）。

---

## 6. EP-1：OpenClaw 长时记忆（MG）

*来源：`artifacts/MG-EP1-OPENCLAW-ROLLUP.md`*

**不声称**本链已完成 **TC-E** 安装实测；下文为**文档级 A**。

### 6.1 机制（四条 + 官方链接）

1. **Markdown 外存、无隐藏状态** — [Memory Overview](https://docs.openclaw.ai/concepts/memory)  
2. **`MEMORY.md`（每 DM 加载）**与 **`memory/YYYY-MM-DD.md`（今日+昨日自动加载）** — 同上 *How it works*；默认工作区 `~/.openclaw/workspace`  
3. **`memory_search` / `memory_get`**；默认插件 `memory-core`；hybrid 见 [Memory Search](https://docs.openclaw.ai/concepts/memory-search)  
4. **compaction 前 [automatic memory flush](https://docs.openclaw.ai/concepts/memory)**；与 [Compaction](https://docs.openclaw.ai/concepts/compaction) 交叉引用  

### 6.2 → OP 待核对 URL 清单（7 条）

1. [Memory Overview](https://docs.openclaw.ai/concepts/memory)  
2. 同上 Memory tools  
3. [Memory Search](https://docs.openclaw.ai/concepts/memory-search)  
4. Memory — Automatic memory flush  
5. [Compaction](https://docs.openclaw.ai/concepts/compaction)  
6. [memory-config](https://docs.openclaw.ai/reference/memory-config)  
7. [memory-builtin](https://docs.openclaw.ai/concepts/memory-builtin)  

---

## 7. EP-2：OpenClaw 官方文档核对（OP）

*来源：`artifacts/OP-EP2-DOC-VERIFY-CLOSURE.md`*

**范围**：**不**核对 Claude 轨道（见 `MG-EP1-CLAUDE-ROLLUP.md`）。

### 7.1 核对表（全文）

| 清单编号 | URL | MG 声称要点 | 线上文档是否支持 | 一句证据 |
| --- | --- | --- | --- | --- |
| 1 | https://docs.openclaw.ai/concepts/memory | Markdown 落盘、无隐藏状态；`MEMORY.md` / `memory/YYYY-MM-DD.md` 职责；DM 会话开始加载长期记忆；今日与昨日日笔记自动加载；工作区默认路径 | **PASS** | 页内：「writing plain Markdown files」「no hidden state」；「Loaded at the start of every DM session」「Today and yesterday's notes are loaded automatically」；「default `~/.openclaw/workspace`」 |
| 2 | 同上页「Memory tools」 | 列出 `memory_search`、`memory_get`；由 active memory 插件提供，默认 `memory-core` | **PASS** | 页内：「`memory_search`」「`memory_get`」；「Both tools are provided by the active memory plugin (default: `memory-core`).」 |
| 3 | https://docs.openclaw.ai/concepts/memory-search | embedding 配置语境下混合检索（向量 + 关键词/BM25）；提供方与调参入口；与 Overview 交叉链接有效 | **PASS** | 页内「How search works」：两路并行 Vector Search 与 BM25、合并；Quick start / Supported providers / `agents.defaults.memorySearch`；Further reading 含 Memory |
| 4 | https://docs.openclaw.ai/concepts/memory（Automatic memory flush） | compaction **摘要之前**静默回合提醒写入记忆；默认开启；目的为避免 compaction 时上下文丢失 | **PASS** | 页内：「Before compaction summarizes … runs a silent turn」「on by default」「The memory flush prevents context loss during compaction」 |
| 5 | https://docs.openclaw.ai/concepts/compaction | 与 Memory 文档一致描述 compaction 与 memory 交互；存在指向 memory 的延伸阅读或等价指向 | **PASS** | 「Auto-compaction」：「Before compacting … save important notes to memory files」并链至 `/concepts/memory`；Troubleshooting 含「memory flush」链回 Memory（内联链视为等价） |
| 6 | https://docs.openclaw.ai/reference/memory-config | 与 Overview「默认行为」无矛盾（可配置项边界） | **PASS** | 文首指向 Memory Overview / Builtin / Memory Search；Hybrid 默认等与 Overview 可并存 |
| 7 | https://docs.openclaw.ai/concepts/memory-builtin | 默认 SQLite 后端、「开箱即用」、无额外依赖起步 | **PASS** | 「default memory backend」「per-agent SQLite」「needs no extra dependencies to get started」「Works out of the box」 |

### 7.2 P0 与军令状⑤（OP 原文结构）

**军令状 TC-B（OpenClaw）** 要求至少覆盖下列中的**三项及以上**且带官方 URL：**Markdown 外存**、`MEMORY.md` / `memory/YYYY-MM-DD.md`、**memory_search / memory_get**、**compaction 前 memory flush**。

| 项 | 文档证据 |
| --- | --- |
| Markdown 外存 | Memory Overview：plain Markdown、no hidden state |
| `MEMORY.md` / `memory/YYYY-MM-DD.md` | Memory Overview — How it works |
| memory_search / memory_get | Memory Overview — Memory tools |
| compaction 前 memory flush | Memory Overview — Automatic memory flush；Compaction — Auto-compaction |

**结论**：四项均有当前官方页支持且可指 URL → **军令状 TC-B（OpenClaw）文档级：PASS**。  
**EC-P1-TC**：**PASS（A 级锚点，文档级）**。**EC-P0-03**：**PASS**。

**OP 收口结论**：清单 1～7 文档黑盒核对 **PASS**；**非**安装实测 TC-E。

### 7.3 漏项（OP 原文）

- **MG 未点明、文档存在的信息**：`memory-config` 与 `memory-builtin` 含较多调参项（MMR、temporal decay、session memory 实验项、QMD/Honcho 等）；MG EP-1 聚焦四条主机制，**不构成与 MG 陈述的矛盾**，仅属扩展阅读未写入汇流块。  
- **Compaction 页结构**：无与 Memory 页对称的「Further reading」列表标题，但正文与排错节已**多次**链至 Memory；与清单 5「Further reading **或**等价」一致，**不记为 FAIL**。  
- **未发现**「文档之间存在与 MG 汇流块直接打架」的条款。

### 7.4 RISK_OWNER（OP 原文）

- 本次 **7 个 URL 均成功抓取**，无 404、无抓取失败。  
- **后续风险**：若 OpenClaw 改版导致正文变更，以**当时线上文档**为准；汇流块需由 **MG / 统帅** 按变更重跑文档核对或标 **B/待更新**。**读者**在引用旧截图或缓存时自负与时效不一致风险。

---

## 8. 链终态、回声与风险

*来源：`ECHO-CHECK.md`（合并摘要）*

| 检查项 | 结果 |
|--------|------|
| 三件套 / EP-0 / EP-1 / EP-2 Gate | **PASS** |
| EC-P1-TC（OpenClaw TC-B） | **PASS（A，文档级）** |
| EC-P2-OP（清单 1～7） | **PASS** |
| EC-P0-02（Claude 版本/SKU） | **B**，建议 R2 |
| TC-E（OpenClaw 安装运行） | **未纳入**本链（军令状④） |

**链终态**：**COND_PASS** —— OpenClaw **文档轨道**闭环；Claude **B** 残留为已知风险；统帅曾抽样 WebFetch Memory Overview 与 OP 表一致。

---

## 9. 分件索引

| 文件 | 说明 |
|------|------|
| [`MISSION-BRIEF.md`](./MISSION-BRIEF.md) | 军令状全文 |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | 冻结架构 |
| [`SCHEDULE.md`](./SCHEDULE.md) | DAG / I/O |
| [`artifacts/EX-EP0-EVIDENCE-RUBRIC-ROLLUP.md`](./artifacts/EX-EP0-EVIDENCE-RUBRIC-ROLLUP.md) | EP-0 原文 |
| [`artifacts/MG-EP1-CLAUDE-ROLLUP.md`](./artifacts/MG-EP1-CLAUDE-ROLLUP.md) | EP-1 Claude 原文 |
| [`artifacts/MG-EP1-OPENCLAW-ROLLUP.md`](./artifacts/MG-EP1-OPENCLAW-ROLLUP.md) | EP-1 OpenClaw 原文 |
| [`artifacts/OP-EP2-DOC-VERIFY-CLOSURE.md`](./artifacts/OP-EP2-DOC-VERIFY-CLOSURE.md) | EP-2 OP 原文 |
| [`ECHO-CHECK.md`](./ECHO-CHECK.md) | 回声与 P0 表 |
| `PHASE-GATE-EP0.md` / `EP1` / `EP2` | 各 Gate 裁定 |

---

*报告结束。§5、§6 与 EP-1 分件正文一致；§4 A/B/C 表与禁止项表与 EP-0 分件一致。*

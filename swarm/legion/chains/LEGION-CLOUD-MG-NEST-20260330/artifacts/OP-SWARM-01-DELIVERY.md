# OP-SWARM-01 末端交付 — 子任务 α（Cloud 多 Agent / Sub-agent 通讯与编排）

**CHAIN**：`LEGION-CLOUD-MG-NEST-20260330`  
**ROLE**：OP-SWARM-01（叶 OP）  
**PARENT_REF**：MG-MGR-01  
**ROUND**：4  
**日期**：2026-03-30  

---

## 1. 子任务 α 结论：通讯形态、声明式实例化、编排器—工作者

### 1.1 通讯形态（星形、父注入、终态回灌、并行语义）

| 维度 | 说明 |
|------|------|
| **星形（中枢—辐条）** | 多 Sub-agent **不形成任意点对点会话网**；默认存在一个 **编排中枢**（IDE 主会话/统帅、`run()` 入口、manager agent），各工作者仅与中枢交换任务与结果。 |
| **父注入** | 父层将 **冻结目标句、硬约束、最小充分摘要、CHAIN/ROUND/ROLE 锚点** 写入子 Task 正文；子代理 **默认不订阅** 父会话终端与全量历史（与本仓「证据回灌」纪律一致）。 |
| **终态回灌** | 子 run **结束态**（结论、交付物路径、风险/待决）经中枢 **汇总** 再进入下游；禁止假设子代理已「看见」未粘贴的输出。 |
| **并行语义** | **逻辑并行**（多路独立子任务，`Promise.all` 等）仍经中枢 **汇流** 合并；并行不等价于「子代理彼此直连对话」。 |

**来源类型**：**B**（模式归纳 + 与本仓 `CLAUDE.md §二` 中 Sub-agent/汇流条款对齐）；Cloud 厂商内部拓扑未公开处保持 **C**。

### 1.2 声明式短描述如何实例化多 Agent

「声明式」指 **用数据/文件描述角色与边界**，运行时由编排器读取并构造 Agent/会话，而非在业务代码里硬编码长篇提示。

- **与本仓可对齐的两种官方路径（Cursor）**  
  - **Project Rules**：`.claude/rules/*.md` / `*CLAUDE.md`，用 **frontmatter**（`description`、`globs`、`alwaysApply` 等）+ Markdown 正文承载持久指令。见 [Cursor Rules](https://cursor.com/docs/rules)。  
  - **AGENTS.md**：仓库根或子目录的纯 Markdown 指令，作为 Rules 的轻量替代。见同页 [AGENTS.md](https://cursor.com/docs/rules) 节。  

- **示意结构（YAML 风味 frontmatter + 角色提示，非产品强制文件名）**  

```yaml
---
description: "子任务 α — 数据面审计员；仅输出 TC 表与风险，不写业务代码"
alwaysApply: false
---

你是独立测试视角：仅基于契约级输入列出 TC-…；禁止读取未授权的完整实现 diff。
```

**说明**：用户示例中的 `.claude/agents/*.md` 可作为 **团队自建目录约定**；Cursor 文档主推 `.claude/rules` 与 `AGENTS.md`。该路径差异标 **B**（惯例 vs 官方默认）。

### 1.3 编排器—工作者抽象

| 抽象 | 职责 |
|------|------|
| **编排器（Orchestrator）** | 解析意图、拆分子任务、**路由** 至对应工作者、合并终态、处理闸门顺序（如 R1+R2→R3、R4a∥R3、R4b 后置）。在 IDE 侧常映射为 **主对话统帅 + Task 派发**；在 SDK 侧可为 **manager agent** 或 **显式代码编排**。 |
| **工作者（Worker）** | 在 **给定最小上下文** 下完成单域产出（开发/测试/调研等），将 **可指针化摘要** 交回编排器。 |

---

## 2. Handoffs vs Agents-as-tools 对比矩阵

（表内「最佳实践」摘要来自 OpenAI Agents SDK 文档 [Agent orchestration](https://openai.github.io/openai-agents-js/guides/multi-agent)。）

| 对比项 | Handoffs | Agents as tools（`agent.asTool()`） |
|--------|----------|-------------------------------------|
| **控制权** | 分流后 **专员成为当前活跃 agent**，延续其指令/模型配置处理后续轮次。 | **经理 agent 始终掌控对话**；专员以「工具调用」形式被唤起，不默认接管用户面对话。 |
| **典型用途** | 专员需 **直接对用户线程负责**、或需 **极窄上下文** 的深度专精。 | 经理需 **整合多专员片段**、统一护栏、或专员只做 **有界子任务**。 |
| **上下文** | Handoff **保留会话上下文**并切换到专员提示（文档表述）。 | 结果作为工具输出回到经理，由经理决定如何呈现。 |
| **与本仓星形纪律** | 仍可有 **单一用户面对话边**；多轨 Sub-agent 与 handoff **不同层**（后者多为单线程内活跃角色切换）。 | 更接近「经理 = 中枢、专员 = 工具型工作者」的 **辐条** 结构。 |
| **可组合性** | 可与 asTool **混用**（文档：先 handoff 再 asTool 子任务）。 | 同上。 |

**API 深入**： [Handoffs 指南](https://openai.github.io/openai-agents-js/guides/handoffs)、[Tools — agents as tools](https://openai.github.io/openai-agents-js/guides/tools#agents-as-tools)。

---

## 3. Orchestrator / Worker / Runtime 与 Cursor、OpenAI Agents SDK 映射（短表）

| 概念 | Cursor（产品文档语境） | OpenAI Agents SDK（TypeScript） |
|------|------------------------|----------------------------------|
| **Orchestrator** | **Agent（侧栏）** 会话：在 instructions + [Rules](https://cursor.com/docs/rules) + tools 下完成多步任务；**统帅**派发 Sub-agent/Task 属协作治理层扩展。 | **`run()` / Runner** 驱动 agent loop；或 **manager agent** 通过 handoff / asTool 编排。见 [Running agents](https://openai.github.io/openai-agents-js/guides/running-agents)、[Multi-agent](https://openai.github.io/openai-agents-js/guides/multi-agent)。 |
| **Worker** | **Sub-agent（Task）** 会话：隔离上下文执行单角色；终态回主会话。 | 被 handoff 的 **specialist Agent**，或 **asTool** 挂接的 Agent。 |
| **Runtime** | Cursor IDE + 模型提供方；工具含终端、检索、浏览器等。见 [Cursor Agent 概览](https://cursor.com/docs/agent/overview)。 | Node/TS 运行时 + `@openai/agents`；含 **Sessions**、tracing、MCP 等。见 [SDK 首页](https://openai.github.io/openai-agents-js/)。 |
| **声明式配置** | `.claude/rules`、`AGENTS.md` | `new Agent({ name, instructions, tools, ... })` + 代码或数据驱动注册；无强制 YAML 目录标准。 |

**分级**：上表「职责映射」为 **B**（文档对齐的架构类比）；具体闭源实现细节 **C**。

---

## 4. A/B/C 事实表（附来源类型）

| ID | 陈述 | 等级 | 来源类型 / 指针 |
|----|------|------|-----------------|
| F-01 | Cursor Agent 由 Instructions、Tools、Model 构成，并编排调用。 | **A** | 官方文档：[Cursor Agent overview](https://cursor.com/docs/agent/overview) |
| F-02 | Cursor Project Rules 存于 `.claude/rules`，支持 `.md`/`CLAUDE.md` 与 frontmatter（`description`、`globs`、`alwaysApply`）。 | **A** | [Cursor Rules](https://cursor.com/docs/rules) |
| F-03 | OpenAI Agents SDK 原语包含 Agents、**Agents as tools / Handoffs**、Guardrails。 | **A** | [openai-agents-js 首页](https://openai.github.io/openai-agents-js/) |
| F-04 | Handoffs 与 Agents as tools 的对比表（控制权、最佳场景）如文档所述。 | **A** | [Agent orchestration](https://openai.github.io/openai-agents-js/guides/multi-agent) |
| F-05 | 可通过 `Promise.all` 等在**代码层**并行运行多个 agent。 | **A** | 同上页「Orchestrating via code」 |
| F-06 | 本仓库要求：已调度的 R1–R4 视角须经 **Agent 子代理**，禁止主对话分饰多角替代。 | **A** | 仓库规则：`CLAUDE.md §二`（角色分工与 Sub-agent 强制隔离） |
| F-07 | 本仓库军令状：跨角色信息经 **统帅或冻结 I/O**，子代理不直连互聊。 | **A** | 本链 [`MISSION-BRIEF.md`](../MISSION-BRIEF.md) §③ |
| F-08 | 某公有云「Background Agents」内部消息总线是否为星形/网状。 | **C** | 无公开可点条款则保持推测/待核验 |
| F-09 | `.claude/agents/*.md` 为 Cursor 官方唯一推荐入口。 | **C** | 官方文档主推 `rules` / `AGENTS.md`；自定义路径属团队约定时为 **B** |

---

## 5. 治理纪律 vs 产品技术实现（≤150 字）

本仓库「子代理不直连互聊」约束的是**协作与审计**：跨角色信息须经统帅或冻结 I/O，防止串台与证据链断裂。Handoff、asTool、`Promise.all` 等多 Agent 能力是**运行时编排**。二者分层——前者规定「谁与谁建立会话边」，后者规定「如何执行与调度」；在星形中枢拓扑下常可同时满足，并不互相否定。

**（约 149 字）**

---

## 6. 自检：TC-B-α-01～05

> **说明**：仓库内未检出 MG-MGR-01《任务书》单独落盘；下列条目按 **α 目标句**（`MISSION-BRIEF.md` 问题① + `ARCHITECTURE.md` 子任务 α 收口）与本轮 OP 发包正文 **等价覆盖** 来自检。

| TC-ID | 等价验收意图（摘要） | 结果 | 一句话证据 |
|-------|----------------------|------|------------|
| **TC-B-α-01** | 阐明星形、父注入、终态回灌、并行语义 | **PASS** | 见 §1.1 表与四条目 |
| **TC-B-α-02** | 声明式短描述（YAML/frontmatter + 提示）如何实例化 | **PASS** | 见 §1.2 与 Cursor Rules/AGENTS.md 引用 |
| **TC-B-α-03** | 编排器—工作者抽象可理解、可追溯 | **PASS** | 见 §1.3 |
| **TC-B-α-04** | Handoffs vs Agents-as-tools 对比 | **PASS** | 见 §2 矩阵与官方 orchestration 链接 |
| **TC-B-α-05** | Cursor / OpenAI SDK 映射 + A/B/C 事实表 | **PASS** | 见 §3、§4；无密钥与杜撰 URL |

---

## 7. 交付物指针

- **本文件路径（相对仓库根）**：`.claude/swarm/legion/chains/LEGION-CLOUD-MG-NEST-20260330/artifacts/OP-SWARM-01-DELIVERY.md`
- **上游**：[`MISSION-BRIEF.md`](../MISSION-BRIEF.md)、[`ARCHITECTURE.md`](../ARCHITECTURE.md)、[`SCHEDULE.md`](../SCHEDULE.md)

---

*OP-SWARM-01 本轮按统帅指令：未向内派发 L2 R* Task；末端一次性写入仓库。*

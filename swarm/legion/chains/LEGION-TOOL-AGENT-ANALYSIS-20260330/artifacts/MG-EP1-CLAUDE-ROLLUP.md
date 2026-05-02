# MG-CLAUDE-SUBAGENT 汇流块 — EP-1

**CHAIN**：`LEGION-TOOL-AGENT-ANALYSIS-20260330`  
**EP**：EP-1  
**ROLE**：MG-CLAUDE-SUBAGENT（Claude 多代理轨道）  
**来源**：Sub-agent Task（ROUND=2）  
**PARENT_REF**：用户指令「派发 EP-1」

已遵守 EP-0 的 A/B/C 分级约定与禁止项 P-1～P-6；本块不索要或引导用户提供任何密钥与凭证。

**OpenClaw 长时运行、外存与 compaction**：非本轨道，由 **MG-OPENCLAW-RUNTIME** 按军令状与官方 Memory 文档组织交付。

---

## 1. 协调拓扑（B 为主与 A 锚点并存：三口径一致边界）

以下三条**同时成立、语义分层**，避免「既说直连又说只经父级」的混写：

| 口径 | 结论边界 | 证据等级 | 说明 |
|------|----------|----------|------|
| **子代理间是否「直连」** | 官方文档强调**各子代理在独立会话中运行**，中间工具调用与过程态留在子会话；**未**将「子代 A 与子代 B 之间的对等信道」描述为一等产品机制。工程上可观察的协作是：**主代理通过 Agent 工具等路径发起子代理调用**，子代理产出以**回流父侧**为主轴。 | **A**（机制叙述可指回下文「可升 A 的锚点」）；「是否存在未公开的 peer 通道」**无 A** → **不写入已拍板** | 与 P-4 一致：不对闭源实现做无来源的协议级 A 断言。 |
| **父级归并** | 子代理侧的中间步骤默认**不**等价于全部进入主会话；**仅子代理的最终消息回到父级**（父侧再做综合、续轮或再派子任务）。 | **A** | 与 SDK 文档「Context isolation」一致。 |
| **可选磁盘协作（Teams 类叙述）** | 在**组织/工作区**层面，团队可存在共享盘、知识库、约定目录等**人类协作面**的「共同读写媒介」；这与 **SDK 内子代理上下文隔离**是**不同层次**：前者不替代后者的隔离语义，也不构成官方保证的「子代–子代直连总线」。 | **B**（第三方/产品营销或团队实践叙述；军令状已允许 Teams 为 B） | **禁止**在无官方逐条机制时把 Teams/磁盘写成 **A** 级实现断言（对齐 EX 块）。 |

**一致性一句话**：**A 层**只锁「父级编排 + 子会话隔离 + 终态回流父级」；**B 层**只承载「团队共享存储/流程」等**可选增强**，且**不宣称**子代理之间因此自动建立官方对等通信。

---

## 2. 简短 agent 描述多启：概念步骤 + 短伪代码

**概念步骤（与官方「description 驱动委派」一致，A）**

1. 在父应用侧**注册**一组子代理定义（名称、`description`、`prompt`、可选 `tools` / `model`），或按约定目录放置 **Markdown 规格文件**（文件路径型定义见官方文档链接，**A** 指回文档）。  
2. 父会话中的模型在需要时**选择**调用某个子代理（由 `description` 与当前任务匹配，或由用户显式点名）。  
3. 运行时**派生**独立子会话；子代理在受限工具集内执行；**并行**时多条子调用可同时进行（**A**）。  
4. 子代理结束后将**最终答复**交回父级；父级**归并**为多子结果后的下一步规划或对用户输出。

**短伪代码（概念级，非逆向、非完整实现）**

```text
specs = load_agent_specs()            # 代码 agents={...} 或扫描 .claude/agents/*.md 等
for name, spec in specs.items():
    register(name, description=spec.desc, prompt=spec.prompt, tools=spec.tools)

# 父轮次：模型可发出若干「调用子代理」动作（由 SDK/产品封装）
pending = []
for task in decompose(parent_goal):
    pending.append(spawn_subagent(task.matched_agent_name, task.input))

results = merge_parallel(pending)     # 多子代理可并发（A）
parent_context += summarize_to_parent(results)   # 仅终态/摘要进入父主线（A）
```

---

## 3. 证据表（关键结论 × A/B/C）

| ID | 结论要点 | 等级 | 信息源类型 |
|----|----------|------|------------|
| K-1 | 子代理是主代理可 **spawn** 的独立实例，用于子任务隔离与并行。 | **A** | Anthropic 官方文档 [`Subagents in the SDK`](https://docs.anthropic.com/en/docs/claude-code/sdk/subagents) |
| K-2 | **上下文隔离**：子代理在**全新会话**中运行；中间工具调用与结果留在子代理内，**仅最终消息回到父级**。 | **A** | 同上页「Context isolation」 |
| K-3 | **多子代理可并发**，用于加速复杂工作流。 | **A** | 同上页「Parallelization」 |
| K-4 | 子代理可由 **`description`** 字段说明适用场景，主代理**自动委派**；也可在提示中显式按名称调用。 | **A** | 同上页「Overview」段 |
| K-5 | 除编程注册外，可通过 **Markdown 文件**在约定目录（文档示例：`.claude/agents/`）定义子代理（与「简短描述文件启动多代理」产品叙述对齐）。 | **A** | 同上页「You can create subagents in three ways」及 filesystem 条目（另见文档内链 `defining subagents as files`） |
| K-6 | 子代理间存在与父级无关的**官方对等通信协议**（类 RPC 总线）。 | **C** | 本回合**不采纳**：公开文档未提供可复核条款；标 **C** 仅为「勿据此设计」 |
| K-7 | Teams / 企业共享盘 / 约定仓库目录 = 子代理**直连**或替代 SDK 隔离。 | **B** | 组织实践与第三方叙述；**不得**与 K-2 混为同层 **A** |
| K-8 | 具体桌面客户端内部进程间实现细节（非文档覆盖部分）。 | **B** | 推断/社区；对齐军令状非目标「逆向闭源实现」 |

---

## 4. 可升 A 的锚点（Anthropic / Claude 官方公开文档）

| URL | 一句摘录（可回指） |
|-----|---------------------|
| https://docs.anthropic.com/en/docs/claude-code/sdk/subagents | 「Subagents are separate agent instances that your main agent can spawn to handle focused subtasks.」 |
| 同上 | 「Each subagent runs in its own fresh conversation. Intermediate tool calls and results stay inside the subagent; only its final message returns to the parent.」 |
| 同上 | 「Multiple subagents can run concurrently, dramatically speeding up complex workflows.」 |
| 同上 | 「When you define subagents, Claude determines whether to invoke them based on each subagent's `description` field.」 |
| 同上 | 「Filesystem-based: define agents as markdown files in `.claude/agents/` directories」 |

> **说明**：上表仅覆盖本 EP 已用抓取内容核验的句子；不同产品线（纯 API、Claude Code、控制台文档分区）适用范围以官方页面为准，跨产品迁移句建议后续 **R2** 按 EX 开放风险 2 再钉版本（**B** 待核实项）。

---

## 5. → 统帅 / EX 的转化摘要

- **TC-B（Claude）**：三口径已**分层一致**——**直连**按「无官方子代–子代对等信道、父级编排为主」表述（K-1～K-4 为 **A**）；**父级归并**有 **A**；**Teams/磁盘**为 **B** 且不升格为隔离机制的 **A**。  
- **→ OP**：本轨道**不向 OP 派发** OpenClaw I/O（见 `ARCHITECTURE.md`）；OpenClaw 待核对 URL 列表由 **MG-OPENCLAW-RUNTIME** 维护。

# 军令状（Mission Brief）— LEGION-TOOL-AGENT-ANALYSIS-20260330

**CHAIN**：`LEGION-TOOL-AGENT-ANALYSIS-20260330`  
**版本**：v1 冻结（2026-03-30）  
**穿透**：各 L3 节点 Task 须携带**本文路径** `MISSION-BRIEF.md` 或等价全文。

---

## ① 原始需求（不改写）

假如你是一个专业的软件工具分析师团队去分析一下claude软件的sub agent之间是如何进行通讯的它是怎么实现一个简短的agent描述文件就可以启动多个agent或者说你可以给我举个例子说明它是怎么实现的第二个问题是openclow作为一个长时间运行的智能体它是怎么解决长时间运行的上下文的诗意问题呢年轻你分析。军团模式执行

---

## ② 冻结目标句

交付 **可理解、可核验层级分明** 的说明：（1）Claude 相关产品中 sub-agent 的**协调拓扑**（父级/磁盘等）、**简短描述多启**的编排思路与**概念级示例**；（2）**OpenClaw** 长时间运行下**上下文与记忆**的机制（以官方文档为 **A** 级锚点；社区文章为 **B**）。  
「诗意」按 **上下文窗口 / 失忆与压缩** 解读；若用户另有本义须在链上追加冻结条。

---

## ③ 硬约束

- **证据**：OpenClaw 机制陈述须可指回 [Memory Overview](https://docs.openclaw.ai/concepts/memory) 及文档内链接（compaction、memory flush、search）；Claude 侧无内部源码时**不得**标 **A** 级实现细节，第三方解读标 **B**。  
- **组织**：仅向冻结架构**直连下级**发包；OP 仅承接 **MG-OPENCLAW-RUNTIME** 的 I/O（见 `SCHEDULE.md`）。  
- **`[PENETRATING]`**（穿透至叶 OP 与任何 L2 Task）：本链为**分析交付**，**不**处理用户凭证、**不**要求用户粘贴 API Key；引用外链仅公开文档。

---

## ④ 非目标

- 逆向或完整复现闭源 Claude 客户端实现。  
- 在本链内默认**不要求** OpenClaw 安装实测（若用户后续要求工程验收，须新冻结波次与 TC-E）。  
- 将「军团架构满编」与「满编蜂群五段」混为一谈（术语分立以蜂群 `CLAUDE.md` / 军团 `CLAUDE.md` 为准）。

---

## ⑤ 成功标准（可验收）

- **TC-B**：`ARCHITECTURE.md` / `SCHEDULE.md` / 本军令状五要素**无矛盾**；各 ROLE 产出可追溯到 I/O 表字段。  
- **TC-B（Claude）**：能说清 **子代理间是否直连**、**父级归并**、**可选磁盘协作（Teams 叙述，B）** 三选一事实口径不打架。  
- **TC-B（OpenClaw）**：至少覆盖 **Markdown 外存**、`MEMORY.md` / `memory/YYYY-MM-DD.md`、**memory_search / memory_get**、**compaction 前 memory flush** 中的**三项及以上**，且带官方 URL。  
- **OP 关门**：`ECHO-CHECK.md` 中 P0 与⑤对齐或声明 `COND_PASS` 条件与 RISK_OWNER。

---

## 附：权威路径

- 架构：[`ARCHITECTURE.md`](./ARCHITECTURE.md)  
- DAG / EP / I/O：[`SCHEDULE.md`](./SCHEDULE.md)

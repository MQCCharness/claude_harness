# OP-SWARM-02 末端交付（叶 OP）

`CHAIN=LEGION-CLOUD-MG-NEST-20260330` `ROUND=4` `ROLE=OP-SWARM-02` `PARENT_REF=MG-MGR-02`

---

## 1. 四层栈与长时上下文映射

### 传输层

指请求如何到达模型、是否流式、是否断连重试、以及**链上响应 ID / 会话对象**如何串联多轮。长时上下文的典型痛点是：你以为「状态在云端」，实则某次超时或客户端丢包导致**续写句柄失效**，下一轮模型看到的是截断或错序的 payload。**A**：官方文档明确 `previous_response_id`、WebSocket 续写与 `store` 对留存的影响（见下文链接）。**B**：具体网关/CDN 的超时与重试策略需按部署实测。**C**：「传输可靠＝上下文可靠」是过度简化。

### 契约层

指 API 返回/输入 items 的形态（消息、工具调用、工具结果、**压缩项**等）及计费语义（例如链式计费时历史 token 如何计入）。长时问题集中在：**200 但 body 契约异常**、工具结果膨胀、以及压缩项 opaque 导致**人类不可审计**只能靠「下一轮能续上」间接验证。**A**：OpenAI compaction 文档说明加密 compaction item 与 `previous_response_id` 两种续写模式。**A**：Anthropic context editing 说明服务端编辑与客户端全量历史的分工。**B**：各厂商字段演进频繁，需对照当前模型与 beta 头。

### 策略层

指**何时裁剪、裁剪什么、保留什么不变量**（阈值、清除最旧 tool results、thinking 保留策略、图状态 reducer 语义等）。长时运行的核心矛盾是：窗口有限而任务无限；策略选错会导致**隐性失忆**或**成本爆炸**。**A**：各厂商在各自文档中定义了默认策略与参数。**C**：「一次策略配好终身适用」不成立，需按任务类型调参。

### 客户端层

指 IDE/SDK/编排器如何维护**全量 transcript**、外置记忆（文件/DB）、以及如何把摘要或指针**注入**下一轮的 system/user。长时问题包括：子代理默认**看不见**父会话终端输出、resume 与 thread_id 对齐、以及本地状态与云端编辑不一致时的**双写幻觉**。**A**：Cursor 文档明确子代理独立上下文、父级需在 prompt 注入必要信息。**B**：具体产品版本间 resume/agent ID 行为以当前客户端为准。

---

## 2. 机制对照表（四列机制 × 三行维度，逐格 A/B/C）

> 说明：**A**＝可指回官方文档或产品文档条款；**B**＝依赖实现细节/版本/部署，需实测或二次核实；**C**＝经验归纳或类比，非厂商承诺。

| 维度 | OpenAI compaction | LangGraph checkpointer + thread | Anthropic context editing | Cursor subagents（隔离动机） |
|------|-------------------|----------------------------------|---------------------------|------------------------------|
| **保留什么** | **A** 加密 compaction item 承载的续写所需状态（opaque）；**A** `/responses/compact` 返回窗口作为下一轮 canonical input | **A** 每 super-step 的图状态快照；**A** 同 `thread_id` 上的 checkpoint 链；**A** 中断恢复与 pending writes 语义 | **A** 客户端侧完整未改 transcript；**A** 服务端按策略保留的 thinking/tool 结构；**A** 清除处以 placeholder 提示曾移除 | **A** 子代理独立上下文；**A** 父级仅收「最终结果」；**A** 可用 agent ID **resume** 延续子代理 |
| **丢掉什么** | **A** 超 `compact_threshold` 后服务端压缩/剪枝；**B** 与 `previous_response_id` 链并用时文档提示勿手工 prune | **A** 无 checkpointer 则无持久状态；**B** 具体后端决定保留时长与副本策略 | **A** 最旧 tool results（及可选 tool inputs）；**A** 可按配置丢掉部分 thinking | **A** 父会话全历史不默认可见；**A** 中间工具输出噪声不涌入父窗口（理想情况下） |
| **失败模式** | **B** 阈值/模型组合不当→质量或成本异常；**B** 漏传 compaction item→续写断；**C** opaque 项难以人类审计 | **B** 缺 `thread_id`→无法存取；**B** reducer 设计错误→「记忆」语义错；**C** 子图 `checkpoint_ns` 调试难 | **B** 清除与 prompt caching 交互→缓存失效与费用波动；**B** beta/模型清单约束；**C** 清过头→缺证据链 | **B** 并行子代理→总 token 放大；**B** 父摘要不足→子代理失忆；**C** 把隔离当成自动共享真值 |

---

## 3. 漂移：三种可操作定义 + 主用口径

### 目标漂移（Goal drift）

**可操作定义**：同一 `thread_id` / `CHAIN` 上，**已冻结**的目标句、范围、非目标或验收口径，在后续轮次被模型或编排逻辑**静默改写**，且未留下「显式推翻」记录。**标注**：**B**（依赖你们是否维护冻结条/CHAT 摘要；无流程则退化为 **C** 叙事）。

### 事实漂移（Fact drift）

**可操作定义**：模型或代理将 **B/C 级推断**、过期外部状态、或子代理未回灌的终端输出，当作 **A 级已验证事实**继续推理，导致与仓库/日志/API 真值偏离。**标注**：**B**（可通过指针化证据与 R4 实测缓解；完全无门禁时为 **C**）。

### 工具状态漂移（Tool-state drift）

**可操作定义**：注册表、MCP、本地文件、环境变量、依赖版本等**工具链状态**与对话中假设不一致，使「同名工具」产生不同副作用；或子代理与父代理对「已执行命令结果」认知不一致。**标注**：**B**（可脚本化复现为 A）；**C**「只要工具叫同一个名字就等价」。

### 主用口径建议

在工程与治理文案中，**优先使用「事实漂移 + 工具状态漂移」作为验收与门禁的主轴**，**目标漂移**绑定「形状保持 / 冻结条生命周期」单独治理。**理由（标注 C）**：二者更易落到可测证据（日志、文件、API）；纯「意图」若无冻结机制则易沦为口舌之争。

---

## 4. 长时运行模式与官方文档对齐（附 URL）

| 主题 | 要点（文档级） | 官方/产品链接 |
|------|----------------|---------------|
| OpenAI：会话状态、上下文窗口、`previous_response_id`、与 compaction 入口 | Responses / Conversations 持久化语义；链式调用时计费与 token；compaction 阈值与 opaque item | [Conversation state](https://platform.openai.com/docs/guides/conversation-state)、[Compaction](https://developers.openai.com/api/docs/guides/compaction) |
| OpenAI：Responses 紧凑 API 参考 | 独立 compact 端点与请求/响应形态 | [Responses compact API reference](https://developers.openai.com/api/docs/api-reference/responses/compact) |
| LangGraph：checkpointer、thread、`thread_id`、checkpoint 历史 | 线程 = checkpoint 序列；`thread_id` 为存储主键；super-step 边界与恢复 | [Persistence (LangGraph)](https://docs.langchain.com/oss/python/langgraph/persistence) |
| Anthropic：context editing（tool/thinking 清除） | 服务端编辑 vs 客户端全量历史；beta 头与缓存交互 | [Context editing](https://docs.anthropic.com/en/docs/build-with-claude/context-editing) |
| Anthropic：server-side compaction（与 context editing 文档互指） | 长对话主要策略之一为服务端 compaction（文档层级说明） | [Compaction](https://docs.anthropic.com/en/docs/build-with-claude/compaction) |
| Cursor：subagents、隔离、resume | 独立上下文、父级注入、agent ID resume | [Subagents](https://cursor.com/docs/agent/subagents) |

---

## 5. 自检（TC-B-OP02-001～005）

| 编号 | 结论 | 一句话 |
|------|------|--------|
| TC-B-OP02-001 | **PASS** | 已提供传输/契约/策略/客户端四层各一段，并逐层映射到长时上下文风险与抓手。 |
| TC-B-OP02-002 | **PASS** | 已给出**四列表头**（四机制）× **三行**（保留/丢掉/失败）对照表，且每格含 **A/B/C** 标注。 |
| TC-B-OP02-003 | **PASS** | 已定义目标/事实/工具状态三类漂移，给出主用口径建议并标明 **B/C**。 |
| TC-B-OP02-004 | **COND_PASS** | 已列 OpenAI / LangGraph / Anthropic / Cursor 官方链接并经 **WebFetch** 抽样可达；**Anthropic compaction 与 context editing 存在多域名路径**（`docs.anthropic.com` 与 `anthropic.com` 互链），以你方内网与当前重定向为准持续核验。 |
| TC-B-OP02-005 | **PASS** | 本条自检表覆盖 001～005 且逐条给出 **PASS/COND** 与一句话理由。 |

---

*本文件不含密钥与隐私请求体示例。*

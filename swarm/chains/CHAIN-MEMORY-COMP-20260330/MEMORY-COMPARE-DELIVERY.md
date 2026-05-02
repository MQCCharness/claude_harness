# 长时记忆维度：本蜂群/军团体系 vs Claude 生态 vs OpenClaw

**CHAIN**：`CHAIN-MEMORY-COMP-20260330`  
**日期**：2026-03-30  
**读者**：需要「像 OpenClaw 一样落盘、又像 Claude 一样能续聊」时，看清**本仓库治理体系**与两者的同异与代价。  
**证据**：OpenClaw / Anthropic 以公开文档为准；本体系以 `CLAUDE.md` 与 `.claude/swarm/` 约定为准。

---

## 1. 一句话定位

| 体系 | 一句话 |
|------|--------|
| **本体系（蜂群 + 军团）** | 「可审计续聊」押在**仓内 Markdown/规则真源 + 记忆接力 Read 序 + 闸门与时序**；记忆是**流程与纪律的产物**，不是单一商业功能开关。 |
| **Claude 生态** | **API 无会话记忆**；网页/应用端有 **Project memory 等**；**Claude Code** 靠 **`CLAUDE.md` + auto memory**；**Memory tool** 把持久化交给**集成方在客户端**实现。 |
| **OpenClaw** | **Markdown 为真源**（`MEMORY.md`、按日笔记），配 **`memory_search` / `memory_get`、混合检索、内置 SQLite 索引**，并在 **compaction 前 automatic memory flush**，形成较完整的**本地记忆管线**。 |

---

## 2. 磁盘真源 vs 模型「隐藏状态」（显式对比）

- **磁盘真源**：事实以**可打开的文件**为准（本体系：`CHAIN-STATE`、`HANDOFF`、`RECENT-DECISIONS`、军团 `MISSION-BRIEF`；OpenClaw：`MEMORY.md` 等）。**失效场景**：忘了写、写错链、双文件互相矛盾。  
- **模型隐藏状态**：上下文里「模型好像记得」但**未落盘**。**失效场景**：窗口压缩、换会话、Summarize 后梗概替代细节。  
- **本体系纪律**：聊天与落盘冲突时**以落盘为准**（记忆接力提示词与 `CLAUDE.md §二`）；OpenClaw 文档写明 *no hidden state*；Claude **Messages API** 由调用方自带历史，**无服务端替你存长对话**。

---

## 3. 压缩 / 摘要前的防丢（显式对比）

| 体系 | 机制（摘要） |
|------|----------------|
| **本体系** | IDE Summarize / 压缩后续聊须先 **Read `CHAIN-STATE` §A** 等；`COND_PASS` 与驱逐规则；**不**承诺替代用户在 IDE 内点「总结」。 |
| **Claude** | 各产品线策略不一；**Claude Code** 有项目侧 **auto memory** 等与文件协同（细节以官方文档为准）。 |
| **OpenClaw** | **compaction 前先 memory flush**（默认开启），减少「一压缩，关键事实还在对话里没进文件」的损失。 |

---

## 4. 检索形态：关键词 / 向量 / 纯路径（显式对比）

| 形态 | 本体系 | Claude 生态 | OpenClaw |
|------|--------|-------------|----------|
| **路径 / 指针 / Read 序** | 主路径：固定文件名、`CHAIN-ID`、`HANDOFF` 优先于梗概 | API 无内置；应用自建 | 有文件路径约定 + 工具读文件 |
| **关键词 / grep** | 依赖仓库搜索与人工 Read | 依赖集成 | `memory_search` 含关键词维（与向量混合） |
| **向量 / embedding** | **非**体系统一标配；若自建须服从 `CLAUDE.md` 权威，避免「检索命中覆盖规则」 | 非 API 默认 | 配置 provider 后 hybrid 检索（官方文档） |

**常见误用**：把向量检索结果当**权威**，与已冻结的 `CLAUDE.md` 或军令状矛盾仍采信检索摘要 → 本体系规则要求**以权威源为准**。

---

## 5. 多链 / 多会话与隔离（显式对比）

- **本体系**：**CHAIN-ID**、分链目录（`chains/{CHAIN-ID}` / `legion/chains/...`）、记忆接力**错链须阻塞或标 B**；军团 **L3** 与蜂群 **L2** 分轨。  
- **Claude**：依赖**账号 / 项目 / 工作区**边界；API 侧由应用维护多租户隔离。  
- **OpenClaw**：以**工作区文件**为界；多代理并发写同一记忆的竞态**须用户侧治理**（文档未替你做组织级隔离）。

---

## 6. 敏感信息与落盘（显式对比）

- **本体系**：规则**禁止**在落盘简报中写密钥、完整隐私请求体；矛盾走 **G/L/O** 升级叙述。  
- **Claude**：数据驻留与记忆存储受**产品与控制台条款**约束（部署环境需自查）。  
- **OpenClaw**：文件与 SQLite **在本地**；备份、权限、误把密钥写进 `MEMORY.md` **责任在运维**。

**取舍**：「全量磁盘真源」与「最小化敏感落盘」要同时满足时，须**脱敏 + 指针**（仅存路径/ID，不存秘文）。

---

## 7. 总对照表（与 R3 汇流一致）

| 维度 | 本体系 | Claude（consumer / API / Code） | OpenClaw |
|------|--------|-----------------------------------|----------|
| **真源形态** | `CHAIN-STATE` §A、`HANDOFF`、`RECENT-DECISIONS`、军团 `MISSION-BRIEF`、`CLAUDE.md` | API **无状态**；网页 **Project memory** 等；Memory tool **`/memories` 客户端**；Code **`CLAUDE.md` + auto memory** | **Markdown** + `MEMORY.md` / 日日志 |
| **检索方式** | **路径 + 约定名 + Read 序**为主 | 产品侧依形态而异；API **无内置长时检索** | **`memory_search` / `get`、hybrid、SQLite 索引** |
| **压缩与防丢** | §A、HANDOFF、COND、接力纪律；压缩后先读盘 | 依产品线 | **compaction 前 flush** |
| **多会话续接** | 记忆接力、HANDOFF、CHAIN-ID | 项目/账号边界 | 文件为中心（多会话细节见文档） |
| **多代理隔离** | **Task 隔离 + 指针回灌**、军团/蜂群闸门 | 依客户端 | 文件竞态须自建 |
| **合规与敏感** | 显式禁密钥落盘、升级路径 | 依 Anthropic 与部署 | 用户侧运维责任大 |
| **工程成本** | **纪律与对账成本高** | API 自建成本高；产品上手段多但边界分裂 | **管线清晰**、运维与备份成本需自担 |

---

## 8. 我们像谁、不像谁

**像谁**

- **像 OpenClaw**：**外存优先、Markdown/文件真源**、不把一切押在窗口。  
- **像 Claude Code**：**项目根「规格书」** ↔ 我们的 `CHAIN-STATE` / `HANDOFF` / 规则。  
- **像「API 无状态」下的应用层**：**谁会话谁维护历史**；我们用落盘与接力协议补全。  

**不像谁**

- **不像 OpenClaw 一体化记忆产品**：我们**没有**开箱即用的 **`memory_search` + SQLite + flush** 商品封装，而是**治理文件 + 规则 + 可选脚本**。  
- **不像「对话即真源」**：我们明确 **冲突以落盘为准**。  
- **不像纯向量 RAG**：**`CLAUDE.md` / 冻结裁决**优先于检索分数。  

---

## 9. 优劣小结（记忆维度）

**本体系**

- **优**：可审计、可交接；权威栈清晰；多代理有闸门；可把「记忆」接进 **TC / PASS·FAIL**；敏感面有禁区。  
- **劣**：**纪律成本极高**；长文军令状与 HANDOFF **占 token**；`RECENT-DECISIONS` 与 `CHAIN-STATE` **双源要对账**；COND/压缩仍可能因人因 IDE **丢上下文**；无统一商业「记忆 API」。  

**Claude 生态**  

- **优**：上手快；Memory tool / Project / `CLAUDE.md` 降低从零设计外存的门槛。  
- **劣**：**API 无状态**；consumer / API / Code **记忆模型分裂**，真源与合规要分环境查。  

**OpenClaw**  

- **优**：**真源 + 索引 + flush + compaction** 管线在文档里**闭环**（A 级可指 URL）。  
- **劣**：自建运维、备份、多写者冲突、敏感落盘责任偏用户。  

---

## 10. R1 撕裂点 → 本体系规则覆盖（Top 5）

| 风险摘要 | 覆盖 |
|----------|------|
| 多链串味 / 接力错链 | **部分** — 有 CHAIN-ID、Read 序；仍防不了**盲读** |
| Summarize 后未读 §A | **部分** — 技能 22 / `CLAUDE.md` 要求；**无法消灭人因** |
| RECENT-DECISIONS 与 CHAIN-STATE 冲突 | **部分** — 废止指针、矛盾显式；**双源维护成本**仍在 |
| 向量 vs `CLAUDE.md` 权威 | **是** — 规范栈优先级取 `CLAUDE.md` |
| resume / 矛盾冻结 / COND 驱逐 | **部分** — 断 resume、COND 上限；**非自动强一致** |

---

## 11. 参考（类型标注）

| 类型 | 指向 |
|------|------|
| OpenClaw A | https://docs.openclaw.ai/concepts/memory 及 memory-search、compaction、memory-builtin |
| Claude A | Messages 无状态、Memory tool、Claude Code memory、Support memory 等（以当前官网为准） |
| 本仓库 A | `CLAUDE.md §二`、`CLAUDE.md §三`；`.claude/swarm/记忆接力提示词.md`；`chains/_CHAIN-STATE-TEMPLATE.md` |

*正文由蜂群 R3 汇流稿扩展补全契约显式段落（TC-B-003～007）；推断处已标 B。*

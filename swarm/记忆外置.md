# 外置结构化工作记忆（XWM）· 通用移植提示词

> **⚠️ 效力范围（必读）**  
> 本文件**单独复制到外机不构成**本仓库的蜂群闸门、满编五段 Task、R4 实测门禁或军团 Phase Gate。  
> 仅当目标环境已加载**等价**的 `.claude/rules/`（至少含蜂群治理语义）且助手能按规则使用 **Task 真隔离** 时，下列流程才具约束力。  
> 权威机制以本仓库技能 **`22_主帅上下文生命周期管理.md`** 与 **`CLAUDE.md §二`**（及若启用军团则 **`CLAUDE.md §三`**）为准；本文是**可携带的操作摘要 + 可复制提示词**。

---

## 0. 术语（防混淆）

| 称呼 | 含义 |
|------|------|
| **外置结构化工作记忆（XWM）** | 把「契约、进度、冻结条、验收状态」**结构化写入仓库文件**，主帅对话只保留**薄摘要 + 路径**；需要时用 **Read** 拉回外存，用 **Task 转包** 把大块推理放到子会话。 |
| **XWM** | 本概念的唯一推荐缩写。 |
| **禁止** | 用裸 **`SSM`** 指代本概念——易与 **S/M/L 规模档**、机器学习 **State-Space Model**、**AWS Systems Manager** 等混淆。若文档必须出现 `SSM` 字母组合，须在**同段**写明「非本仓库 XWM」或外文全名。 |

**与三层模型对齐**（详见技能 22 §1）：L1 = 对话内工作记忆；L2 = `CHAIN-STATE.md`；L3 = 磁盘语义层（裁决简报、`artifacts/` 全文等）。

---

## 0.5 进阶外置（可选 · XWM+）

下列三项**可以**外置，用于进一步减轻上下文压力、防 Summarize 后失忆；**默认不强制**，与技能 **22 §1.2** 一致。**权威序不变**：与 `CHAIN-STATE` §A/§B 或军令状冲突时，以 **CHAIN-STATE / 军令状** 为准，镜像文件仅作从属接力。

| 项 | 外置做法 | 路径（`{CHAIN-DIR}` = 本链目录） |
|----|-----------|-----------------------------------|
| **L1 工作记忆** | 每轮末尾由主帅把「尚未升格冻结条」的草稿要点 **append** 到镜像文件（可与 §G delta 并行，勿写矛盾句） | `{CHAIN-DIR}/L1-MIRROR.md`，建议 `### ROUND=n` 分块、每块 ≤400 字 |
| **Sub-agent 独立上下文** | **每个 Task 返回后**，主帅立即写**输入要点 + 输出要点 + 交付物路径**（不是子代理内部全程 log） | `{CHAIN-DIR}/task-reflux/{ROUND}-{ROLE}.md`。**军团 EP** 若已有 `artifacts/{EP}-{ROLE}-DELIVERY.md`，以 **artifacts 为主**，本目录主要承接**蜂群 R1–R4** 或非 EP Task |
| **口头结论** | 对话里出现拍板句的**同一轮**，写入 **§B 新冻结条** 或 **`RECENT-DECISIONS.md` 一行**；禁止「只说已冻结不落盘」 | 无单独文件；进 L2/L3 既有机制 |

**创建目录**：若使用 `task-reflux/`，建 `{CHAIN-DIR}/task-reflux/.gitkeep` 或首文件时一并创建即可。

---

## 1. 权威序（单一事实源）

1. **链上 L2**：`.claude/swarm/chains/{CHAIN-ID}/CHAIN-STATE.md`（蜂群）或 `.claude/swarm/legion/chains/{CHAIN-ID}/CHAIN-STATE.md`（军团）为**该链**可复核状态的主锚（§A 精简下限 + §B 冻结条等）。  
2. **军令状**：军团场景下 `MISSION-BRIEF.md`（及含 **`[PENETRATING]`** 的原文节）优先于**衍生摘要、口头汇流、本文件内的复述**。  
3. **冲突**：外存文件与对话矛盾时，以**落盘路径 + Read 结果**为准，并更新指针；禁止静默合并。

**模板**：复制 `.claude/swarm/chains/_CHAIN-STATE-TEMPLATE.md` 到上表路径，勿自拟互斥 schema。

---

## 2. 蜂群（M / L2）最小习惯

- **Task 首行锚点**：`CHAIN=` `ROUND=` `ROLE=` `PARENT_REF=`（与蜂群 `CLAUDE.md` 一致）。  
- **子代理**：只发**最小充分信息** + **文件指针**；禁止无锚点要求通读整仓。  
- **切割**：写 `HANDOFF-R{n}.md`；新会话起手 **HANDOFF > CHAIN-STATE > 从头**。  
- **IDE Summarize 后**：再派 R3/R4b 或宣布 PASS 前，先 **Read `CHAIN-STATE.md` §A**（技能 22 §12）。

---

## 3. 军团（L / L3）衔接

- 冻结三件套、DAG、I/O 表、EP 回流与 **artifacts** 路径见军团 `CLAUDE.md` 与技能 **18–20**。  
- **完整复刻 L3+蜂群**：优先使用同目录族内  
  `legion/PORTING-PROMPT-LEGION-MIN-REBUILD.zh-CN.md`、  
  `legion/PORTING-PROMPT-PROGRESSIVE-CHARTER-LOOP.zh-CN.md`。  
- XWM 不替代上述文件，只补充**「为什么外置 + 怎么命名 + 权威序」**。

---

## 3.1 脱敏与禁区

不写：密钥、token、完整隐私请求体。示例用占位符。与 `.claude/swarm/README.md` 约定一致。

---

## 4. 占位符

| 占位符 | 含义 |
|--------|------|
| `{CHAIN-ID}` | 任务链 ID，与目录名一致 |
| `{GOVERNANCE_ROOT}` | 建议 `.claude/swarm/` |

---

## 5. 可复制提示词块

### 5.1 给用户（开新链时粘贴）

```text
请在本仓库启用外置结构化工作记忆（XWM）：
1. 分配 CHAIN-ID，从 _CHAIN-STATE-TEMPLATE.md 创建 {GOVERNANCE_ROOT}/chains/{CHAIN-ID}/CHAIN-STATE.md（军团则用 legion/chains/…）。
2. 主帅每轮在对话末尾用 delta 格式更新意图；把冻结条与 P0 写入 CHAIN-STATE §A/§B。
3. 派发 Task 时只带目标句、硬约束、指针；长产出落盘到 swarm 并回写路径。
4. 禁止用裸写 SSM 指代本机制；统一称 XWM 或中文全称。
5.（可选·进阶）长对话或易压缩场景：创建同链 L1-MIRROR.md 按轮追加草稿要点；每收到 Sub-agent 回报后写 task-reflux/{ROUND}-{ROLE}.md；口头拍板同一轮写入 §B 或 RECENT-DECISIONS。
```

### 5.2 给统帅 / Agent（冷启动）

```text
你是主帅（+1）。已从磁盘接力：优先 Read HANDOFF（若存在），再 Read 本链 CHAIN-STATE.md §A。
不得仅凭聊天梗概派发 R3 或关闭 R4b。XWM 表示外置结构化工作记忆：权威在 CHAIN-STATE 与军令状落盘，对话仅持摘要。
若启用进阶外置：每轮可更新 L1-MIRROR.md；每个 Task 关门后写 task-reflux 摘要文件；用户口头拍板须同轮进 §B 或 RECENT-DECISIONS。镜像与 §A/§B 冲突时以 CHAIN-STATE 为准。
```

### 5.3 给外机「仅带本 md」时的降级说明（贴会话首条）

```text
以下 PORTING-PROMPT-XWM 为操作摘要。若当前环境无 CLAUDE.md §二 等价规则，请仅采纳「文件锚点 + 脱敏 + 单一事实源」习惯，不宣称已满足满编蜂群或军团 Gate。
```

---

## 6. 回指索引（本仓库）

| 资源 | 相对仓根路径 |
|------|----------------|
| 主帅上下文生命周期 | `.claude/skills/hajimi-dog/03_AI行为准则/22_主帅上下文生命周期管理.md` |
| CHAIN-STATE 模板 | `.claude/swarm/chains/_CHAIN-STATE-TEMPLATE.md` |
| 蜂群规则 | `CLAUDE.md §二` |
| 军团规则 | `CLAUDE.md §三` |
| 教学闭环图 | `docs/teaching/pro-ai-hajimi-governance/04-实现思路-Rules-Skills-Swarm-Task.md` |
| 军团最小重建 | `.claude/swarm/legion/PORTING-PROMPT-LEGION-MIN-REBUILD.zh-CN.md` |

---

*文档版本：与仓库同修订；CHAIN 实例化见各 `chains/{CHAIN-ID}/`。*

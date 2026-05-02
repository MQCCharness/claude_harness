# `.claude/agents/` 约定（蜂群 / 军团 · 角色固化）

## 与蜂群角色 MD 的对表（角色 MD = 承接 Task 的 Agent 子代理人设稿）

- **权威条款**：`CLAUDE.md §二` 的 **「Agent 子代理使用方式」** 规定：**`ROLE_DEF=`** 指向的 `runs/<CHAIN-ID>/<角色>.md` 必须是**实际接收该次 Task 的 Agent 子代理**所依据的人设稿，可与 Task 正文**对账**；**禁止**将「fork `_TEMPLATE-*` 后只改 `META`/frontmatter、正文仍与模板实质等同」当作已固化。推荐 **`## 本链绑定`**；补救路径：**派发后同轮** 追加 **`### 最近派发 Task 摘要`**。
- **与军团的对表（必触发）**：**`ACTIVE_LEGION=yes`** 时，**`legion-*.md` / 叶 OP 所需 `swarm-*.md`** 同样须满足上款（**非**零差异化模板副本），每一 **EX/MG/OP**（及 L2）Task 须含 **`ROLE_DEF=`**；LEGION-COMPLIANCE 之 **`ROLE_MD`** 含义已收紧为「可对账固化」。完整条文见 **`CLAUDE.md §三`** **「L3 角色 MD 固化与蜂群 ROLE_DEF 并集」**。
- **名称澄清**：本仓库**没有**名为 **Sergeant（军士）** 的固定角色代号；蜂群固定表为 **R1/R2/R3/R4a/R4b** 与 **统帅（+1）**，军团为 **EX/MG/OP**。若口语里的「Sergeant」指 **统帅/编排** → 对应 **+1 主对话**，不单独占一个 `swarm-*.md`；若指 **某类 Agent 子代理** → 应映射到上表之一并落对应文件。
- **「服务器 Agent 子代理」vs「盘稿」**：Task 在平台侧执行；盘稿用于 **可审计、可 @、可 diff**，且须与**该次** Task 绑定，而非悬空模板副本。

## 你要的行为（本目录承担两件事）

1. **项目级默认 Agent 子代理**（可选）  
   直接放在 **本目录根下** 的 `*.md`（例如 `swarm-r3-core-developer.md`）。Claude Code 会按官方 Agent 子代理规则加载，可在 Agent 里用命令调用。

2. **按任务链固化的角色 MD（推荐用于蜂群/军团）**  
   放在 **`runs/<CHAIN-ID>/`** 下：每条链一套文件夹；**每个将派发 Task 的角色**对应一个 **`swarm-*.md` 或 `legion-*.md`**，其正文须反映**本链**约束（**非**未改写的模板正文）。  
   用途：**与承接该角色的 Agent 子代理对账**、留痕、交接、**`ROLE_DEF=`** 指针；与 `.claude/swarm/chains/`、`.claude/swarm/legion/chains/` 互补。

## 重要限制（Claude Code 产品行为）

Agent 子代理的发现机制依赖于项目配置。**`runs/<CHAIN>/` 的定位是「固化存档 + 引用源」**；若某链须在 Agent 面板中可直接选择，可选用其一：

- **复制/同步**：将该链需要的 `*.md` 复制到根目录，并把 frontmatter 里的 `name` 改成全局唯一（例如 `mychain-r3-dev`）。  
- **显式 @ 文件**：派发 Task 时在说明里写「角色定义见 `@.claude/agents/runs/<CHAIN-ID>/r3.md`」。  
- **跟进官方**：若后续 Claude Code 支持嵌套 `agents/` 发现，可把 `runs/` 直接视为可发现目录而无需复制（以届时文档为准）。

## 目录与命名

| 路径 | 含义 |
|------|------|
| `runs/<CHAIN-ID>/META.md` | 链元数据：`CHAIN-ID`、模式（蜂群/军团）、波次、冻结目标句指针等 |
| `runs/<CHAIN-ID>/swarm-*.md` | 蜂群五段：R1、R2、R3、R4a、R4b（文件名见模板目录） |
| `runs/<CHAIN-ID>/legion-*.md` | 军团节点：EX / MG / OP（一节点一文件，命名自定但需可读） |

脚手架（fork 起点，**非**链上真源）：`runs/_TEMPLATE-SWARM-B4P1/`、`runs/_TEMPLATE-LEGION-L3/`。**不要**把模板目录改名为生产链 ID（保留模板供 fork）。

- **完整 frontmatter 参考**：`runs/_ROLE-MD-FULL-TEMPLATE.md`（复制到生产 `runs/<CHAIN-ID>/` 后改写；勿直接当链使用）。
- **示例生产链（已固化形态参考）**：`runs/HERNEST-SWARM-20260412/`（流程与 Task 摘要演示）、`runs/HERNEST-AGENT-RPT/`（Hernest 调研报告链）；与 `_TEMPLATE-SWARM-B4P1` 字段结构对齐，fork 时可对照改 `CHAIN-ID` / `name` / `ROLE_DEF`。

## 主帅固化时机与主窗口 Agent 子代理（摘要）

- **盘稿首要目的**：让 **`ROLE_DEF=`**、Task 锚点与 **`### 最近派发 Task 摘要`** 对齐，从而 **稳定触发 Agent 工具 Agent 子代理**、蜂群/军团派发不漂；**不是**「用主窗口扮演替代 Task」的模式。  
- **默认顺序（与蜂群并集）**：**(α)** 该角色**本轮 Task 已定稿**（锚点 + 条目化约束 + 上游指针）→ **(β)** 主帅更新 **`runs/<CHAIN-ID>/`** 对应 MD（**`## 本链绑定`** + **`### 最近派发 Task 摘要`**）→ **(γ)** **再**派发 **Agent 工具** Agent 子代理。  
- **主窗口**里用根目录 `*.md`（如 `/swarm-r3-core-developer`）**仅可选辅助**，**不替代**满编/写码等情形对 **Agent 子代理** 的强制；若要用，须 **`@`** 已固化 MD 且与 **`ROLE_DEF=`** 同路径。  
- **收口检查（建议主帅每轮勾一下）**：各将派发角色是否已有 **Task 摘要**；**`ROLE_DEF`** 路径是否存在；**`META.md`** 的 `CHAIN-ID` 是否一致；多波次/军团改架构后 **废止节点**是否已从 **`ROLE_DEF`** 引用中移除。

## 与仓库既有落盘的关系

- **流程门禁、军令状、架构冻结**：仍以 `CLAUDE.md` 与 `.claude/swarm/**` 为准。  
- **`runs/<CHAIN>/`**：真源 = **与已派发/已执行 Task 可对账** 的角色人设稿；**禁止**长期仅存零差异化模板副本。

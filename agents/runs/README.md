# `runs/` — 按任务链固化的角色 MD

## 新建链

- 新建文件夹：`<CHAIN-ID>/`（与 `CHAIN-STATE` / `MISSION-BRIEF` 所用 ID 一致）。
- 从 `_TEMPLATE-SWARM-B4P1` 或 `_TEMPLATE-LEGION-L3` **fork**（复制）为 `<CHAIN-ID>`，**随后必须**做链级差异化，**禁止**仅改 `META`/`name`/`description` 而正文仍与模板实质相同。
- **不要**把模板目录本身改名为生产链 ID（保留模板供下次 fork）。

## 与承接 Task 的 Agent 子代理对账（与蜂群「角色 MD 真源」一致）

- **`ROLE_DEF=`** 指向的文件 = **该次 Agent 子代理**执行任务所依据的人设稿；须含 **`CHAIN-ID`**、**本链冻结目标/硬约束指针**（可指向 `CHAIN-STATE`、军令状等），推荐固定节 **`## 本链绑定`**。
- **派发前定稿（推荐）**：写好差异化 → 再发 Task。
- **派发后回写（补救）**：若 Task 已先发，须在该 Agent 子代理 **返回之同轮** 追加 **`### 最近派发 Task 摘要`**（`ROUND`、角色约束要点）。
- **首次派发某角色 Task 之前**，该角色对应的 `*.md` 须已满足上款（用户 **`免角色落盘`** 等豁免除外）；Task 正文须含 **`ROLE_DEF=`**。

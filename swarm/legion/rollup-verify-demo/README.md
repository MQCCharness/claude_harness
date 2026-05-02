# 虚拟军团：逐级汇流模式检验（演练）

**CHAIN**：`DEMO-CHAIN-ROLLUP-001`  
**用途**：纸上验收「EX/MG 起草直接下级 Task + 统帅代发降级 + 《逐级主题汇流块》逐级上送」是否与 `CLAUDE.md §三` 一致。

## 组织（四实体三 L3 角色 + 统帅）

| 实体 | 层级 | 说明 |
|------|------|------|
| 军团统帅 | +1 主会话 | EP/Gate、代发下级 Task、回声校前总收 |
| 战略编排官 | EX | 拆 MG 任为《下级 Task 发包》，汇流 MG |
| 集成协调员 | MG | 拆 OP 任为发包，汇流 OP |
| 末端实施员 | OP | 虚拟蜂群收口，向 MG 上交汇流块 |

## 15 分钟走查（新来者）

1. Read 本目录 `MISSION-BRIEF.md`（军令状五要素）。
2. Read `ARCHITECTURE.md` 与 `SCHEDULE.md`（直连边与 EP）。
3. 按 **EX → MG → OP** 顺序打开 `rollups/ROLLUP-*.md`，确认每份含《逐级主题汇流块》字段且**主题摘要仅覆盖直连下级**。
4. 打开 `VERIFICATION-TRACE.md`，核对**代发链**（谁起草、谁创建 Task）。
5. 打开 `reports/REPORT-*.md` 共四份，确认**一角色一报告**、且各报告引用汇流契约要素。

## 本演练的刻意设定

- **未**真实启动 Cursor Task；`VERIFICATION-TRACE.md` 中「代发」记为**统帅依据发包草稿等价履行**，供规则黑盒验收。

## 下一步（真实链）

1. 在宿主冻结 `ARCHITECTURE` / `SCHEDULE` 后，为 EX 起 **ROUND=1** 的 L3 Task；EX 回报须含 **PACK→MG** 与锚点草案。  
2. **统帅代发** MG Task，收 **ROLLUP-MG** 前置字段；再代发 OP，收 **ROLLUP-OP**（蜂群真实跑则更新 **下级到齐状态** 不得瞒报）。  
3. 波次收口：落盘 `WAVE-CLOSE-*`，填写 **§4.2 G**（指针或 `N/A`），与 **`legion/rollups/README.md`** 约定对账。

## 文件索引

| 路径 | 说明 |
|------|------|
| `ARCHITECTURE.md` | 冻结架构（树 + 表） |
| `MISSION-BRIEF.md` | 军令状 |
| `SCHEDULE.md` | DAG / I/O / EP |
| `VERIFICATION-TRACE.md` | 逐级分发与汇流时间线 |
| `rollups/` | 各角色 ROLLUP 落盘 |
| `reports/` | 各角色汇报（Markdown） |

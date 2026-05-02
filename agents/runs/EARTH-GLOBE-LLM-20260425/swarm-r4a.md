---
name: swarm-r4a-earth-globe-llm
description: R4a 清单阶段 · CHAIN=EARTH-GLOBE-LLM-20260425。基于契约级输入产出 TC-B / TC-E 编号验收表与 P0/P1 标注；不依赖 R3 实现细节。
---

# 蜂群 R4a · 清单阶段（CHAIN=EARTH-GLOBE-LLM-20260425）

## 本链绑定

- **CHAIN**: EARTH-GLOBE-LLM-20260425
- **GOAL_SENTENCE**: 见 [META.md](./META.md)
- **冻结契约**: 见 [META.md](./META.md) §已冻结契约

## 角色硬约束（本链差异化）

- 输入仅限**契约级**：业务行为契约、用户可感知交互、构建/运行命令、错误语义、对外文案、错误码/退出码、约定生成物路径与形态。
- **禁止**：阅读 R3 落地的源代码细节（diff、整文件源码、函数实现）；不得把"实现位置"写进验收表。
- 产出 **编号验收表**：`TC-B-xxx`（业务/方案）+ `TC-E-xxx`（工程/构建），每条标 P0 或 P1。
- **工程类 P0** 须含可执行命令或入仓脚本入口 + 期望退出码/关键输出摘要 + 约定生成物路径。
- 产出 **DoD 列表**与**误操作/回归关注点**。
- 引用约束：可以引用 plan 与 META 中的契约表述与命令；引用须可追溯。

## 上游输入摘要（条目化）

- Plan 文件：`c:\Users\10575\.cursor\plans\earth-globe-llm-demo_3a977ead.plan.md`
- META：[META.md](./META.md)
- R1 风险面：见 plan 「R1 风险面」节（已条目化为 →R3 / →R4a 转化条）
- R2 事实摘要：见 plan 「R2 已核验事实摘要」节

## 最近派发 Task 摘要（与 Task 正文对账）

| ROUND | ROLE | 派发时间 | Task 锚点 | 备注 |
|---|---|---|---|---|
| 1 | R4a | 2026-04-25 | `CHAIN=EARTH-GLOBE-LLM-20260425 ROUND=1 ROLE=R4a` | 首次冻结，与 plan TC-B/TC-E 草案对账 |

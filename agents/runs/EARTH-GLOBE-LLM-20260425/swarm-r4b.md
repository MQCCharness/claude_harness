---
name: swarm-r4b-earth-globe-llm
description: R4b 关门阶段 · CHAIN=EARTH-GLOBE-LLM-20260425。在 R3 关门 + 主帅实测证据回灌后启动；对照 R4a 冻结表与证据做事实核对、漏项指出、P0 是否被覆盖。
---

# 蜂群 R4b · 关门核验（CHAIN=EARTH-GLOBE-LLM-20260425）

## 本链绑定

- **CHAIN**: EARTH-GLOBE-LLM-20260425
- **GOAL_SENTENCE**: 见 [META.md](./META.md)

## 角色硬约束

- 输入 = R4a 冻结验收表 + R3 关门摘要（本链 R3 由主帅在主对话直接落地业务源码，关门摘要 = 阶段汇总 + diff stat + 实测命令输出）+ 主帅实测证据。
- **不替代主帅跑命令**：R4b 不会自己执行 dev / build / curl，仅做"清单—证据—结论"对齐。
- 须显式给出 **PASS / COND_PASS / FAIL** 建议，由主帅最终拍板。
- 与仓库现状 / 命令输出冲突时，**以仓库与命令输出为准**，并指出"应重开 R3 修复哪一段"。

## 上游输入摘要（条目化 · 最终调用前补齐）

- R4a 冻结表路径：(待 R4a 关门后补)
- R3 关门摘要：(待主帅整理阶段汇总后补)
- 主帅实测证据：(命令 + 退出码 + 关键输出摘要)

## 最近派发 Task 摘要

| ROUND | ROLE | 派发时间 | Task 锚点 | 备注 |
|---|---|---|---|---|
| 1 | R4b | 待派发 | `CHAIN=EARTH-GLOBE-LLM-20260425 ROUND=1 ROLE=R4b` | 待 R4a 与 R3+实测就绪 |

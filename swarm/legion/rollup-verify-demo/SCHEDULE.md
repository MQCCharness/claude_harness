# 排期 — DAG · I/O · EP（演练）

**CHAIN**：`DEMO-CHAIN-ROLLUP-001`

## DAG 邻接（依赖 → 执行序）

| 角色 | 依赖上游 | EP |
|------|----------|-----|
| 战略编排官（EX） | — | EP-0 |
| 集成协调员（MG） | EX 纲要 + EX《下级 Task 发包》已代发 | EP-1 |
| 末端实施员（OP） | MG  plan + MG《下级 Task 发包》已代发 | EP-2 |

## I/O 契约摘要

| 角色 | 输入来源 | 输出产出 | 下游 |
|------|----------|----------|------|
| EX | 军令状、统帅战略指令 | 纲要、`PACK-MG` 发包、`ROLLUP-EX` | MG、统帅 |
| MG | 军令状、EX 纲要、PACK-MG | 执行计划、`PACK-OP` 发包、`ROLLUP-MG` | OP、EX |
| OP | 军令状、MG plan、PACK-OP | 交付说明（虚拟）、`ROLLUP-OP` | MG |

## Phase Gate（提要）

- **EP-0→EP-1**：GE* + **GR***（汇流块在 EX 交付中为后续占位；发包齐）  
- **EP-1→EP-2**：GM* + GR*  
- **EP-2→回声**：GO* + GR*；统帅收齐三支 `ROLLUP` 与 OP 产出  

## Task 预算（演练）

- L3 Sub-agent：3（EX、MG、OP）+ 统帅代发 2 次  
- 蜂群：虚拟收口 1 次  

# 检验追踪 — 逐级分发与汇流（纸面等价）

**CHAIN**：`DEMO-CHAIN-ROLLUP-001`  
**裁决**：本文件用于 TC-B/TC-E **黑盒演示**，非生产执行日志。

| 步骤 | 动作 | 执行方 | 证据 |
|------|------|--------|------|
| T1 | 冻结架构、军令状、SCHEDULE | 军团统帅 | 本目录 `ARCHITECTURE.md` 等 |
| T2 | 启动 EX Task 正文（锚点草案-round1） | 军团统帅 | （演练：与纲要一并叙述） |
| T3 | EX 产出纲要 + **《下级 Task 发包》→ MG** | 战略编排官 | `rollups/ROLLUP-*-EX-*.md` 引用 PACK-MG |
| T4 | **统帅代发** MG Task | 军团统帅 | 本表 T4 PASS = 规则要求之等价履行 |
| T5 | MG 产出计划 + **《下级 Task 发包》→ OP** | 集成协调员 | `rollups/ROLLUP-*-MG-*.md` |
| T6 | **统帅代发** OP Task | 军团统帅 | 同上 |
| T7 | OP 虚拟蜂群收口 + 上交 `ROLLUP-OP` | 末端实施员 | `rollups/ROLLUP-*-OP-*.md` |
| T8 | MG 汇流 OP → `ROLLUP-MG` 上送 | 集成协调员 | MG rollup 文件 |
| T9 | EX 汇流 MG → `ROLLUP-EX` 上送 | 战略编排官 | EX rollup 文件 |
| T10 | 回声校验前核对五要素 + GR* | 军团统帅 | `reports/REPORT-军团统帅.md` |

**刻意缺失（演练边界）**：未创建真实 Cursor Sub-agent ID；若需 A 级「已派发」，须在真实运行时补 **首行锚点** 与平台返回引用。

# DAG · EP · I/O 契约 · Task 预算

**CHAIN**：`LEGION-RUBRIC-DEMO-001`

---

## 1. DAG 邻接表（Kahn 拓扑 · 无环校验）

| # | 角色 | 部门 | 依赖上游 | 依赖说明 | EP |
|---|------|------|----------|----------|-----|
| 1 | EX-平台与 CLI 契约 | 平台 | — | 首发，仅依赖军令状 | EP-0 |
| 2 | MG-文档产物线 | 文档产物 | EX | 需要 EX 的兼容/边界纲要 | EP-1 |
| 3 | OP-THEME | 主题/A11y | MG | 需要 HTML 壳层与类名约定草案 | EP-2 |
| 4 | OP-FOOTER | 内容与安全 | MG | 需要输出模板插槽与转义原则 | EP-2 |

**无环说明**：入度序列 `EX(0) → MG(1) → {OP-THEME, OP-FOOTER}(2)`，队列为空时全部入表，**无剩余节点** → DAG 无环。

---

## 2. EP 执行计划

| EP | 并行角色 | 门禁 |
|----|----------|------|
| EP-0 | EX | Phase Gate：见 `PHASE-GATES.md` PG-01 |
| EP-1 | MG | Phase Gate：见 `PHASE-GATES.md` PG-12 |
| EP-2 | OP-THEME、OP-FOOTER | Phase Gate：见 `PHASE-GATES.md` PG-23 |

---

## 3. I/O 契约表

**通用**：每行产出须含 **`decisions_log`**（已决策事项、明确排除项、理由）。

| # | 角色 | 输入来源 | 输入格式要求 | 输出产出名称 | 输出格式规范 | 下游消费者 |
|---|------|----------|--------------|--------------|--------------|------------|
| 1 | EX | 军令状 | 五要素 + `[PENETRATING]` 原文 | `EX-PLATFORM-BRIEF` | Markdown：`## 纲要` `## 兼容策略` `## decisions_log` | MG |
| 2 | MG | EX 产出 + 军令状 | EX 摘要 ≤200 字 + 路径 | `MG-HTML-SPEC` | Markdown：`## 单文件 HTML 约束` `## 插槽与类名` `## 验收口径` `## decisions_log` | OP-THEME、OP-FOOTER |
| 3 | OP-THEME | MG 产出 + 军令状 | MG 路径 + 主题相关段落 | `OP-THEME-PACKAGE` | Markdown：`## 主题方案` `## A11y/对比度` `## CLI 面（仅建议名）` `## 蜂群摘要` `## decisions_log` | 统帅 |
| 4 | OP-FOOTER | MG 产出 + 军令状 | MG 路径 + 页脚插槽段落 | `OP-FOOTER-PACKAGE` | Markdown：`## 配置面` `## 转义与安全` `## 错误语义` `## 蜂群摘要` `## decisions_log` | 统帅 |

**DAG ↔ I/O 对账**：各角色「输入来源」集合与 DAG「依赖上游」一致；消费者与 EP-2 汇流一致。

---

## 4. Task 预算（演示）

| 类型 | 数量 | 说明 |
|------|------|------|
| L3：EX | 1 | 可由统帅分节代理落盘（本包已含 `deliverables/EX-PLATFORM.md`） |
| L3：MG | 1 | 同上 |
| L3：叶 OP | 2 | 各带蜂群；蜂群 Task 各 4（R1–R4）→ **8** |
| **合计（全隔离上限）** | **12** | 超预算时优先保留 **OP 蜂群 R3+R4**（`CLAUDE.md` 写码底线）；本演示以 **设计与验收**为主，R1–R4 均通过 Sub-agent 留痕 |

---

## 5. 穿透与文件指针

- 军令状：`./MISSION-BRIEF.md`  
- 架构：`./ARCHITECTURE.md`  
- Phase Gate：`./PHASE-GATES.md`  
- 回声：`./ECHO-CHECK.md`

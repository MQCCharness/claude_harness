# 组织架构（冻结）

**CHAIN**：`LEGION-RUBRIC-DEMO-001`  
**FREEZE_VERSION**：`1`  
**状态**：`FROZEN_FOR_DEMO`

---

## 树形结构

```
军团统帅（+1）
├── EX-平台与 CLI 契约（EX）
│   └── 直辖下级：MG-文档产物线（MG）
└── （经 MG 路由）
    ├── 叶 OP-主题与可访问性（OP-THEME）→ 蜂群 4+1
    └── 叶 OP-页脚与元数据（OP-FOOTER）→ 蜂群 4+1
```

> 可编辑副本见 [ORG-TREE-EDITABLE.md](./ORG-TREE-EDITABLE.md)。

---

## 角色明细表

| 角色 | 层级 | 部门 | 上级 | 下级 | 职责 | 预期产出 | 蜂群 |
|------|------|------|------|------|------|----------|------|
| EX-平台与 CLI 契约 | EX | 平台 | 统帅 | MG | 冻结 CLI 行为边界、兼容与降级策略 | `deliverables/EX-PLATFORM.md` | 否 |
| MG-文档产物线 | MG | 文档产物 | EX | OP-THEME、OP-FOOTER | 单文件 HTML 规范、验收口径、I/O 裁剪 | `deliverables/MG-DOCS.md` | 否 |
| OP-THEME | OP | 主题/A11y | MG | — | 暗色主题与对比度、默认与媒体查询 | `deliverables/OP-THEME-ROLLUP.md` + `swarm-traces/OP-THEME-*.md` | 是 |
| OP-FOOTER | OP | 内容与安全 | MG | — | 版权行配置面、注入与编码边界 | `deliverables/OP-FOOTER-ROLLUP.md` + `swarm-traces/OP-FOOTER-*.md` | 是 |

---

## 信息流向

1. **统帅 → EX**：军令状路径 + 战略指令（本演示为同目录 `MISSION-BRIEF.md`）。  
2. **EX → MG**：纲要（向后兼容、默认不变、穿透约束不打折）+ 下级任务书摘要。  
3. **MG → 叶 OP**：产物规范 + 各自任务书 + I/O 路由（见 `SCHEDULE.md`）。  
4. **叶 OP → 蜂群**：军令状 **②③⑤** + `[PENETRATING]` 原文 + 本 OP 任务书。  
5. **叶 OP → 统帅**：《逐级主题汇流块》+ R4 裁决摘要 + `decisions_log`。

**跨部门一致性关键点**：主题 CSS 不得覆盖页脚容器语义结构；页脚 HTML 转义策略须与主题层「代码块/自定义 HTML」策略在 MG 层对齐（见 `ECHO-CHECK.md`）。

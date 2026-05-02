# L3 Task 派发日志（演示）

**CHAIN**：`LEGION-RUBRIC-DEMO-001`

| EP | 角色 | 派发形态 | 留痕路径 / 子代理指针 |
|----|------|----------|------------------------|
| EP-0 | EX | 统帅落盘（等效 L3 收口） | `deliverables/EX-PLATFORM.md` |
| EP-1 | MG | 统帅落盘 | `deliverables/MG-DOCS.md` |
| EP-2 | OP-THEME 蜂群 R1 | Sub-agent Task | Agent `df001913-8c1e-4112-b4db-3f9120cd473f` |
| EP-2 | OP-THEME 蜂群 R2 | Sub-agent Task | Agent `4ad86f68-abbf-4799-934a-5b2ba69463f7` |
| EP-2 | OP-THEME 蜂群 R3 | Sub-agent Task | Agent `bf3a7f83-ae9e-4eb7-b44d-06c55ace7bd8` |
| EP-2 | OP-THEME 蜂群 R4 | Sub-agent Task | Agent `7fa4f45c-40f6-46a4-986c-d976e1a0d36e` |
| EP-2 | OP-FOOTER 蜂群 R1 | Sub-agent Task | Agent `1bd837a5-2306-4236-b567-fe083813e1c9` |
| EP-2 | OP-FOOTER 蜂群 R2 | Sub-agent Task | Agent `84904606-5c08-4224-940f-88b2fa8b538c` |
| EP-2 | OP-FOOTER 蜂群 R3 | Sub-agent Task | Agent `9520cbdf-8294-43a4-ad7c-f355e811db8e` |
| EP-2 | OP-FOOTER 蜂群 R4 | Sub-agent Task | Agent `51874dc5-3e48-460d-8c06-d033d7dfa9de` |

**说明**：EX/MG 未单独占用 Sub-agent，为演示链 **成本裁量**；叶 OP 蜂群 **8/8** Task 真隔离。若审计要求 EX/MG 也 Task 化，可 bump `FREEZE_VERSION` 并补发。

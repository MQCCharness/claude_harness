# EP-3《小程序实现包》指针 — LEGION-POSE-COACH-001

**冻结工程路径（仓库根相对）**：`pose-coach-miniprogram/`  
**README**：`pose-coach-miniprogram/README.md`  

**输入对齐**：`MG-ENGINEERING-PLAN.md`、`OP-UX-COPY-DELIVERY.md`、`OP-POSE-ASSETS-SPEC.md`、`MISSION-BRIEF.md`。

**decisions_log（工程摘要）**

| ID | 决策 |
|----|------|
| D-EP3-001 | 原生小程序单包；`libVersion` 2.28.0 与 `track.body` 文档对齐（A 级以微信文档为准）。 |
| D-EP3-002 | `poses_manifest` 运行时 `require('../data/poses_manifest.json')`；`assets/` 下保留同内容副本便于素材维护。 |
| D-EP3-003 | `sceneTags` 过滤：**交集非空**（与 R3 一致）。 |
| D-EP3-004 | VK `session.start()` 无回调兼容；失败走示意模式横幅。 |
| D-EP3-005 | 无「可选分析」产品能力 → `FEATURE_OPT_IN_ANALYTICS=false`。 |

**蜂群**：本回合已执行 R3、R4 Task（ROUND=5）；统帅侧 **TC-E/B 实测** 依赖微信开发者工具环境。

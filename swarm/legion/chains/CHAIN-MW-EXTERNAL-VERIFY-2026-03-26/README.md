# CHAIN-MW-EXTERNAL-VERIFY-2026-03-26（W2 · 外机验证）

**PARENT_CHAIN**：`CHAIN-MW-REBUILD-2026-03-26`  
**WAVE**：对外部环境为 **W1**；对本母链为 **W2 承接链**。

## 目的

在**第二台机器 / 空仓库**中，仅依赖拷贝的 **`PORTING-PROMPT-LEGION-MIN-REBUILD.zh-CN.md`**（及可选全量 `legion/` + `rules/`）完成**同构重建**，并在此目录回填：

- `REBUILD-REPORT.md`（对方 AI 自述完成项 + 命令退出码）
- `DIFF-NOTES.md`（与母仓 I1–I10 逐条对照摘要）

## 文件

| 文件 | 说明 |
|------|------|
| `MISSION-BRIEF.md` | W2 军令状（⑤ 须含「外机自检 PASS」） |
| `SCHEDULE.md` | 单 EP 即可：执行 MIN → 跑 `legion-min-tree-check.ps1` → 回填 |

## 收口

母链更新 `chains/CHAIN-MW-REBUILD-2026-03-26/WAVE-CLOSE-*-W2.md`（若采用第二波收口）或在本目录写 `WAVE-CLOSE-…-W1.md` 后由统帅合并到母链 Gap。

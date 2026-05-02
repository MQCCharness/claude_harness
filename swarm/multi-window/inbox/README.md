# inbox — 轮次目录

## 推荐：`current/`（免每轮换路径）

- 主帅在**工作区根**执行：  
  `powershell -File .claude/swarm/multi-window/scripts/New-SwarmRound.ps1 -Goal "一句话目标"`  
- 脚本会：把上一包 `current/` **挪到** `archive/round-<时间戳>/`，再生成新的 **`inbox/current/`**（含 `R*.md`、`META.md`、`ROUND.meta.json`、`HANDOFF.md` 壳、`COMMANDER.md` 壳、`PASTE-TO-ALL-ROLE-WINDOWS.txt`），并在 **`../LAST-ROUND.pointer`** 写入当前 `current` 相对路径与 `round_id`。  
- **全角色窗口**每轮只需发**同一条**话（脚本会尝试 **Set-Clipboard**；也可打开 `current/PASTE-TO-ALL-ROLE-WINDOWS.txt` 复制）。  
- 详见 **../QUICKSTART.zh-CN.md**「方法二」。

## 备选：自建 `round-xxx/` 子文件夹

仍可按 **PROTOCOL.zh-CN.md** 手工建目录、复制模板（适合只要归档、不用 `current` 时）。

**勿**把密钥写入本目录。

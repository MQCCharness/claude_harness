# 多窗口人工蜂群 — 5 分钟上手

**说明**：Claude Code **不能**由某个 Agent「替你自动打开」多个窗口；你需要**自己**新开多个 chat session，并把本文件路径发给每个窗口当「开场白」。

---

## 方法一：手工建 `round-xxx/`（完全可控）

1. **主帅窗口**：复制 `QUICKSTART` 里原「主帅」代码块（见下）。
2. **各角色窗口**：各复制对应 `templates/TEMPLATE-Rx.md` 里 **系统角色提示词** 代码块。
3. **每轮**：主帅新建 `inbox/round-日期-主题/`，复制模板为 `R1.md`…，再给各窗发**不同**的绝对路径 + 目标（第二条消息）。

### 主帅窗口第一条消息（示例）

```text
你是 4+1 蜂群里的主帅（+1）。本工作区使用「多窗口人工蜂群」：
- 公共目录：.claude/swarm/multi-window/
- 每轮在 multi-window/inbox/<轮次文件夹>/ 里读 R1–R4 的产出，写 COMMANDER 汇流稿。
- 遵守 CLAUDE.md §二 的汇流、A/B/C 分级与转化义务（→R3/→R4/风险/待决）。
先 Read：.claude/swarm/multi-window/PROTOCOL.zh-CN.md
```

4. **各角色第二条消息**：写明**该角色**要编辑的 `.md` **绝对路径** + 用户目标一句。

---

## 方法二：脚本刷新 `inbox/current/`（推荐，几乎不用复制路径）

**思路**：所有角色文件永远在 **`inbox/current/R1.md`** …；每轮只改内容。各窗口**第二条消息可以四条完全相同**。

### 主帅每轮只做一件事

在**工作区根目录**打开 PowerShell，执行：

```powershell
powershell -File .claude/swarm/multi-window/scripts/New-SwarmRound.ps1 -Goal "这里写本轮用户目标一句话"
```

- 上一轮的 `current/` 会自动**归档**到 `inbox/archive/round-<时间戳>/`。
- 同轮会生成 **`inbox/current/ROUND.meta.json`**（`round_id`、目标、角色列表）与 **`multi-window/LAST-ROUND.pointer`**（指向当前 `current` + `round_id`）；主帅可选编辑 **`inbox/current/HANDOFF.md`** 做跨轮冻结摘要。
- 脚本会尝试把**发给所有 R1–R4 的同一句**放进**剪贴板**；若没有剪贴板，就打开：  
  `.claude/swarm/multi-window/inbox/current/PASTE-TO-ALL-ROLE-WINDOWS.txt`

### 各角色窗口（每条轮次）

**同一条消息**粘贴到 R1、R2、R3、R4 四个窗口即可（内容一致）：

```text
新一轮已就绪。请 Read：.claude/swarm/multi-window/inbox/current/META.md
然后只执行文档里与你角色代号对应的小节，并只编辑该节写明的唯一 .md 文件；勿改同目录其它 R*.md。
```

（与 `META.md` 里预置的文案相同。）

**小技巧**：在 Claude Code 输入框用 **`@` 引用** `inbox/current/META.md` 或 `PASTE-TO-ALL-ROLE-WINDOWS.txt`，有时比从剪贴板粘贴更省事（取决于版本）。

### 主帅汇流

Read `inbox/current/R1.md` … `R4.md`，编辑同目录 **`COMMANDER.md`**；需要时追加 `../RECENT-DECISIONS.md`。

### 可选参数

```powershell
# 指定工作区根（若不在仓库根执行）
powershell -File .claude/swarm/multi-window/scripts/New-SwarmRound.ps1 -WorkspaceRoot "D:\MyRepo" -Goal "..."

# 只生成部分角色
powershell -File ... -Goal "..." -Roles R1,R2,R4
```

---

详细约定见 **PROTOCOL.zh-CN.md**。

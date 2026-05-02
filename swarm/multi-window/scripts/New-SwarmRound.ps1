<#!
  生成本轮蜂群「收件箱」到固定目录 inbox/current/，避免每轮复制绝对路径。
  用法（在 PowerShell 中，工作区根目录执行或任意目录）:
    powershell -File .claude/swarm/multi-window/scripts/New-SwarmRound.ps1 -Goal "你的目标一句话"
  可选: -WorkspaceRoot "D:\repo"  ; -Roles R1,R2（只生成部分角色）
  结束后会把「发给所有角色窗口的同一句」写入剪贴板（Windows）。
#>
param(
  [Parameter(Mandatory = $true)]
  [string] $Goal,
  [string] $WorkspaceRoot = "",
  [string[]] $Roles = @("R1", "R2", "R3", "R4")
)

$ErrorActionPreference = "Stop"
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

$scriptDir = $PSScriptRoot
if (-not $scriptDir) {
  $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}

if (-not $WorkspaceRoot) {
  $WorkspaceRoot = (Resolve-Path (Join-Path $scriptDir "../../../..")).Path
}
if (-not ((Test-Path (Join-Path $WorkspaceRoot ".claude")) -or (Test-Path (Join-Path $WorkspaceRoot ".cursor")))) {
  Write-Error "WorkspaceRoot 不像 Claude Code 工作区根（缺少 .claude）: $WorkspaceRoot"
  exit 1
}

$mw = Join-Path $WorkspaceRoot ".claude/swarm/multi-window"
$tmpl = Join-Path $mw "templates"
$inbox = Join-Path $mw "inbox"
$current = Join-Path $inbox "current"
$archive = Join-Path $inbox "archive"
$ts = Get-Date -Format "yyyyMMdd-HHmmss"
$roundId = "round-$ts"

New-Item -ItemType Directory -Force -Path $archive | Out-Null

if (Test-Path -LiteralPath $current) {
  $dest = Join-Path $archive $roundId
  Move-Item -LiteralPath $current -Destination $dest
  Write-Host "已归档上一轮到: $dest"
}

New-Item -ItemType Directory -Force -Path $current | Out-Null

$map = @{
  "R1" = "TEMPLATE-R1.md"
  "R2" = "TEMPLATE-R2.md"
  "R3" = "TEMPLATE-R3.md"
  "R4" = "TEMPLATE-R4.md"
}

foreach ($r in $Roles) {
  if (-not $map.ContainsKey($r)) { continue }
  $src = Join-Path $tmpl $map[$r]
  if (-not (Test-Path -LiteralPath $src)) {
    Write-Error "缺少模板: $src"
    exit 1
  }
  $dst = Join-Path $current "$r.md"
  Copy-Item -LiteralPath $src -Destination $dst -Force
  $raw = [System.IO.File]::ReadAllText($dst)
  $raw = $raw.Replace("（用户目标一句）", $Goal)
  [System.IO.File]::WriteAllText($dst, $raw, $utf8NoBom)
}

$cmdTmpl = Join-Path $tmpl "TEMPLATE-COMMANDER.md"
if (Test-Path -LiteralPath $cmdTmpl) {
  Copy-Item -LiteralPath $cmdTmpl -Destination (Join-Path $current "COMMANDER.md") -Force
}

# META.md
$relCurrent = ".claude/swarm/multi-window/inbox/current"
$metaLines = @(
  "# 本轮元数据（由 New-SwarmRound.ps1 生成）",
  "",
  "- **轮次 id**：$roundId",
  "- **生成时间（本地）**：$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')",
  "- **本轮目标**：",
  "",
  $Goal,
  "",
  "## 各角色只编辑的文件（相对工作区根）",
  ""
)
foreach ($r in $Roles) {
  $metaLines += "- **$r** → ``$relCurrent/$r.md``"
}
$metaLines += @(
  "",
  "## 机器可读与跨轮接力",
  "",
  "- **ROUND.meta.json**：本轮 ``round_id``、目标、角色列表（脚本生成）。",
  "- **HANDOFF.md**：主帅选填；冻结事实 + 路径指针，供下一轮会话或 Task 摘要（模板源：``templates/HANDOFF.template.md``）。",
  "- **LAST-ROUND.pointer**：``.claude/swarm/multi-window/LAST-ROUND.pointer``（每轮覆盖；首行 = 当前 ``inbox/current`` 相对路径，次行 = ``round_id``）。",
  ""
)
$metaLines += @(
  "",
  "---",
  "",
  "## 发给所有 R1–R4 窗口的同一条消息（复制 1 次、贴到各窗即可）",
  "",
  "```text",
  "新一轮已就绪。请 Read：.claude/swarm/multi-window/inbox/current/META.md",
  "然后只执行文档里与你角色代号对应的小节，并只编辑该节写明的唯一 .md 文件；勿改同目录其它 R*.md。",
  "```",
  ""
)

foreach ($r in $Roles) {
  $metaLines += @(
    "### $r 小节（给模型看的执行说明）",
    "",
    "1. 你已 Read 本 META.md。",
    "2. Read：``$relCurrent/$r.md``。",
    "3. 按该文件模板填写各小节；**本轮目标**见本文顶部。",
    ""
  )
}

$metaPath = Join-Path $current "META.md"
[System.IO.File]::WriteAllText($metaPath, ($metaLines -join "`n") + "`n", $utf8NoBom)

# ROUND.meta.json（机器可读；供脚本/主帅指针，勿含密钥）
$metaJson = [ordered]@{
  schema_version = 1
  round_id       = $roundId
  created_local  = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
  goal           = $Goal
  relative_inbox_current = $relCurrent
  roles          = @($Roles)
}
$jsonPath = Join-Path $current "ROUND.meta.json"
[System.IO.File]::WriteAllText($jsonPath, (($metaJson | ConvertTo-Json -Depth 6) + "`n"), $utf8NoBom)

# LAST-ROUND.pointer：multi-window 根下固定文件，每轮覆盖；首行为相对路径，次行为 round_id
$pointerPath = Join-Path $mw "LAST-ROUND.pointer"
$pointerBody = "$relCurrent`n$roundId`n"
[System.IO.File]::WriteAllText($pointerPath, $pointerBody, $utf8NoBom)

# HANDOFF 模板复制到本轮（主帅汇流后补全）
$handoffTmpl = Join-Path $tmpl "HANDOFF.template.md"
if (Test-Path -LiteralPath $handoffTmpl) {
  $handoffDst = Join-Path $current "HANDOFF.md"
  Copy-Item -LiteralPath $handoffTmpl -Destination $handoffDst -Force
  $ho = [System.IO.File]::ReadAllText($handoffDst)
  $ho = $ho.Replace("（用户目标一句）", $Goal)
  [System.IO.File]::WriteAllText($handoffDst, $ho, $utf8NoBom)
}

$broadcast = @"
新一轮已就绪。请 Read：.claude/swarm/multi-window/inbox/current/META.md
然后只执行文档里与你角色代号对应的小节，并只编辑该节写明的唯一 .md 文件；勿改同目录其它 R*.md。
"@.Trim()

$pasteFile = Join-Path $current "PASTE-TO-ALL-ROLE-WINDOWS.txt"
[System.IO.File]::WriteAllText($pasteFile, $broadcast + "`n", $utf8NoBom)

try {
  Set-Clipboard -Value $broadcast
  Write-Host "已写入剪贴板：全角色共用的一条消息（可粘贴到各窗口）。"
}
catch {
  Write-Host "剪贴板不可用，请打开文件复制: $pasteFile"
}

Write-Host "本轮目录: $current"
Write-Host "主帅汇流后请编辑: $(Join-Path $current 'COMMANDER.md') 与可选 $(Join-Path $current 'HANDOFF.md')"
Write-Host "机器指针: $(Join-Path $current 'ROUND.meta.json') 与 $pointerPath"

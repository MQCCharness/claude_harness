# 《姿势素材包》规范 — LEGION-POSE-COACH-001

**角色**：OP-内容管线员（TIER=OP）  
**锚点**：`CHAIN=LEGION-POSE-COACH-001 ROUND=2 TIER=OP ROLE=OP-内容管线员 PARENT_REF=统帅继续EP0`  
**生成**：2026-03-27  
**军令状指针**：`../MISSION-BRIEF.md`（只读穿透，本文档不得改写军令状正文）

---

## 《逐级主题汇流块》

| 字段 | 内容 |
|------|------|
| 本层职责一句 | 定义首期**本地随包**姿势示例资源的目录、命名、元数据契约与合规占位，供 OP-小程序消费；**不交付实现代码**。 |
| 直连上级 | 军团统帅（EP-0 继续）；架构上承接 `ARCHITECTURE.md`「姿势素材与运营部 → OP-内容管线员」。 |
| 直连下游 | OP-小程序开发员（EP-3）：示例图路径、元数据、可选关键点参考 JSON 占位。 |
| 主题摘要 | 微信小程序 MVP：示例姿势 + 相机预览 + 引导；**默认素材为包内授权资源**（插画/剪影/示意），**不以用户上传肖像为默认素材来源**（对齐军令状③隐私与产品意图）。 |
| 与上游对齐 | 军令状②⑤：人像/全身类、可理解引导；军令状④：粗匹配/纯示意降级可共存 → 元数据须支持「仅展示、无关键点」条目。EX 纲要（`EX-PRODUCT-STRATEGY-OUTLINE.md`）：场景选择最小必要 → `sceneTags` 与后续《场景与 PRD 切片》对表，**当前标签枚举为建议稿（B）**。 |
| 矛盾与风险 | OP-场景 PRD（EP-1）未落盘时，标签全集可能变更 → 本规范约定**对表方式与版本字段**，冲突时以统帅路由后的场景切片为准并 bump `manifestVersion`。 |
| 上送指针 | `../SCHEDULE.md` I/O 表「OP-内容管线员」行；`../ARCHITECTURE.md` 信息流向「内容 OP → 工程 OP」。 |

---

## 1. 范围与非目标

### 1.1 纳入（首期）

- 随小程序分包或主包发布的**静态资源**：缩略图、全身/半身参考图、可选矢量剪影替代位。
- 单一 **`poses_manifest.json`**（或分包内等价路径）作为**索引入口**；每条 pose 对应目录下一组文件 + 一条元数据记录。

### 1.2 非目标（首期）

- 不要求实现 CMS、热更新协议或云端下发（可在 schema 预留 `source: "bundled" | "remote"` **占位**，默认仅 `bundled`）。
- **不**将「用户拍摄画面/上传肖像」定义为默认示例素材来源；用户内容仅可用于**实时对比**（实现侧），与本包**示例图来源**解耦。

---

## 2. 资源目录结构（建议）

仓库或小程序资源根下（路径可按工程调整，**逻辑结构**保持一致）：

```text
assets/
  poses/
    _manifest/
      poses_manifest.json          # 全量索引（或按分包拆分 manifest）
    {poseId}/                      # poseId：见 §3，与目录名一致
      thumb.{ext}                  # 缩略图，用于列表/卡片
      full.{ext}                   # 全身或主参考图
      silhouette.svg               # 可选：纯轮廓示意（降级/低带宽）
      meta.json                    # 可选：单条元数据文件（若不用集中 manifest）
      README_LICENSE.txt           # 可选：该条目的授权摘要（见 §6）
```

**说明**：

- 若团队选择**仅集中 manifest**、不把 `meta.json` 落在子目录，则 `{poseId}/` 内至少保留 `thumb` 与 `full`（或合并为单图，在 manifest 中声明 `fullPath` 与 `thumbPath` 相同，**P1** 工程取舍）。
- `referenceKeypoints` 若启用，建议仍放在 **manifest 条目中**或 `meta.json`，避免多文件漂移。

---

## 3. 文件命名规则

| 类型 | 规则 | 示例 |
|------|------|------|
| 目录名 `poseId` | 小写 **`kebab-case`**；仅 `[a-z0-9-]`；长度 8–64；全局唯一 | `daily-standing-relax-01` |
| 缩略图 | 固定名 `thumb.{ext}`，`ext ∈ {png, webp, jpg}`；**首包建议 webp/png** | `thumb.webp` |
| 主参考图 | 固定名 `full.{ext}`，同上 | `full.png` |
| 剪影 | 固定名 `silhouette.svg`（可选） | `silhouette.svg` |
| Manifest | `poses_manifest.json`（可置于 `assets/poses/_manifest/`） | — |

**约束**：`thumbPath`、`fullPath` 在 JSON 中使用**小程序内可解析的相对路径**（如 `/assets/poses/{poseId}/thumb.webp`），具体前缀与分包根由工程计划（MG-端侧 / OP-小程序）冻结为 **A**。

---

## 4. 元数据 JSON Schema（建议）

### 4.1 根对象：`poses_manifest.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://legion.local/schemas/poses-manifest-v1.json",
  "title": "PosesManifest",
  "type": "object",
  "required": ["manifestVersion", "poses"],
  "properties": {
    "manifestVersion": {
      "type": "string",
      "description": "语义化版本，变更标签或字段时递增",
      "pattern": "^[0-9]+\\.[0-9]+\\.[0-9]+$"
    },
    "defaultLocale": {
      "type": "string",
      "description": "默认文案语言",
      "default": "zh-CN"
    },
    "poses": {
      "type": "array",
      "items": { "$ref": "#/$defs/poseItem" },
      "minItems": 1
    }
  },
  "$defs": {
    "poseItem": {
      "type": "object",
      "required": [
        "id",
        "title",
        "sceneTags",
        "bodyVisibility",
        "referenceHints",
        "thumbPath",
        "fullPath"
      ],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-z0-9-]{8,64}$"
        },
        "title": {
          "type": "string",
          "description": "展示标题（可与 i18n key 并存）",
          "minLength": 1,
          "maxLength": 80
        },
        "sceneTags": {
          "type": "array",
          "items": { "type": "string", "pattern": "^[a-z][a-z0-9-]*$" },
          "description": "场景标签，与产品场景切片对表，见 §5",
          "minItems": 1
        },
        "bodyVisibility": {
          "type": "string",
          "enum": ["full-body", "upper-body", "head-shoulders", "prop-assisted"],
          "description": "身体可见范围，供 UI 与匹配策略选用"
        },
        "referenceHints": {
          "type": "object",
          "description": "给工程/文案用的简短提示，非用户可见长文",
          "properties": {
            "stance": { "type": "string" },
            "armPose": { "type": "string" },
            "gaze": { "type": "string" },
            "notes": { "type": "string" }
          },
          "additionalProperties": false
        },
        "thumbPath": { "type": "string", "minLength": 1 },
        "fullPath": { "type": "string", "minLength": 1 },
        "silhouettePath": {
          "type": "string",
          "description": "可选；纯示意轮廓"
        },
        "referenceKeypoints": {
          "type": "object",
          "description": "可选占位：与 VisionKit 关键点顺序对齐的参考姿态，失败或无 VK 时忽略",
          "additionalProperties": true
        },
        "matchMode": {
          "type": "string",
          "enum": ["display-only", "coarse-keypoints", "auto"],
          "default": "display-only",
          "description": "display-only：仅示例；coarse-keypoints：有关键点参考；auto：由运行时决定"
        },
        "source": {
          "type": "string",
          "enum": ["bundled"],
          "default": "bundled",
          "description": "首期固定 bundled；扩展远程时须新开军令状/合规评审"
        },
        "licenseRef": {
          "type": "string",
          "description": "指向包内 LICENSE 或条目 README 的指针",
          "minLength": 1
        },
        "portraitRightsNote": {
          "type": "string",
          "description": "肖像/模特授权说明占位，见 §6"
        }
      },
      "additionalProperties": false
    }
  }
}
```

**字段建议小结**（与 Task 要求对齐）：

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 与目录名一致 |
| `title` | 是 | 列表/详情标题 |
| `sceneTags` | 是 | 与场景标签对表（§5） |
| `bodyVisibility` | 是 | 全身/半身等 |
| `referenceHints` | 是 | 结构化短提示（站姿、手臂、视线等） |
| `thumbPath` / `fullPath` | 是 | 资源路径 |
| `referenceKeypoints` | 否 | MVP 占位；无则粗匹配/纯示意 |
| `silhouettePath`、`matchMode`、`source`、`licenseRef`、`portraitRightsNote` | 否 | 合规与运行策略 |

---

## 5. 与场景标签对齐方式

1. **单一事实源（目标态）**：产品侧冻结的《场景与 PRD 切片》中「场景 ID / 标签」表为 **权威**；本 manifest 中 `sceneTags` 必须为表中标签的**子集或全集引用**，禁止私自造标签而不对表。  
2. **当前态（EP-0/EP-1 间隙）**：下列为**建议枚举**，供 OP-场景收敛；标注 **B（待核实）** — 须由 OP-场景与需求落地员冻结后升 **A**。  
   - `portrait`：半身/人像为主  
   - `full-body`：全身站位  
   - `daily`：日常随拍  
   - `outdoor`：户外（构图/重心提示侧重）  
   - `indoor`：室内  
   - `beginner`：新手友好（姿势简单）  
3. **对表操作**：场景切片更新时，内容侧执行：  
   - 更新 `manifestVersion`（PATCH/MINOR 按变更规模）；  
   - 逐条 pose 检查 `sceneTags` ∈ 冻结表；  
   - 在 `decisions_log` 记录变更原因与日期。  
4. **多标签**：一条 pose 可挂多个 tag；小程序侧「当前选中场景」过滤 `sceneTags` 交集非空即可（具体逻辑 **B**，由 OP-小程序与 UX 拍板）。

---

## 6. 版权 / 肖像权占位要求

> 本节为**合规叙事占位**，非法律意见；可验证等级 **B/C**。

| 条目 | 等级 | 要求 |
|------|------|------|
| 包内示例图来源 | **B** | 每条资源须可追溯：**自有拍摄（持授权）**、**购买授权素材**或**自绘/矢量示意**；禁止默认使用无授权网络抓取图。 |
| 肖像权 | **B** | 若含可识别人像，须 `portraitRightsNote` 或 `README_LICENSE.txt` 说明模特/授权范围；**纯剪影/无脸插画**可降低敏感级，仍建议保留 `licenseRef`。 |
| 用户上传作为「示例库」 | **C（明确不采纳为默认）** | 与军令状及产品意图一致：**不**将用户上传肖像作为默认示例素材；若未来运营活动另议，须**单独合规评审**与新军令状条目。 |
| UGC 展示 | **C** | 首期非目标；若扩展，须明示同意与撤回机制（指针：军令状③）。 |

**内容管线动作**：随包附带 `assets/poses/LICENSE-THIRD-PARTY.md`（或等价）列出第三方素材清单与许可摘要为 **P0 建议**（工程类验收 **TC-E-** 可与 OP-小程序联合）。

---

## 7. `decisions_log`

| 日期 | 决策 | 等级 | 说明 |
|------|------|------|------|
| 2026-03-27 | 首期示例素材仅为 **bundled**，路径模式 `/assets/poses/{id}/` | B | 具体分包与根前缀由端侧工程冻结后升 A |
| 2026-03-27 | `poseId` 使用 `kebab-case`，与目录名、JSON `id` 三一致 | A | 本规范内自洽 |
| 2026-03-27 | `sceneTags` 建议枚举在 OP-场景冻结前均为 **B** | B | 对表 §5 |
| 2026-03-27 | `referenceKeypoints` 可选；支持「仅展示」降级 | A | 对齐军令状④非目标 |
| 2026-03-27 | **不**将用户肖像上传作为默认示例来源 | A | 对齐军令状③与本 Task 禁区 |
| 2026-03-27 | 远程素材与 `source: remote` 不启用，待新规 | C | 对齐军令状④不默认未授权第三方云引擎 |

---

## 8. 示例：3 条虚构 pose 元数据（JSON）

> 以下为**虚构** `id` 与路径；**无真实人脸链接**；`referenceKeypoints` 仅占位结构。

```json
{
  "manifestVersion": "1.0.0",
  "defaultLocale": "zh-CN",
  "poses": [
    {
      "id": "fictional-daily-stand-001",
      "title": "日常放松站姿（示意）",
      "sceneTags": ["daily", "full-body", "beginner"],
      "bodyVisibility": "full-body",
      "referenceHints": {
        "stance": "双脚与肩同宽，重心略偏后",
        "armPose": "一手自然下垂，一手轻扶手腕",
        "gaze": "平视镜头略上方",
        "notes": "肩线放松，避免耸肩"
      },
      "thumbPath": "/assets/poses/fictional-daily-stand-001/thumb.webp",
      "fullPath": "/assets/poses/fictional-daily-stand-001/full.webp",
      "silhouettePath": "/assets/poses/fictional-daily-stand-001/silhouette.svg",
      "referenceKeypoints": {
        "_comment": "占位：真实工程须与 VK 关节顺序与坐标系对齐",
        "version": 0,
        "normalized": true
      },
      "matchMode": "coarse-keypoints",
      "source": "bundled",
      "licenseRef": "/assets/poses/LICENSE-THIRD-PARTY.md#fictional-daily-stand-001",
      "portraitRightsNote": "虚构条目：示意插画，无真人肖像（B）"
    },
    {
      "id": "fictional-portrait-seat-002",
      "title": "坐姿半身人像（示意）",
      "sceneTags": ["portrait", "indoor", "beginner"],
      "bodyVisibility": "upper-body",
      "referenceHints": {
        "stance": "坐姿靠背略前倾",
        "armPose": "小臂置于桌面，双手轻叠",
        "gaze": "看向镜头三角区",
        "notes": "下巴微收，头顶向上延伸"
      },
      "thumbPath": "/assets/poses/fictional-portrait-seat-002/thumb.png",
      "fullPath": "/assets/poses/fictional-portrait-seat-002/full.png",
      "matchMode": "display-only",
      "source": "bundled",
      "licenseRef": "/assets/poses/LICENSE-THIRD-PARTY.md#fictional-portrait-seat-002",
      "portraitRightsNote": "虚构条目：无脸风格插画（B）"
    },
    {
      "id": "fictional-outdoor-walk-003",
      "title": "户外行走动感（剪影示意）",
      "sceneTags": ["outdoor", "full-body", "daily"],
      "bodyVisibility": "full-body",
      "referenceHints": {
        "stance": "行走中一脚前伸未落地",
        "armPose": "自然摆动，避免同手同脚",
        "gaze": "侧向远方",
        "notes": "留白方向与身体朝向一致"
      },
      "thumbPath": "/assets/poses/fictional-outdoor-walk-003/thumb.webp",
      "fullPath": "/assets/poses/fictional-outdoor-walk-003/full.webp",
      "silhouettePath": "/assets/poses/fictional-outdoor-walk-003/silhouette.svg",
      "matchMode": "display-only",
      "source": "bundled",
      "licenseRef": "/assets/poses/LICENSE-THIRD-PARTY.md#fictional-outdoor-walk-003",
      "portraitRightsNote": "虚构条目：纯剪影无识别特征（B）"
    }
  ]
}
```

---

## 9. 修订记录

| 版本 | 日期 | 作者角色 | 摘要 |
|------|------|----------|------|
| 1.0 | 2026-03-27 | OP-内容管线员 | 首版：目录、命名、schema、标签对表、合规占位、虚构样例 |

---

**文档结束** — 落盘路径：`artifacts/OP-POSE-ASSETS-SPEC.md`

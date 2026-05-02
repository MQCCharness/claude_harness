# CHAIN=LEGION-POSE-COACH-001

**状态**：**已冻结**（母军令状）；**W2 已收口**（本地 dev-server 联调）。

**主题**：微信小程序 — 姿势引导拍照。

**母军令状**：`MISSION-BRIEF.md`（勿改写正文）  
**W2 补充**：`MISSION-BRIEF-WAVE2-SUPPLEMENT.md`

---

## 波次留痕

| 波次 | 收口文件 | 说明 |
|------|----------|------|
| W1 | `WAVE-CLOSE-LEGION-POSE-COACH-001-W1.md` | Gap：无本地 HTTP 联调 → 驱动 W2 |
| W2 | `WAVE-CLOSE-LEGION-POSE-COACH-001-W2.md` | dev-server + `wx.request` manifest + 回退 |

---

## 冻结三件套

| 文件 | 说明 |
|------|------|
| `MISSION-BRIEF.md` | 军令状（五要素） |
| `ARCHITECTURE.md` | 组织架构 |
| `SCHEDULE.md` | DAG + I/O |

---

## 工程指针

- **小程序根目录**：仓库根下 `pose-coach-miniprogram/`
- **EP3 指针**：`artifacts/EP3-MINIPROGRAM-PACKAGE.md`
- **回声**：`ECHO-CHECK.md`（含 W2 节）

---

## 下一动作（可选）

- 用户在微信开发者工具验证 **`wx.request` → 127.0.0.1:3789** 与 **停服回退**。  
- 上架前：`urlCheck: true` + request 合法域名；`USE_LOCAL_API: false`。

# 波次收口包 — WAVE-CLOSE — LEGION-POSE-COACH-001 — W1

**执笔**：军团统帅（+1）  
**波次**：W1  
**CHAIN**：`LEGION-POSE-COACH-001`  
**时间**：2026-03-27（回溯收口，为启动 W2 提供 Gap 指针）

---

## 4.1 Gap 矩阵（Residual）

| 应有（指回 ⑤ / 契约） | 已有（证据指针） | 差（Residual） | 下一波动作（W2） |
|------------------------|------------------|----------------|------------------|
| ⑤ 全路径可在目标环境**可验收**（含交互 P0） | `ECHO-CHECK.md` **COND_PASS**；`node scripts/verify-package.js` / `verify_package.py` **Exit 0** | 微信开发者工具内 TC-B-P0、真机 VK **无 A 级全量留痕** | W2：保留静态验收；**可选本地 HTTP 联调**验证「客户端—服务」契约，不引入默认上传 |
| 产品迭代需**后端/配置通道**做联调（用户诉求） | 仅包内 `require` manifest，**无** HTTP 拉取 | **无本地服务器交互测试路径** | W2：落地 `dev-server` + `wx.request` + **失败回退包内** |
| ③ 默认本地；上传须同意 | 实现无上传 | 无变更 | W2：服务器**仅返回 JSON 配置**，**不**收集相机画面 |

---

## 4.2 收口包其他块

- **A. 本波已实现范围**：EP-0～EP-3；工程 `pose-coach-miniprogram/`；`artifacts/EP3-MINIPROGRAM-PACKAGE.md`；预览 `preview/index.html`；验收脚本。  
- **B. 残差总表**：开放项见上 Gap；真机矩阵 **B** 待用户补测。  
- **C. PF / INDEX**：本波未新建 PF。  
- **D. 回声摘要**：`ECHO-CHECK.md` → **COND_PASS**。  
- **E. 形状保持**：②③④⑤ **无用户明示推翻**；W2 为**能力增量**，不缩小隐私穿透。  
- **F. 众人拾柴**：**N=0**（W1 未登记新 `SC-NNN`；W2 完成后统帅可提议 `SC` 升格，另询用户）。  
- **G. 逐级汇流**：**N/A**（W1 未用 L3 ROLLUP 目录落盘专表）。

---

## 4.3 二期策略

选用 **S-B**：于 `MISSION-BRIEF-WAVE2-SUPPLEMENT.md` 冻结 **W2 增量条款**；**不**改写 `MISSION-BRIEF.md` 正文。

---

## Wave Gate（W1）

**继续多波次**：是（U5/U3 部分开放 + 用户要本地服务器联调）→ **启动 W2**。

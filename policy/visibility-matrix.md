# Phase 1: Aura 可見性矩陣（資料模型與權限模型）

目標：在不暴露「精準位置」的前提下，提供 Aura 的三種顯示模式與一致的權限/TTL 行為。

## 名詞與等級

- **Aura**：用戶狀態的視覺化表示（例如 `aura_color`、強度、脈動樣式）。
- **活動類型**：例如 `commute` / `eat` / `work` / `idle`（只是一種標籤，不等於位置）。
- **粗位置**：城市級或場域級（event_room）。**不提供經緯度/地址/POI**。
- **精準度**（precision）定義：
  - `none`：不提供位置欄位
  - `city`：城市級（例如 "San Francisco"）
  - `event_room`：只表示同一個活動/場域房間（例如 room 名稱/代碼）

## Mode A/B/C（對外規格）

| Mode | 可見內容 | 位置精準度 | TTL（對外可見） | 可搜尋 | 截圖/分享 |
|---|---|---|---|---|---|
| **A: Everyone（公開）** | Aura 顏色 ✅，活動類型 ✅，粗位置（城市）✅ | `city` | 5 分鐘（超時顯示離線/不可見） | **預設不可**（可在 policy opt-in 開） | 可分享 ✅（但在 UI/規格上標示「公開」與 watermark；後端記錄 risk_event） |
| **B: Area people（同場域/活動房間）** | Aura 顏色 ✅，活動類型 ✅，粗位置（event_room）✅ | `event_room` | **只要在房間內可見**（離開即不可見；可選 30-60 秒 grace） | 不可 | 不允許（產品規格上禁止外部分享；UI watermark；記錄 risk_event） |
| **C: Connected aura（白名單）** | Aura 顏色 ✅，活動類型 ✅，粗位置（城市）✅ | `city` | 30 分鐘（超時顯示離線/不可見） | 不可（避免被追蹤） | 不允許外部分享（產品規格上禁止；UI watermark；記錄 risk_event） |

## 驗收對應

- ✅ **不顯示精準位置**：任何 mode 的對外 payload 不得包含 `lat/lng`、地址、POI、路線。
- ✅ **Connected 白名單 + 撤回**：Only these contacts；撤回後立即不可見（無快取繞過）。
- ✅ **Area people 同房可見**：只在同 `event_room` 期間可見；target 離開（session ended）即不可見。
- ✅ **Everyone 預設不暴露精準位置**：只允許 Aura/活動類型/城市級。


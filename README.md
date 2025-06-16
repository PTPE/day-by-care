# 日日安 DayByCare

居家照護排班系統，協助照服員輕鬆安排每日照護行程。

---

## 功能

-  **月曆排程**：可依月份查看個別案主的服務安排與時段
-  **時段管理與統計**：支援時數統計、班表紀錄
-  **PDF 匯出**：可匯出每月排班表，方便列印與保存
-  **iBon 列印**：可直接上傳至 7-11 ibon 網頁，產生列印代碼至超商列印
-  **Email 寄發**： Resend 寄送註冊驗證
-  **帳號登入**：以 Supabase 管理使用者資料

---

## 使用技術

- **前端**：Next.js 14（App Router）、Tailwind CSS
- **後端服務**：Supabase
- **Email**：Resend
- **部署**：Vercel

## 專案啟動方式
```bash
npm install
npm run dev
```

注意：本專案未附上完整金鑰，若未設定 .env.local，部分功能將無法正常執行。

## 測試帳號

你可以使用以下測試帳號登入系統進行體驗：
demo：https://day-by-care.ptpe.one/
帳號：test@mail.com
密碼：12345678


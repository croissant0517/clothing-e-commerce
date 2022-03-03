# 專案 README

# OVERFIT

這是一個使用 React 建立的電子商務前端專案，打造購物網站及管理後台。使用者分為一般消費者和店家管理員，消費者可在前台網站享受流暢的購物體驗、管理會員資料及查看訂單紀錄，而管理員則可以在後台針對前台內容進行管理。

> [OVETFIT](https://overfit-vic.herokuapp.com)

> [管理後台](https://overfit-vic.herokuapp.com/admin)：測試帳號 admin0103 / 密碼: admin55110103


![](https://github.com/croissant0517/clothing-e-commerce/blob/master/readFiles/front%20page%20intro%201.gif)
![](https://github.com/croissant0517/clothing-e-commerce/blob/master/readFiles/front%20page%20intro%202.png)
![](https://github.com/croissant0517/clothing-e-commerce/blob/master/readFiles/front%20page%20intro%203.png)

## 使用技術和第三方套件

- Create React App - 建立專案項目環境
- React - Function Components + Hooks
- React-Redux - Redux + Redux-Saga
- [React-Router](https://www.npmjs.com/package/react-router) - Web App 路由管理
- [Styled Components](https://styled-components.com/) - 以組件為單位撰寫 CSS 樣式
- [SCSS](https://sass-lang.com/) - 使用預處理器撰寫 CSS 樣式
- [React-icons](https://react-icons.github.io/react-icons/) - icon圖示
- [stripe](https://stripe.com/) - 處理金流付款
- [axios](https://axios-http.com/) - 處理HTTP請求
- [firebase](https://firebase.google.com/) - 使用firebase Auth實作會員登入及註冊功能，並利用firestore作為資料庫
- [Ant-Design](https://ant.design/index-cn) - 輔助打造後台管理頁面
- Heroku - 部署網站


## 功能介紹

- 前台

  - 商品瀏覽：

    - 按照分類瀏覽商品、搜尋商品
    - 滑鼠移至圖片上點擊圖片將商品加入購物車

  - 購物車：

    - icon 同步顯示購物車商品數量
    - 移除購物車商品
    - 查看訂單商品數量、金額及訂單總額

  - 登入/註冊：

    - 表單驗證功能，若輸入格式不符的資料將無法登入/註冊

  - 結帳系統：

    - 查看、修改購物車明細
    - 若未登入，會提示使用者在結帳前先登入/註冊會員
    - 填寫寄件資訊時可自動帶入會員資料
    - 訂單成立後顯示訂單明細

  - 會員中心：

    - 查看、編輯個人資料
    - 查看歷史訂單

- 後台

  - 會員管理：

    - 查看會員列表 (含搜尋、篩選功能)
    - 刪除會員

  - 商品管理：

    - 查看商品以及分類列表
    - 新增商品及分類
    - 刪除商品及分類

  - 訂單管理：

    - 查看訂單列表 (含搜尋、篩選功能)
    - 查看訂單詳細資料

## 專案 DEMO

### 購物體驗

- 將商品一鍵加入購物車，icon 會同步顯示購物車商品數量。

![](https://i.imgur.com/yf4qRMV.gif)

- 在商品詳細頁中調整購買數量，若數量超過庫存會顯示提示。

![](https://i.imgur.com/WG34LAi.gif)

- 結帳時可自動帶入會員收件資訊。

![](https://i.imgur.com/0dj0Ma2.gif)

- 下單時檢查庫存數量，若不足則提示使用者修改商品數量

![](https://i.imgur.com/j1RwrD5.gif)

### 管理後台

- 會員、訂單及商品頁面相互連結，方便店家進行管理。

![](https://i.imgur.com/0yfTYF7.gif)

- 使用搜尋、篩選功能輕鬆找到所需資料

![](https://i.imgur.com/O7UFeWk.gif)

## 功能地圖

### 前台：

![](https://i.imgur.com/Jh9nlrA.jpg)

### 後台：

![](https://i.imgur.com/h41DhVL.jpg)

## 如何執行

#### `npm install`

安裝此專案所需的第三方套件

#### `yarn start`

在 [http://localhost:3000](http://localhost:3000) 上啟動此專案

#### `yarn build`

在 `build` 資料夾中建立此專案的 production 版本

## 專案連結

- [DAYEAYEAYEA 後端專案](https://github.com/dingdingdingliu/Dayeayeayea-backend)
- [API 文件](https://api.coolizz.tw/api-docs/)

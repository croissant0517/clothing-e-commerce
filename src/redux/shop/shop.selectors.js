import { createSelector } from "reselect";

import memoize from 'lodash.memoize';

const selectShop = (state) => (state.shop)

export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => (shop.collections)
)

// Object.keys(collections)會回傳['bottom', 'top', 'shoes', 'hats', 'womens', 'mens']
// 再利用 map((key) => collections[key])得到個別對應的object並回傳至array中， EX: [{…}, {…}, {…}, {…}, {…}, {…}]
export const selectShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    (collections) => collections ? Object.keys(collections).map((key) => collections[key]) : []
)

export const selectShopCollection = memoize((collectionParams) => createSelector(
    [selectShopCollections],
    // 原本使用find的方式會使整個尋找正確商品項目的速度變慢，因此將shop.data原本的array改成object
    (collections) => (collections[collectionParams])
))

export const selectIsCollectionsFetch = createSelector(
    [selectShop],
    (shop) => shop.isFetching
)

// 檢查collections是否已有資料(使用雙驚嘆號可回傳布林值)
export const selectCollectionsLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.collections
)

export const selectShopCollectionsForDirectory = createSelector(
    [selectShopCollections],
    (collections) => collections ? Object.keys(collections).map((key) => collections[key]) : []
)
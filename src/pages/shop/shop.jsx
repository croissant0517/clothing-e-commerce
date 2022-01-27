import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

import "./shop.scss";

const CollectionsOverviewContainer = lazy(() => import("../../components/collection-overview/collection-overview.container"));
// const CollectionsContainer = lazy(() => import("../collection/collection.container"));
const CollectionPage = lazy(() => import("../collection/collection"))
// import CollectionPage from "../collection/collection";

const ShopPage = (props) => {
    return (
        <div className = "shop-page" >
            <Suspense fallback={<></>} >
                <Route exact path = {`${props.match.path}`} component={CollectionsOverviewContainer} />
                <Route exact path = {`${props.match.path}/:collectionId`} component={CollectionPage} />
            </Suspense>
        </div>
    );
}   

export default ShopPage;
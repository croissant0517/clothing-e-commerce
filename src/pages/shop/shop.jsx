import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { fetchCollectionsStart } from "../../redux/shop/shop.action";

import "./shop.scss";

const CollectionsOverviewContainer = lazy(() => import("../../components/collection-overview/collection-overview.container"));
const CollectionsContainer = lazy(() => import("../collection/collection.container"));

const ShopPage = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCollectionsStart())
    }, [dispatch])

    return (
        <div className = "shop-page" >
            <Suspense fallback={<></>} >
                <Route exact path = {`${props.match.path}`} component={CollectionsOverviewContainer} />
                <Route exact path = {`${props.match.path}/:collectionId`} component={CollectionsContainer} />
            </Suspense>
        </div>
    );
}   

export default ShopPage;
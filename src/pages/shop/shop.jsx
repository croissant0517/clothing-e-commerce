import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CollectionsOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionsContainer from "../collection/collection.container";

import { fetchCollectionsStart } from "../../redux/shop/shop.action";

import "./shop.scss";

const ShopPage = (props) => {
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(fetchCollectionsStart());
        }
    , [dispatch])

    return (
        <div className = "shop-page" >
            <Route exact path = {`${props.match.path}`} component={CollectionsOverviewContainer} />
            <Route exact path = {`${props.match.path}/:collectionId`} component={CollectionsContainer} />
        </div>
    );
}   

export default ShopPage;
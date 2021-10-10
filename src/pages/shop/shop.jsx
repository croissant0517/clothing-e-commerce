import React from "react";
import { Route } from "react-router-dom";

import CollectionOverview from "../../components/collection-overview/collection-overview";
import CollectionPage from "../collection/collection";

import "./shop.scss";

const ShopPage = (props) => {
    return (
        <div className = "shop-page" >
            <Route exact path = {`${props.match.path}`} component = {CollectionOverview} />
            <Route exact path = {`${props.match.path}/:collectionId`} component = {CollectionPage} />
        </div>
    );
}

export default ShopPage;
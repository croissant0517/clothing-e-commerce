import React from "react";
import CollectionPreview from "../collection-preview/collection-preview";
import { selectShopCollectionsForPreview } from "../../redux/shop/shop.selectors";

import { useSelector } from "react-redux";

import "./collection-overview.scss"

const CollectionOverview = (props) => {
    const collections = useSelector(selectShopCollectionsForPreview);

    return (
        <div className = "collection-overview" >
            {collections.map(collections => {
                return (
                    <CollectionPreview 
                        key = {collections.id}
                        title = {collections.title}
                        routeName = {collections.routeName}
                        items = {collections.items}
                    />
                )
            })}
        </div>
    );
}

export default CollectionOverview;
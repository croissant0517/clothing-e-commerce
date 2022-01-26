import React from "react";
import CollectionPreview from "../collection-preview/collection-preview";
import { selectShopCollectionsForPreview } from "../../redux/shop/shop.selectors";

import { useSelector } from "react-redux";

import "./collection-overview.scss"

const CollectionOverview = (props) => {
    const collections = useSelector(selectShopCollectionsForPreview);
    console.log(collections);

    return (
        <div className = "collection-overview" >
            {collections.map(collection => {
                return (
                    <CollectionPreview 
                        key = {collection.id}
                        title = {collection.title}
                        routeName = {collection.routeName}
                        items = {collection.items}
                        imageUrl = {collection.imageUrl}
                    />
                )
            })}
        </div>
    );
}

export default CollectionOverview;
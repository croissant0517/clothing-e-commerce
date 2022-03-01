import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item";
import { selectShopCollection } from "../../redux/shop/shop.selectors";

import "./collection.scss"

const CollectionPage = () => {
    const params = useParams();
    const collection = useSelector(selectShopCollection(params.collectionId));
    const { title, items } = collection

    return collection ? (
        <div className = "collection-page">
            <h2 className = "title" >{title.toUpperCase()}</h2>
            <div className = "items">
                {items.map((item) => <CollectionItem key = {item.id} item = {item}/>)}
            </div>
        </div>
    ) : <h1>GGGG</h1>;
}

export default CollectionPage;
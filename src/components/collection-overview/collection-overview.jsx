import React from "react";
import CollectionPreview from "../collection-preview/collection-preview";
import { selectShopCollectionsForPreview } from "../../redux/shop/shop.selectors";

import { useSelector } from "react-redux";

import "./collection-overview.scss"

const CollectionOverview = (props) => {
    const collections = useSelector(selectShopCollectionsForPreview);

    return (
        <div className = "collection-overview" >
            <div className="item-oreview-images-container" >
                {collections.map(collection => {
                    return (
                        <div 
                            key = {collection.id}
                            className="item-oreview-images" 
                            onClick={() => props.history.push(`${props.match.path}/${collection.routeName}`)}>
                            <div 
                                className="item-oreview-image" 
                                style = {{ backgroundImage: `url(${ collection.imageUrl })`}} 
                            >
                            </div>
                            <div className = "title" >{ collection.title.toUpperCase()}</div>
                        </div>

                    )
                })}
            </div>
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
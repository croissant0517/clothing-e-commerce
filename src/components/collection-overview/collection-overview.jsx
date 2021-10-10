import React from "react";
import CollectionPreview from "../collection-preview/collection-preview";
import { selectShopCollectionsForPreview } from "../../redux/shop/shop.selectors";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./collection-overview.scss"

const CollectionOverview = (props) => {
    return (
        <div className = "collection-overview" >
            {props.collections.map(collections => {
                return (
                    <CollectionPreview 
                        key = {collections.id}
                        title = {collections.title}
                        routename = {collections.routename}
                        items = {collections.items}
                    />
                )
            })}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollectionsForPreview,
})

export default connect(mapStateToProps)(CollectionOverview);
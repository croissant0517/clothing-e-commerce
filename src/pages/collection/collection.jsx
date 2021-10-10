import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item";
import { selectShopCollection } from "../../redux/shop/shop.selectors";

import "./collection.scss"

const CollectionPage = (props) => {
    const { title, items } = props.collection
    return (
        <div className = "collection-page">
            <h2 className = "title" >{title}</h2>
            <div className = "items">
                {items.map((item) => <CollectionItem key = {item.id} item = {item}/>)}
            </div>
        </div>
    );
}
// 因為CollectionPage是Route(在ShopPage被包成Route)因此在props會得到一個match
const mapStateToProps = (state, ownProps) => ({
    collection: selectShopCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
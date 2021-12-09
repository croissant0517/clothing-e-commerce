import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverview from "../../components/collection-overview/collection-overview";
import CollectionPage from "../collection/collection";

import { updateCollections } from "../../redux/shop/shop.action";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import "./shop.scss";

class ShopPage extends Component {

    componentDidMount() {
        const collectionRef = firestore.collection("collections");
        
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            this.props.updateCollections(collectionsMap);
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot = null
    }

    render() {
        return (
            <div className = "shop-page" >
                <Route exact path = {`${this.props.match.path}`} component = {CollectionOverview} />
                <Route exact path = {`${this.props.match.path}/:collectionId`} component = {CollectionPage} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
    })
}

export default connect(null, mapDispatchToProps)(ShopPage);
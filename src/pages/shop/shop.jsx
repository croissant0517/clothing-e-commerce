import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverview from "../../components/collection-overview/collection-overview";
import CollectionPage from "../collection/collection";
import WithSpinner from "../../components/with-spinner/with-spinner";

import { updateCollections } from "../../redux/shop/shop.action";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import "./shop.scss";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
    constructor() {
        super()

        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        const collectionRef = firestore.collection("collections");

        collectionRef.get().then((snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            this.props.updateCollections(collectionsMap);
            this.setState({ loading: false });
        })
        
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     this.props.updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // })
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot = null
    }

    render() {
        return (
            <div className = "shop-page" >
                <Route exact path = {`${this.props.match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={this.state.loading} {...props}/>} />
                <Route exact path = {`${this.props.match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={this.state.loading} {...props}/>} />
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
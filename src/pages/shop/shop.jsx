import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionsContainer from "../collection/collection.container";

import { fetchCollectionsStart } from "../../redux/shop/shop.action";

import "./shop.scss";

class ShopPage extends Component {

    componentDidMount() {
        this.props.fetchCollections();
    }

    render() {
        return (
            <div className = "shop-page" >
                <Route exact path = {`${this.props.match.path}`} component={CollectionsOverviewContainer} />
                <Route exact path = {`${this.props.match.path}/:collectionId`} component={CollectionsContainer} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchCollections: () => dispatch(fetchCollectionsStart())
    })
}

export default connect(null, mapDispatchToProps)(ShopPage);
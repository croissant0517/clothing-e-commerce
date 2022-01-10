import React from "react";
import { withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item";
import CustomButton from "../custom-button/custom-button";

import "./collection-preview.scss";

const CollectionPreview = (props) => {
    return (
        <div className = "collection-preview" >
            <h1 className = "title" onClick={() => props.history.push(`${props.match.path}/${props.routeName}`)} >{ props.title.toUpperCase() }</h1>
            <div className = "preview" >
                { props.items.filter((item, index) => index < 4).map(item => <CollectionItem key = { item.id } item = {item} />) }
            </div>
            <CustomButton className="load-more-button" onClick={() => props.history.push(`${props.match.path}/${props.routeName}`)} >more {props.title.toUpperCase()}</CustomButton>
        </div>
    );
}

export default withRouter(CollectionPreview);
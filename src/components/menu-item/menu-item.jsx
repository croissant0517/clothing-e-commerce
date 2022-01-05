import React from "react";
import { withRouter } from "react-router";
import "./menu-item.scss";

const MenuItem = (props) => {
    return (
        <div className = "menu-item" onClick = {() => props.history.push(`${props.match.url+props.linkUrl}`)} >
            <div className = "background-image" style = {{ backgroundImage: `url(${ props.imageUrl })` }} >
                <div className = "content" >
                    <h1 className = "title" >{ props.title }</h1>
                </div>
            </div>
        </div>
    );
}

export default withRouter(MenuItem);
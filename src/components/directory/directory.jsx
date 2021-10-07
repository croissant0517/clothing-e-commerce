import React from "react";
import MenuItem from "../menu-item/menu-item";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectDirectorySection } from "../../redux/directory/directory.selectors";

import "./directory.scss";

const Directory = (props) => {
    return(
        <div className = "directory-menu" >
            {props.section.map((item) => 
                <MenuItem 
                    key = {item.id}
                    title = {item.title}
                    imageUrl = {item.imageUrl}
                    linkUrl = {item.linkUrl}
                />
            )}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    section: selectDirectorySection
})

export default connect(mapStateToProps)(Directory);
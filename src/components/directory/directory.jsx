import React from "react";
import MenuItem from "../menu-item/menu-item";

import { useSelector } from "react-redux";
import { selectDirectorySection } from "../../redux/directory/directory.selectors";

import "./directory.scss";

const Directory = () => {
    const section = useSelector(selectDirectorySection);

    return(
        <div className = "directory-menu" >
            {section.map((item) => 
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

export default Directory;
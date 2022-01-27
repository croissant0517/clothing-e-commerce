import React from "react";
import MenuItem from "../menu-item/menu-item";

import { useSelector } from "react-redux";
import { selectShopCollectionsForDirectory } from "../../redux/shop/shop.selectors";

import "./directory.scss";

const Directory = () => {
    const section = useSelector(selectShopCollectionsForDirectory);

    return(
        <div className = "directory-menu" >
            {section.map((item) => 
                <MenuItem
                    key = {item.id}
                    title = {item.title}
                    imageUrl = {item.imageUrl}
                    linkUrl = {`shop/${item.routeName}`}
                />
            )}
        </div>
    );
}

export default Directory;
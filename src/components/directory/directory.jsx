import React from "react";
import MenuItem from "../menu-item/menu-item";

import { useSelector } from "react-redux";
import { selectShopCollectionsForDirectory } from "../../redux/shop/shop.selectors";

import "./directory.scss";

const Directory = () => {
    const section2 = useSelector(selectShopCollectionsForDirectory);
    console.log(section2);

    return(
        <div className = "directory-menu" >
            {section2.map((item) => 
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
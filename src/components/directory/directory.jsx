import React, { useEffect } from "react";
import MenuItem from "../menu-item/menu-item";

import { useDispatch , useSelector } from "react-redux";
import { selectShopCollectionsForDirectory } from "../../redux/shop/shop.selectors";

import { fetchCollectionsStart } from "../../redux/shop/shop.action"; 

import "./directory.scss";

const Directory = () => {
    const dispatch = useDispatch();
    const section = useSelector(selectShopCollectionsForDirectory);

    useEffect(()=> {
        dispatch(fetchCollectionsStart());
    }, [dispatch])

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
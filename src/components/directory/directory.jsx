import React, { Component } from "react";
import MenuItem from "../menu-item/menu-item";
import "./directory.scss";

class Directory extends Component{
    constructor() {
        super();

        this.state = {
            section: [
                {
                    title: 'BOTTOM',
                    imageUrl: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                    id: 1,
                    linkUrl: 'shop/bottom'
                },
                {
                    title: 'TOP',
                    imageUrl: 'https://images.pexels.com/photos/4641825/pexels-photo-4641825.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                    id: 2,
                    linkUrl: 'shop/top'
                },
                {
                    title: 'SHOES',
                    imageUrl: 'https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                    id: 3,
                    linkUrl: 'shop/shoes'
                },
                {
                    title: 'HATS',
                    imageUrl: 'https://images.pexels.com/photos/1078975/pexels-photo-1078975.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                    id: 4,
                    linkUrl: 'shop/hats'
                },
                {
                    title: 'WOMENS',
                    imageUrl: 'https://images.pexels.com/photos/884979/pexels-photo-884979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                    id: 5,
                    linkUrl: 'shop/womens'
                },
                {
                    title: 'MENS',
                    imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                    id: 6,
                    linkUrl: 'shop/mens'
                }
            ]
        }
    }

    render() {
        return(
            <div className = "directory-menu" >
                {this.state.section.map(({title, imageUrl, id, linkUrl}) => 
                    <MenuItem 
                        key = {id}
                        title = {title}
                        imageUrl = {imageUrl}
                        linkUrl = {linkUrl}
                    />
                )}
            </div>
        );
    }
}

export default Directory;
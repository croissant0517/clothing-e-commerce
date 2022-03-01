import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../../api/api-utils";
import { Spinner } from "../../components/with-spinner/with-spinner";
import CollectionItem from "../../components/collection-item/collection-item";

import "./search.scss";

const SearchPage = (props) => {
    const [searchInputValue, setSearchInputValue] = useState("");
    const [searchItems, setSearchItems] = useState([]);
    const [searchMessage, setSearchMessage] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [currentLoadedPage, setCurrentLoadedPage] = useState(0)
    const [showMoreButton, setShowMoreButton] = useState(false);

    const handleInputChange = (event) => {
        setCurrentLoadedPage(0);
        setSearchMessage("");
        setShowMoreButton(false);
        if(event.target.value) {
            setSearchInputValue(event.target.value)
            setIsSearching(true);
            axios({
                method: "GET",
                url: `${API_URL}/search/?q=${event.target.value}&page=${0}`,
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                if (res.status === 200 && event.target.value) {
                    setSearchItems(res.data.splitedArray)
                    setSearchMessage(`Showing ${res.data.totalQuantity} product results`);
                    setIsSearching(false);
                    setShowMoreButton(res.data.nextPage)
                } else {
                    setIsSearching(false);
                    setSearchItems([])
                    setSearchMessage("Sorry, we couldn’t find any matching results for this search")
                }
            })
            .catch((error) => {
                setIsSearching(false);
                setSearchItems([])
                if(error.response) {
                    setSearchMessage(error.response.data)
                }
            })
        } else if (!event.target.value) {
            setSearchInputValue("")
            setSearchItems([])
        }
    }

    const handleShowMoreData = useCallback((currentLoadedPage) => {
        axios({
            url: `${API_URL}/search/?q=${searchInputValue}&page=${currentLoadedPage}`,
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                setSearchItems(searchItems => searchItems.concat(res.data.splitedArray))
                setIsSearching(false);
                setShowMoreButton(res.data.nextPage)
            } else {
                setIsSearching(false);
            }
        })
        .catch((error) => {
            setIsSearching(false);
            if(error.response) {
                setSearchMessage(error.response.data)
            }
        })
    }, [searchInputValue])

    useEffect(() => {
        if (currentLoadedPage > 0) {
            handleShowMoreData(currentLoadedPage)
        }
    }, [handleShowMoreData, currentLoadedPage])

    // useEffect(() => {
    //     if(searchItems){
    //         setSearchMessage(`Showing ${searchItems.length} product results`);
    //     } else {
    //         setSearchMessage("Sorry, we couldn’t find any matching results for this search")
    //     }
    // }, [searchItems])

    return (
        <div className="search-container" >
            <div className="search-bar" >
                <input 
                    className="search-input" 
                    type="search" 
                    placeholder="Search for products"
                    onChange={handleInputChange} 
                    value={searchInputValue} 
                />
                <button 
                    className="search-close" 
                    onClick={() => props.history.goBack()}
                >
                    Cancel
                </button>
            </div>
            {searchMessage && <h4 className="search-not-found-text" >{searchMessage}</h4>}
            {isSearching ? <Spinner /> : 
            (  
                <div className="search-result" >
                    {searchItems && searchItems.map((item) => {
                        return <CollectionItem key = {item.key} item = {item}/>
                    })}                      
                </div>
            )
            }
            {showMoreButton && 
            <button className="showmore-button" onClick={() => {
                setCurrentLoadedPage(currentLoadedPage => currentLoadedPage + 1)
            }} >Show more</button>
            }
        </div>
    )
}

export default SearchPage;
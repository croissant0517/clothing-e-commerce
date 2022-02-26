import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../cart-icon/cart-icon";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai"
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5"

import CartModal from "../cart-modal/cart-modal";

import { signOutStart } from "../../redux/user/user.action";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import "./header.scss"

import { Link } from "react-router-dom";

const Header = () => {
    const [barsIconClick, setBarsIconClick] = useState(false);
    const [scrollTop, setScrollTop] = useState(true);
    const currentUser = useSelector(selectCurrentUser);
    const hidden = useSelector(selectCartHidden);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const handelBarsIconClick = () => {
        setBarsIconClick(!barsIconClick);
    }

    const handelBarsExtendedBack = () => {
        if(barsIconClick === true) {
            setBarsIconClick(!barsIconClick);
        }
    }

    // 監聽滾動事件
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const isTop = window.scrollY > 0;
            if (isTop) {
                setScrollTop(false);
            } else {
                setScrollTop(true);
            }
        });
        return () => {
            window.removeEventListener('scroll',null);
        };
    }, []);

    return(
        <div>
            <div className = { `${scrollTop ? "" : "shadow-header"} ${barsIconClick ? "extend-header" : ""} header` } >
                <Link className = "logo-container" to = "/" onClick={handelBarsExtendedBack} >
                    OVERFIT
                </Link>
                {barsIconClick ? <IoClose className="header-bars-icon" onClick ={handelBarsIconClick} /> : <FaBars className="header-bars-icon" onClick ={handelBarsIconClick}/>}
                <div className = "options" >
                    <Link 
                        className = "option" 
                        to = "/" 
                        onClick={handelBarsExtendedBack}
                        style={{padding: "10px"}}
                    >
                        HOME
                    </Link>
                    <Link 
                        className = "option" 
                        to = "/shop" 
                        onClick={handelBarsExtendedBack}
                        style={{padding: "10px"}}
                    >
                        SHOP
                    </Link>
                    { 
                        currentUser ? 
                        <div className = "option" style={{padding: "10px"}} onClick = {() => {
                            dispatch(signOutStart(cartItems))
                            handelBarsExtendedBack();
                        } }>
                            SIGN OUT
                        </div>
                        : 
                        <Link className = "option" to = "/signin" style={{padding: "10px"}} onClick={handelBarsExtendedBack}>SIGN IN</Link> 
                    }
                    <Link 
                        className = "option"
                        to = "/search" 
                        onClick={handelBarsExtendedBack}
                    >
                        <IconContext.Provider value={{size: '30px'}}>
                            <AiOutlineSearch/>
                        </IconContext.Provider>
                    </Link>
                    <Link className = "option" to = "/profile" onClick={handelBarsExtendedBack}>
                        <IconContext.Provider value={{size: '30px'}}>
                            <CgProfile />
                        </IconContext.Provider>
                    </Link>
                    <div className = "option" onClick={handelBarsExtendedBack} style={{ marginRight: "20px" }}>
                        <CartIcon value={{size: '40px'}}/>
                    </div>
                </div> 
                {hidden ? null : <CartModal />}
            </div>
            <div className = { `${barsIconClick ? "extend-header-background" : ""}` } onClick={handelBarsExtendedBack}></div>
        </div>
    );
}

export default Header;
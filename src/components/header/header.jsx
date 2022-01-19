import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import CartIcon from "../cart-icon/cart-icon";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";

import CartModal from "../cart-modal/cart-modal";
import SignOutConfirmModal from "../sign-out-confirm-modal/sign-out-confirm-modal";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5"

import "./header.scss"

import { Link } from "react-router-dom";

const Header = () => {
    const [barsIconClick, setBarsIconClick] = useState(false);
    const [signOutClick, setSignOutClick] = useState(false);
    const [scrollTop, setScrollTop] = useState(true);
    const currentUser = useSelector(selectCurrentUser);
    const hidden = useSelector(selectCartHidden);
    

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
                    <Link className = "option" to = "/" onClick={handelBarsExtendedBack}>
                        HOME
                    </Link>
                    <Link className = "option" to = "/shop" onClick={handelBarsExtendedBack}>
                        SHOP
                    </Link>
                    { 
                        currentUser ? 
                        <div className = "option" onClick = {() => {
                        setSignOutClick(true)
                        // dispatch(signOutStart())
                        handelBarsExtendedBack();
                        } }>SIGN OUT</div>
                        : 
                        <Link className = "option" to = "/signin" onClick={handelBarsExtendedBack}>SIGN IN</Link> 
                    }
                    <Link className = "option" to = "/profile" onClick={handelBarsExtendedBack}>
                        <IconContext.Provider value={scrollTop ? { color: '#1c1d1f', size: '40px' } : { color: 'white', size: '40px' }}>
                            <div className = "profile-icon" >
                                <CgProfile />
                            </div>
                        </IconContext.Provider>
                    </Link>
                    <div className = "option" onClick={handelBarsExtendedBack}>
                        <CartIcon ChangColor = { scrollTop ? true : false } />
                    </div>
                </div> 
                {hidden ? null : <CartModal />}
                {signOutClick && <SignOutConfirmModal CloseModal={() => setSignOutClick(false)}/>}
            </div>
            <div className = { `${barsIconClick ? "extend-header-background" : ""}` } onClick={handelBarsExtendedBack}></div>
        </div>
    );
}

export default Header;
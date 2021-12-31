import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CartIcon from "../cart-icon/cart-icon";
import CartModal from "../cart-modal/cart-modal";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5"

import "./header.scss"

import { Link } from "react-router-dom";
import { signOutStart } from "../../redux/user/user.action";

const Header = (props) => {
    const [barsIconClick, setBarsIconClick] = useState(false);
    const [scrollTop, setScrollTop] = useState(true);

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
                    OUTFIT
                </Link>
                {barsIconClick ? <IoClose className="header-bars-icon" onClick ={handelBarsIconClick} /> : <FaBars className="header-bars-icon" onClick ={handelBarsIconClick}/>}
                <div className = "options" >
                    {props.currentUser ? <div className="option" >{`Hi! ${props.currentUser.displayName}`}</div> : null}
                    <Link className = "option" to = "/" onClick={handelBarsExtendedBack}>
                        HOME
                    </Link>
                    <Link className = "option" to = "/shop" onClick={handelBarsExtendedBack}>
                        SHOP
                    </Link>
                    { 
                        props.currentUser ? 
                        <div className = "option" onClick = {() => {
                        props.handleSignOutStart();
                        handelBarsExtendedBack();
                        } }>SIGN OUT</div>
                        : 
                        <Link className = "option" to = "/signin" onClick={handelBarsExtendedBack}>SIGN IN</Link> 
                    }
                    <div className = "cart-icon" onClick={handelBarsExtendedBack}>
                        <CartIcon ChangColor = { scrollTop ? true : false } />
                    </div>
                </div> 
                {props.hidden ? null : <CartModal />}
            </div>
            <div className = { `${barsIconClick ? "extend-header-background" : ""}` } onClick={handelBarsExtendedBack}></div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = (dispatch) => ({
    handleSignOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
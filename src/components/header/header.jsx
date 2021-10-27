import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import logo  from "../../assets/logo.png"

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./header.scss"

import { auth } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";

const Header = (props) => {

    // 將用戶登出
    const handleSignOut = () => {
        auth.signOut()
    }

    return(
        <div className = "header" >
            <Link className = "logo-container" to = "/" >
                <img src = {logo} alt = "logo" />
            </Link>
            <div className = "options" >
                <Link className = "option" to = "/" >
                    HOME
                </Link>
                <Link className = "option" to = "/shop" >
                    SHOP
                </Link>
                { 
                    props.currentUser ? 
                    <div className = "option" onClick = {handleSignOut} >SIGN OUT</div>
                    : 
                    <Link className = "option" to = "/signin" >SIGN IN</Link> 
                }
                <CartIcon/>
            </div>
            {props.hidden ? null : <CartDropdown />}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
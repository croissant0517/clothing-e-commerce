import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg"
import "./header.scss";

import { auth } from "../../firebase/firebase.utils";

const Header = (props) => {

    // 將用戶登出
    const handleSignOut = () => {
        auth.signOut()
    }

    return(
        <div className = "header" >
            <Link className = "logo-container" to = "/" >
                <Logo className = "logo" />
            </Link>
            <div className = "options" >
                <Link className = "option" to = "/" >
                    HOME
                </Link>
                <Link className = "option" to = "/shop" >
                    SHOP
                </Link>
                <Link className = "option" to = "/shop" >
                    CONTACT
                </Link>
                { 
                    props.currentUser ? 
                    <div className = "option" onClick = {handleSignOut} >SIGN OUT</div>
                    : 
                    <Link className = "option" to = "/signin" >SIGN IN</Link> 
                }
            </div>
        </div>
    );
}

export default Header;
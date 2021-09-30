import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-icon.scss";

const CartIcon = (props) => {
    return (
        <div className = "cart-icon" onClick = {props.handleToggleCartHidden} >
            <ShoppingIcon className = "shopping-icon" />
            <span className = "item-count" >0</span>      
        </div>
    );    
}

const mapDispatchToProps = (dispatch) => {
    return ({
      handleToggleCartHidden: () => dispatch(toggleCartHidden()) 
    });
  }

export default connect(null, mapDispatchToProps)(CartIcon);
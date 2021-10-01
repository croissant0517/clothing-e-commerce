import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-icon.scss";

const CartIcon = (props) => {
    return (
        <div className = "cart-icon" onClick = {props.handleToggleCartHidden} >
            <ShoppingIcon className = "shopping-icon" />
            <span className = "item-count" >{props.itemCount}</span>      
        </div>
    );    
}

const mapStateToProps = (state) => {
  return ({
    // acc為計數器，將每一次加總的分數做累計，0為acc之初始值
    itemCount: state.cart.cartItems.reduce((acc, cartItem) => {
      return (acc + cartItem.quantity);
    },0)
  });
}

const mapDispatchToProps = (dispatch) => {
    return ({
      handleToggleCartHidden: () => dispatch(toggleCartHidden()) 
    });
  }

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
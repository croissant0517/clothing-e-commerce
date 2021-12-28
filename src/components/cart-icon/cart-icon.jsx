import React from "react";
import { GiShoppingBag } from "react-icons/gi";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-icon.scss";

const CartIcon = (props) => {
  return (
      <div className = "cart-icon" onClick = {props.handleToggleCartHidden} >
        <IconContext.Provider value={props.ChangColor ? { color: '#1c1d1f', size: '50px' } : { color: 'white', size: '50px' }}>
          <div>
            <GiShoppingBag />
          </div>
        </IconContext.Provider>
        <span className = { `${props.ChangColor ? "" : "shadow-item-count"} item-count` } >{props.itemCount}</span>    
      </div>
  );    
}

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
})

const mapDispatchToProps = (dispatch) => {
  return ({
    handleToggleCartHidden: () => dispatch(toggleCartHidden()) 
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
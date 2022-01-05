import React from "react";
import { GiShoppingBag } from "react-icons/gi";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-icon.scss";

const CartIcon = (props) => {
  const itemCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();

  return (
      <div className = "cart-icon" onClick = {() => dispatch(toggleCartHidden())} >
        <IconContext.Provider value={props.ChangColor ? { color: '#1c1d1f', size: '45px' } : { color: 'white', size: '45px' }}>
          <div>
            <GiShoppingBag />
          </div>
        </IconContext.Provider>
        <span className = { `${props.ChangColor ? "" : "shadow-item-count"} item-count` } >{itemCount}</span>    
      </div>
  );    
}

export default CartIcon;
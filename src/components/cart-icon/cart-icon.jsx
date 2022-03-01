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
      <div className = "cart-icon-container" onClick = {() => dispatch(toggleCartHidden())}>
        <IconContext.Provider value={props.value}>
          <div>
            <GiShoppingBag />
          </div>
        </IconContext.Provider>
        <span className = "item-count" >{itemCount}</span>    
      </div>
  );    
}

export default CartIcon;
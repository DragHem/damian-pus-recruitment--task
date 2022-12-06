import React, { Component } from "react";
import { v4 as uuid } from "uuid";

import styles from "./Cart.module.scss";
import CartContext from "../../stores/CartContext";
import CartItem from "./CartItem/CartItem";

class Cart extends Component {
  static contextType = CartContext;

  render() {
    document.title = "ShopLand - Chart";

    const { items, itemsCount, activeCurrency, order, tax, totalValue } =
      this.context;

    if (!itemsCount)
      return (
        <div className={styles["cart-container"]}>
          <h3 className={styles["cart-title"]}>Chart</h3>
          <p>Add something to cart...</p>
        </div>
      );

    return (
      <div className={styles["cart-container"]}>
        <h3 className={styles["cart-title"]}>Chart</h3>

        <div className={styles["cart-items"]}>
          {items.map((item, index) => (
            <CartItem key={uuid()} {...item} productIndex={index} />
          ))}
        </div>

        <div className={styles["cart-summary"]}>
          <div>
            <p>Tax 21%:</p>
            <p>Quantity:</p>
            <p>Total:</p>
          </div>
          <div className={styles["cart-summary-values"]}>
            <p>
              {activeCurrency && activeCurrency.symbol}
              {tax}
            </p>
            <p>{itemsCount}</p>
            <p>
              {activeCurrency && activeCurrency.symbol}
              {totalValue}
            </p>
          </div>
        </div>

        <button className={styles["order-btn"]} onClick={order}>
          Order
        </button>
      </div>
    );
  }
}

export default Cart;

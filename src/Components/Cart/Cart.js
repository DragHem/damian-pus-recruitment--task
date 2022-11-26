import React, { Component } from "react";
import { v4 as uuid } from "uuid";

import styles from "./Cart.module.scss";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";

class Cart extends Component {
  static contextType = CartContext;

  countTotalValueAndTax(items, activeCurrency) {
    const totalValue = items
      .map(({ prices, quantity }) =>
        prices.map((price) => ({
          ...price,
          amount: Number(price.amount * quantity),
        }))
      )
      .flat()
      .filter((price) => price.currency.label === activeCurrency.label)
      .reduce((prev, curr) => prev + curr.amount, 0)
      .toFixed(2);

    const tax = (totalValue * 0.21).toFixed(2);

    return { totalValue, tax };
  }

  render() {
    const { items, itemsCount, activeCurrency, order } = this.context;

    const { totalValue, tax } = this.countTotalValueAndTax(
      items,
      activeCurrency
    );

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

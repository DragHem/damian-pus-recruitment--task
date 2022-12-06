import React, { Component } from "react";

import styles from "./CartBox.module.scss";
import { withRouter } from "react-router-dom";
import CartContext from "../../../stores/CartContext";
import CartItem from "../../Cart/CartItem/CartItem";

class CartBox extends Component {
  static contextType = CartContext;

  render() {
    const {
      items,
      itemsCount,
      order,
      totalValue,
      activeCurrency,
      toggleChartIsOpen,
    } = this.context;

    const { history } = this.props;

    return (
      <div className={styles["cart-box"]}>
        <h3>
          My Bag,
          <span>
            {itemsCount} {itemsCount === 1 ? "item" : "items"}
          </span>
        </h3>
        <div className={styles["cart-box-items"]}>
          {items.map((item, index) => (
            <CartItem {...item} productIndex={index} key={index} cartBox />
          ))}
        </div>

        {!itemsCount && (
          <p className={styles["cart-box-empty-text"]}>Your bag is empty...</p>
        )}

        {!!itemsCount && (
          <div className={styles["cart-box-description"]}>
            <p>Total</p>
            <p>
              {activeCurrency.symbol}
              {totalValue}
            </p>
          </div>
        )}

        <div className={styles["cart-box-buttons"]}>
          <button
            onClick={() => {
              history.push("/cart");
              toggleChartIsOpen();
            }}
          >
            View Bag
          </button>
          <button
            className={styles.primary}
            disabled={!itemsCount}
            onClick={order}
          >
            Check out
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(CartBox);

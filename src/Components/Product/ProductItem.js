import React, { Component } from "react";

import styles from "./ProductItem.module.scss";
import ChartIcon from "../Nav/ChartIcon";
import { withRouter } from "react-router-dom";
import CartContext from "../../Store/CartContext";

class ProductItem extends Component {
  static contextType = CartContext;

  log(event) {
    event.stopPropagation();
    console.log("Siema");
  }

  render() {
    const { history, prices, name, gallery, inStock, id } = this.props;
    const label = this.context.activeCurrency?.label;

    let price;

    const [filteredPrice] = prices.filter(
      (price) => price.currency.label === label
    );

    price = filteredPrice;

    return (
      <div
        className={styles["product-item"]}
        onClick={() => history.push(`/product/${id}`)}
      >
        <div className={styles["image-container"]}>
          <img
            src={gallery[0]}
            alt={name}
            className={`${inStock ? "" : styles["out-of-stock"]}`}
            loading="lazy"
          />
          {!inStock && <p>Out of stock</p>}
          {inStock && (
            <button onClick={this.log}>
              <ChartIcon />
            </button>
          )}
        </div>
        <div className={styles["product-item--title"]}>
          <h4>{name}</h4>
          {price && (
            <p>
              {price.currency.symbol} {price.amount}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ProductItem);

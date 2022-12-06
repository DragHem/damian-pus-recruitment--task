import React, { Component } from "react";

import styles from "./ProductItem.module.scss";
import CartIcon from "../../Nav/CartIcon/CartIcon";
import { withRouter } from "react-router-dom";
import CartContext from "../../../stores/CartContext";

class ProductItem extends Component {
  state = {};
  static contextType = CartContext;

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      activeImg: this.props.product.gallery[0],
    }));
  }

  addToCartHandler(e, product) {
    e.stopPropagation();

    this.context.addToCart({
      ...product,
      productState: this.state,
    });
  }

  render() {
    const { prices, name, gallery, inStock, id, brand, attributes } =
      this.props.product;

    const { history } = this.props;
    const label = this.context.activeCurrency?.label;

    const [price] = prices.filter((price) => price.currency.label === label);

    const productToAdd = {
      id,
      brand,
      name,
      prices,
      attributes,
      gallery,
      quantity: 0,
    };

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
          />
          {!inStock && <p>Out of stock</p>}
          {inStock && attributes.length === 0 && (
            <button onClick={(e) => this.addToCartHandler(e, productToAdd)}>
              <CartIcon />
            </button>
          )}
        </div>
        <div className={styles["product-item--title"]}>
          <h4>{`${brand} ${name}`}</h4>
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

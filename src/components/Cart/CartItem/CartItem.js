import React, { Component } from "react";

import styles from "./CartItem.module.scss";
import ProductAttributes from "../../product/ProductAttributes/ProductAttributes";
import CartContext from "../../../stores/CartContext";

class CartItem extends Component {
  state = {
    imgIndex: 0,
  };

  static contextType = CartContext;

  price(prices, activeCurrency) {
    const [price] = prices.filter(
      (price) => price.currency.label === activeCurrency.label
    );

    return price.amount;
  }

  changeImgHandler(type) {
    const { gallery } = this.props;

    switch (type) {
      case "forward":
        this.setState((state) => ({
          imgIndex:
            state.imgIndex === gallery.length - 1 ? 0 : state.imgIndex + 1,
        }));
        break;

      case "backward":
        this.setState((state) => ({
          imgIndex:
            state.imgIndex === 0 ? gallery.length - 1 : state.imgIndex - 1,
        }));
        break;

      default:
        break;
    }
  }

  render() {
    const {
      id,
      brand,
      name,
      attributes,
      productState,
      prices,
      quantity,
      productIndex,
      gallery,
      cartBox,
    } = this.props;

    const { activeCurrency, updateProduct, updateQuantity } = this.context;

    return (
      <div className={styles["cart-item"]}>
        <div className={styles["cart-item-description"]}>
          <h3 className={styles["cart-item-brand"]}>{brand}</h3>
          <h3 className={styles["cart-item-name"]}>{name}</h3>
          <p>
            {activeCurrency.symbol}
            {this.price(prices, activeCurrency)}
          </p>
          <ProductAttributes
            index={productIndex}
            productId={id}
            attributes={attributes}
            updateAttrHandler={updateProduct}
            productState={productState}
            cartBox={cartBox}
          />
        </div>

        <div className={styles["group"]}>
          <div className={styles["cart-buttons"]}>
            <button onClick={() => updateQuantity("add", productIndex)}>
              +
            </button>
            <p>{quantity}</p>
            <button onClick={() => updateQuantity("remove", productIndex)}>
              -
            </button>
          </div>

          <div className={styles["cart-image"]}>
            <img src={gallery[this.state.imgIndex]} alt={name} />
            {!cartBox && (
              <div className={styles["cart-image-buttons"]}>
                <button onClick={() => this.changeImgHandler("forward")}>
                  &lt;
                </button>
                <button onClick={() => this.changeImgHandler("backward")}>
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;

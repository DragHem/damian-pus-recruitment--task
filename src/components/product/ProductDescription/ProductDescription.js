import React, { Component } from "react";

import parse from "html-react-parser";

import styles from "./ProductDescription.module.scss";

import { PRODUCT_QUERY } from "../../../utils/queries";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import CartContext from "../../../stores/CartContext";
import { withQuery } from "../../HOC/withQuery";

class ProductDescription extends Component {
  state = {};

  static contextType = CartContext;

  updateImg(imgUrl) {
    this.setState((state) => ({ ...state, activeImg: imgUrl }));
  }

  updateAttr(attr, value) {
    this.setState((state) => ({ ...state, [attr]: value }));
  }

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      activeImg: this.props.data.product.gallery[0],
    }));

    const attributes = this.props.data.product.attributes;

    for (const attribute of attributes) {
      this.setState((state) => ({
        ...state,

        [attribute.id]: null,
      }));
    }
  }

  render() {
    const {
      id,
      name,
      description,
      gallery,
      brand,
      attributes,
      prices,
      inStock,
    } = this.props.data.product;

    const productToAdd = {
      id,
      brand,
      name,
      prices,
      attributes,
      gallery,
      quantity: 0,
    };

    const { activeImg } = this.state;

    const label = this.context.activeCurrency?.label;

    const [price] = prices.filter((price) => price.currency.label === label);

    const { addToCart } = this.context;

    const disableButton = !Object.values(this.state).includes(null) && inStock;

    document.title = `ShopLand - ${name}`;

    return (
      <div className={styles["product-description-container"]}>
        <div className={styles["product-images-container"]}>
          <div className={styles["product-images"]}>
            {gallery.map((image, index) => (
              <img
                src={image}
                alt={name}
                key={index}
                onClick={() => this.updateImg(image)}
              />
            ))}
          </div>
          <div className={styles["product-main-image"]}>
            <img src={activeImg} alt={name} />
          </div>
        </div>

        <div className={styles["product-description"]}>
          <h3 className={styles["product-brand"]}>{brand}</h3>
          <h3 className={styles["product-name"]}>{name}</h3>

          <ProductAttributes
            productId={productToAdd.id}
            attributes={attributes}
            updateAttrHandler={this.updateAttr.bind(this)}
            productState={this.state}
          />

          <h3 className={styles["product-price"]}>Price:</h3>
          <h3 className={styles["product-price"]}>
            {price && price.currency.symbol} {price && price.amount}
          </h3>

          <button
            disabled={!disableButton}
            onClick={() =>
              addToCart({
                ...productToAdd,
                productState: this.state,
              })
            }
          >
            Add to cart
          </button>

          {parse(description)}
        </div>
      </div>
    );
  }
}

export default withQuery(ProductDescription, PRODUCT_QUERY);

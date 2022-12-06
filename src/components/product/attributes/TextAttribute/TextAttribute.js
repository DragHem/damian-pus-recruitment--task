import React, { Component } from "react";
import styles from "../../ProductAttributes/ProductAttribute.module.scss";

class TextAttribute extends Component {
  render() {
    const {
      attrItem,
      productState,
      updateAttrHandler,
      attrId,
      index,
      cartBox,
    } = this.props;

    return (
      <div
        className={`${styles["attribute-box"]} ${
          cartBox ? styles["attribute-cart-box"] : ""
        } ${productState[attrId] === attrItem.value ? styles["active"] : ""}`}
        onClick={() => updateAttrHandler(attrId, attrItem.value, index)}
      >
        {attrItem.value}
      </div>
    );
  }
}

export default TextAttribute;

import React, { Component } from "react";
import styles from "../../ProductAttributes/ProductAttribute.module.scss";

class ColorAttribute extends Component {
  render() {
    const {
      attrItem,
      productState,
      attrId,
      updateAttrHandler,
      attrName,
      index,
    } = this.props;

    return (
      <div
        className={`${styles["attribute-color"]} ${
          productState[attrId] === attrItem.value ? styles["active"] : ""
        }`}
        style={{ backgroundColor: attrItem.value }}
        onClick={() => updateAttrHandler(attrName, attrItem.value, index)}
      />
    );
  }
}

export default ColorAttribute;

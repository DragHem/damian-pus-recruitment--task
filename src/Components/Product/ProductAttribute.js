import React, { Component } from "react";
import styles from "./ProductAttribute.module.scss";

class ProductAttribute extends Component {
  render() {
    const { attributes, updateAttrHandler, productState, index } = this.props;

    return (
      <div className={styles["product-attributes-container"]}>
        {attributes.map(({ id, name, type, items: attrItems }) => (
          <div key={id}>
            <h3 className={styles["attribute-title"]}>{name}:</h3>
            <div className={styles["attribute-values"]}>
              {attrItems.map((attrItem) => {
                if (type === "swatch") {
                  return (
                    <div
                      key={attrItem.id}
                      className={`${styles["attribute-color"]} ${
                        productState[id] === attrItem.value
                          ? styles["active"]
                          : null
                      }`}
                      style={{ backgroundColor: attrItem.value }}
                      onClick={() =>
                        updateAttrHandler(name, attrItem.value, index)
                      }
                    />
                  );
                } else {
                  return (
                    <div
                      key={attrItem.id}
                      className={`${styles["attribute-box"]} ${
                        productState[id] === attrItem.value
                          ? styles["active"]
                          : null
                      }`}
                      onClick={() =>
                        updateAttrHandler(id, attrItem.value, index)
                      }
                    >
                      {attrItem.value}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttribute;

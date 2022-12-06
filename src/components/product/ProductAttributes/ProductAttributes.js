import React, { Component } from "react";
import styles from "./ProductAttribute.module.scss";
import ColorAttribute from "../attributes/ColorAttribute/ColorAttribute";
import TextAttribute from "../attributes/TextAttribute/TextAttribute";

class ProductAttributes extends Component {
  render() {
    const { attributes, updateAttrHandler, productState, index, cartBox } =
      this.props;

    return (
      <div className={styles["product-attributes-container"]}>
        {attributes.map(({ id, name, type, items: attrItems }) => (
          <div key={id}>
            <h3 className={`${cartBox ? styles["attribute-title"] : ""}`}>
              {name}:
            </h3>
            <div className={styles["attribute-values"]}>
              {attrItems.map((attrItem) => {
                switch (type) {
                  case "swatch":
                    return (
                      <ColorAttribute
                        key={attrItem.id}
                        attrItem={attrItem}
                        productState={productState}
                        attrId={id}
                        updateAttrHandler={updateAttrHandler}
                        attrName={name}
                        index={index}
                      />
                    );

                  case "text":
                    return (
                      <TextAttribute
                        key={attrItem.id}
                        attrItem={attrItem}
                        productState={productState}
                        attrId={id}
                        updateAttrHandler={updateAttrHandler}
                        index={index}
                        cartBox={cartBox}
                      />
                    );

                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;

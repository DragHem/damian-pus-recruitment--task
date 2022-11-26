import React, { Component } from "react";

import ProductItem from "./ProductItem";

import styles from "./ProductList.module.scss";

import { withRouter } from "react-router-dom";
import { withQuery } from "../HOC/withQuery";
import { PRODUCT_CATEGORY_QUERY } from "../../utils/queries";

class ProductList extends Component {
  render() {
    const { category } = this.props.data;

    const productList = category.products.map((product) => (
      <ProductItem key={product.id} {...product} />
    ));

    return (
      <div className={styles["product-wrapper"]}>
        <h2>{category.name}</h2>

        <div className={styles["product-list"]}>{productList}</div>
      </div>
    );
  }
}

export default withQuery(withRouter(ProductList), PRODUCT_CATEGORY_QUERY);

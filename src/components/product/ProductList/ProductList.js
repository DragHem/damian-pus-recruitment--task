import React, { Component } from "react";

import ProductItem from "../ProductItem/ProductItem";

import styles from "./ProductList.module.scss";

import { withRouter } from "react-router-dom";
import { withQuery } from "../../HOC/withQuery";
import { PRODUCT_CATEGORY_QUERY } from "../../../utils/queries";

class ProductList extends Component {
  render() {
    const { categoryName } = this.props.match.params;
    let title = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    document.title = `ShopLand - ${title} products`;

    const { error } = this.props;

    if (error)
      return (
        <ul>
          <li>Can not load categories from server...</li>
        </ul>
      );

    const { category } = this.props.data;

    const productList = category.products.map((product) => (
      <ProductItem key={product.id} product={product} />
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

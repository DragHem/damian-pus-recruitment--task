import React, { Component } from "react";

import styles from "../Nav.module.scss";
import { NavLink } from "react-router-dom";

import { CATEGORIES_QUERY } from "../../../utils/queries";
import { withQuery } from "../../HOC/withQuery";

class CategoryList extends Component {
  render() {
    const { error } = this.props;
    const { categories } = this.props.data;

    if (error)
      return (
        <ul>
          <li>Can not load categories from server...</li>
        </ul>
      );

    return (
      <ul className={styles.categories}>
        {categories.map((category) => (
          <li key={`${category.__typename + category.name}`}>
            <NavLink
              to={`/category/${category.name}`}
              className={(isActive) => (isActive ? styles.active : "")}
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

export default withQuery(CategoryList, CATEGORIES_QUERY);

import React, { Component } from "react";

import Logo from "../../Assets/Icons/logo.svg";

import styles from "./Nav.module.scss";

import ChartIcon from "./ChartIcon";
import CurrencySwitcher from "./CurrencySwitcher";
import CategoryList from "./CategoryList";
import CartContext from "../../Store/CartContext";
import { withQuery } from "../HOC/withQuery";
import { CURRENCIES_QUERY } from "../../utils/queries";

class Nav extends Component {
  static contextType = CartContext;

  render() {
    const { currencies } = this.props.data;

    const { itemsCount } = this.context;

    return (
      <header className={styles["main-header"]}>
        <nav>
          <CategoryList />

          <div>
            <img src={Logo} alt="Shop Logo" />
          </div>

          <div className={styles["currency-chart-container"]}>
            <CurrencySwitcher currencies={currencies} />
            <ChartIcon
              chartCount={itemsCount}
              className={itemsCount ? styles["chart-indicator"] : null}
            />
          </div>
        </nav>
      </header>
    );
  }
}

export default withQuery(Nav, CURRENCIES_QUERY);

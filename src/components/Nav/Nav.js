import React, { Component } from "react";

import Logo from "../../assets/Icons/logo.svg";

import styles from "./Nav.module.scss";

import CartIcon from "./CartIcon/CartIcon";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";
import CategoryList from "./CategoryList/CategoryList";
import CartContext from "../../stores/CartContext";
import { withQuery } from "../HOC/withQuery";
import { CURRENCIES_QUERY } from "../../utils/queries";
import CartBox from "./CartBox/CartBox";

class Nav extends Component {
  static contextType = CartContext;

  render() {
    const { currencies } = this.props.data;

    const { itemsCount, toggleChartIsOpen, chartIsOpen } = this.context;

    return (
      <>
        <header className={styles["main-header"]}>
          <nav>
            <CategoryList />

            <div>
              <img src={Logo} alt="Shop Logo" />
            </div>

            <div className={styles["currency-chart-container"]}>
              <CurrencySwitcher currencies={currencies} />

              <div onClick={toggleChartIsOpen}>
                <CartIcon
                  chartCount={itemsCount}
                  className={itemsCount ? styles["chart-indicator"] : ""}
                  onClick={toggleChartIsOpen}
                />
              </div>

              {chartIsOpen && <CartBox />}
            </div>
          </nav>
        </header>
      </>
    );
  }
}

export default withQuery(Nav, CURRENCIES_QUERY);

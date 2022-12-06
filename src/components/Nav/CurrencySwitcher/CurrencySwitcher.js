import React, { Component } from "react";

import styles from "./CurrencySwitcher.module.scss";
import Arrow from "../../../assets/Icons/Arrow.svg";
import CartContext from "../../../stores/CartContext";

class CurrencySwitcher extends Component {
  static contextType = CartContext;

  componentDidMount() {
    const { setCurrency, activeCurrency } = this.context;

    const { currencies } = this.props;

    if (!activeCurrency) {
      setCurrency(currencies[0]);
    }
  }

  render() {
    const { setCurrency } = this.context;

    const { currencies } = this.props;

    const symbol = this.context.activeCurrency?.symbol;

    if (!symbol) return;

    return (
      <div className={styles.currency}>
        <span className={styles["currency-box"]}>
          {symbol}
          <img src={Arrow} alt="" />
        </span>
        <div className={styles["currency-list"]}>
          <ul>
            {currencies.map((currency) => (
              <li
                key={currency.label}
                onClick={() => setCurrency(currency)}
                className={`${
                  symbol === currency.symbol ? styles["active-currency"] : ""
                } `}
              >
                {currency.symbol} {currency.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default CurrencySwitcher;

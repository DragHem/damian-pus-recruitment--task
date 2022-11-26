import React, { Component } from "react";

import styles from "./CurrencySwitcher.module.scss";
import Arrow from "../../Assets/Icons/Arrow.svg";
import CartContext from "../../Store/CartContext";

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

    const symbol = this?.context?.activeCurrency?.symbol;

    return (
      <div className={styles.currency}>
        <span>
          {symbol}
          <img src={Arrow} alt="" />
        </span>
        <div className={styles["currency-list"]}>
          <ul>
            {currencies.map((currency) => (
              <li key={currency.label} onClick={() => setCurrency(currency)}>
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

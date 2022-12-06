import React, { Component } from "react";
import { createPortal } from "react-dom";

import styles from "./Backdrop.module.scss";
import CartContext from "../stores/CartContext";

class Backdrop extends Component {
  static contextType = CartContext;

  render() {
    return createPortal(
      <div
        className={styles.backdrop}
        onClick={this.context.toggleChartIsOpen}
      />,
      document.getElementById("overlay")
    );
  }
}

export default Backdrop;

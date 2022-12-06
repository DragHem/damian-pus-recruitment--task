import React, { Component } from "react";

const CartContext = React.createContext({});

class CartProvider extends Component {
  state = {
    items: [],
    itemsCount: 0,
    activeCurrency: null,
    chartIsOpen: false,
    totalValue: 0,
    tax: 0,
  };

  countTotalValueAndTax() {
    const { items, activeCurrency } = this.state;

    const totalValue = items
      .map(({ prices, quantity }) =>
        prices.map((price) => ({
          ...price,
          amount: Number(price.amount * quantity),
        }))
      )
      .flat()
      .filter((price) => price.currency.label === activeCurrency.label)
      .reduce((prev, curr) => prev + curr.amount, 0)
      .toFixed(2);

    const tax = (totalValue * 0.21).toFixed(2);

    this.setState((prevState) => ({
      ...prevState,
      totalValue: totalValue,
      tax: tax,
    }));
  }

  toggleChartIsOpen() {
    this.setState((state) => ({ ...state, chartIsOpen: !state.chartIsOpen }));
  }

  updateProduct(attr, value, productIndex) {
    const items = [...this.state.items];

    items[productIndex].productState[attr] = value;

    this.setState((state) => ({ ...state, items }));
  }

  updateQuantity(type, productIndex) {
    switch (type) {
      case "add":
        {
          const newState = { ...this.state };
          newState.itemsCount += 1;
          newState.items[productIndex].quantity += 1;

          this.setState({ ...newState });
        }
        break;
      case "remove":
        {
          if (this.state.items[productIndex].quantity === 1) {
            const newState = { ...this.state };
            newState.itemsCount--;

            newState.items.splice(productIndex, 1);
            this.setState({ ...newState });
            return;
          }

          const newState = { ...this.state };
          newState.itemsCount -= 1;
          newState.items[productIndex].quantity -= 1;

          this.setState({ ...newState });
        }
        break;
      default:
        break;
    }

    this.countTotalValueAndTax();
  }

  addToCart(item) {
    const newState = { ...this.state };

    const itemExistsId = this.state.items.find(
      (product) =>
        product.id === item.id &&
        JSON.stringify(product.productState) ===
          JSON.stringify(item.productState)
    );

    if (itemExistsId) {
      itemExistsId.quantity += 1;
      newState.itemsCount += 1;
    } else {
      item.quantity += 1;
      newState.items.push(item);
      newState.itemsCount += 1;
    }

    this.setState((state) => ({ ...state, ...newState }));

    this.countTotalValueAndTax();
  }

  order() {
    this.setState((state) => ({
      ...state,
      items: [],
      itemsCount: 0,
      tax: 0,
      totalValue: 0,
    }));
  }

  setCurrency(currency) {
    this.setState((state) => ({ ...state, activeCurrency: currency }));
  }

  saveToLocalStorage() {
    localStorage.setItem("context", JSON.stringify(this.state));
  }

  loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem("context"));
  }

  componentDidMount() {
    const localState = this.loadFromLocalStorage();
    this.setState((state) => ({ ...state, ...localState }));
  }

  componentDidUpdate() {
    this.saveToLocalStorage();
  }

  render() {
    const { children } = this.props;
    const { items, itemsCount, activeCurrency, chartIsOpen, tax, totalValue } =
      this.state;
    const {
      setCurrency,
      addToCart,
      updateProduct,
      updateQuantity,
      order,
      toggleChartIsOpen,
    } = this;

    return (
      <CartContext.Provider
        value={{
          items,
          itemsCount,
          activeCurrency,
          setCurrency: setCurrency.bind(this),
          addToCart: addToCart.bind(this),
          updateProduct: updateProduct.bind(this),
          updateQuantity: updateQuantity.bind(this),
          order: order.bind(this),
          toggleChartIsOpen: toggleChartIsOpen.bind(this),
          chartIsOpen,
          tax,
          totalValue,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;

export { CartProvider };

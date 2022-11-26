import React, { Component } from "react";

const CartContext = React.createContext({});

class ChartProvider extends Component {
  state = {
    items: [],
    itemsCount: 0,
    activeCurrency: null,
    chartIsOpen: false,
  };

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
        console.log("Siema");
        break;
    }
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
  }

  order() {
    this.setState((state) => ({ ...state, items: [], itemsCount: 0 }));
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.saveToLocalStorage();
  }

  render() {
    const { children } = this.props;
    const { items, itemsCount, activeCurrency } = this.state;
    const { setCurrency, addToCart, updateProduct, updateQuantity, order } =
      this;

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
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;

export { ChartProvider };

import React, { Component } from "react";

import Nav from "./components/Nav/Nav";
import ProductList from "./components/product/ProductList/ProductList";
import ProductDescription from "./components/product/ProductDescription/ProductDescription";
import Cart from "./components/Cart/Cart";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { ROUTES } from "./utils/routes";
import NotFoundPage from "./components/pages/404";
import CartContext from "./stores/CartContext";
import Backdrop from "./ui/Backdrop";

class App extends Component {
  static contextType = CartContext;

  render() {
    const { chartIsOpen } = this.context;

    chartIsOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");

    return (
      <Router>
        {chartIsOpen && <Backdrop />}
        <Nav />

        <Switch>
          <Route path={ROUTES.cart}>
            <Cart />
          </Route>

          <Route path={ROUTES.category}>
            <ProductList />
          </Route>

          <Route path={ROUTES.home} exact>
            <Redirect to={ROUTES.redirectToCategory} />
          </Route>

          <Route path={ROUTES.product}>
            <ProductDescription />
          </Route>

          <NotFoundPage />
        </Switch>
      </Router>
    );
  }
}

export default App;

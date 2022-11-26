import React from "react";

import Nav from "./Components/Nav/Nav";
import ProductList from "./Components/Product/ProductList";
import ProductDescription from "./Components/Product/ProductDescription";
import Cart from "./Components/Cart/Cart";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { ROUTES } from "./utils/routes";

function App() {
  return (
    <>
      <Router>
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

          <Route path={ROUTES.notFound} exact>
            <div className="not-found">
              <h2>Site not found...</h2>
              <p>Chose correct category!</p>
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

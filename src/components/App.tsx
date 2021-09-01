import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Customer from './Customer';
import Product from './Product'
import Invoice from './Invoice'
const App = () => (
  <BrowserRouter>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/customers" component={Customer}/>
          <Route path="/products" component={Product}/>
          <Route path="/invoices" component={Invoice}/>
        </Switch>
      </div>
    </BrowserRouter>
)

export default App;

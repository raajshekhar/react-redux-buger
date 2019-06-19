import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route extact path="/checkout" component={ Checkout } />
            <Route extact path="/orders" component={ Orders } />
            <Route extact path="/" component={ BurgerBuilder } />
          </Switch>
        </Layout>
      </div>
    )
  }
}


export default App;

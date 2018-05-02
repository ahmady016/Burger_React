import React from 'react';
import { render } from 'react-dom';
import './../index.css';
import App from './../App/App';

class AppState {
  _price = 0.00

  ingredients = {
    salad: 0.50,
    beef: 2.50,
    tuna: 2.00,
    mayonnaise: 1.00,
    mushroom: 1.50,
    feta: 0.75,
    cheddar: 1.25,
    lamb: 3.50,
    mozzarella: 1.50,
    chicken: 1.50,
    roquefort: 1.75
  };
  order = {};

  reset = () => {
    this.order = {};
    render(<App />, document.getElementById('root'));
  }

  _setTotalPrice = () => {
    this.order.totalPrice = Object.keys(this.order)
                              .filter(key => key !== 'totalPrice')
                              .map(key => +this.order[key].total)
                              .reduce( (total,subTotal) => total+subTotal,0);
  }

  setOrder = (key, val) => {
    this._price = this.ingredients[key];
    if (!this.order[key]) {
      this.order[key] = {
        price: this._price,
        quantity: val,
        total: Number(val * this._price).toFixed(2)
      }
    } else {
      this.order[key].quantity += val;
      if (this.order[key].quantity)
        this.order[key].total = Number(this.order[key].quantity * this._price).toFixed(2);
      else
        delete this.order[key];
    }
    this._setTotalPrice();
    render(<App />, document.getElementById('root'));
  };

}

export default new AppState();
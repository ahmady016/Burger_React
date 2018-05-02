import React from 'react';
import { render } from 'react-dom';
import './../index.css';
import App from './../App/App';

class AppState {

  ingredients = {
    salad: {
      quantity: 0,
      price: 0.50
    },
    beef: {
      quantity: 0,
      price: 2.50
    },
    tuna: {
      quantity: 0,
      price: 2.00
    },
    mayonnaise: {
      quantity: 0,
      price: 1.00
    },
    mushroom: {
      quantity: 0,
      price: 1.50
    },
    feta: {
      quantity: 0,
      price: 0.75
    },
    cheddar: {
      quantity: 0,
      price: 1.25
    },
    lamb: {
      quantity: 0,
      price: 3.50
    },
    mozzarella: {
      quantity: 0,
      price: 1.50
    },
    chicken: {
      quantity: 0,
      price: 1.50
    },
    roquefort: {
      quantity: 0,
      price: 1.75
    }
  };
  order = {};

  reset = () => {
    this.order = {};
    Object.keys(this.ingredients)
          .forEach(key => this.ingredients[key].quantity = 0);
    render(<App />, document.getElementById('root'));
  }

  setTotalPrice = () => {
    this.order.totalPrice = Object.keys(this.order)
                              .filter(key => key !== 'totalPrice')
                              .map(key => +this.order[key].total)
                              .reduce( (total,subTotal) => total+subTotal,0);
  }

  setOrder = (key, val) => {
    const item = this.ingredients[key];
    item.quantity += val;
    if (item.quantity) {
      this.order[key] = item
      this.order[key].total = Number(item.quantity * item.price).toFixed(2);
    } else {
      delete this.order[key];
    }
    this.setTotalPrice();
    render(<App />, document.getElementById('root'));
  };

}

export default new AppState();
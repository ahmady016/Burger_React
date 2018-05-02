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
          .forEach(key => {
            const item = this.ingredients[key];
            item.quantity = 0;
            item.total = 0;
          });
    render(<App />, document.getElementById('root'));
  }

  setOrder = () => {
    Object.keys(this.ingredients)
          .forEach( key => {
              if (this.ingredients[key].quantity)
                this.order[key] = this.ingredients[key];
          });
    this.order.totalPrice = Object.keys(this.order)
                              .filter(key => key !== 'totalPrice')
                              .map(key => +this.order[key].total)
                              .reduce( (total,subTotal) => total+subTotal,0);
  }

  setQuantity = (key, val) => {
    const item = this.ingredients[key];
    item.quantity += val;
    item.total = Number(item.quantity * item.price).toFixed(2);
    this.setOrder();
    render(<App />, document.getElementById('root'));
  };

}

export default new AppState();
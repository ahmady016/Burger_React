import React from 'react'
import Template from './../../Common/Template';
import AppState from "./../../Common/AppState";
import ConfirmOrder from './../ConfirmOrder'

import './Summary.css';

export default () => {
  const { order } = AppState;
  const rows = Object.keys(order)
                  .filter(key => key !== 'totalPrice')
                  .map(key => (
                      <tr key={key}>
                        <td>{key.toTitleCase()}</td>
                        <td>{order[key].price}</td>
                        <td>{order[key].quantity}</td>
                        <td>{order[key].total}</td>
                      </tr> )
                  );
  return <Template className="summary">
      <h5>Summary</h5>
      <button type="button" name="order"
              className="modal-trigger btn waves-effect waves-light"
              data-target="modal1"
              disabled={!rows.length}>
          Order Now
        <i className="material-icons left">payment</i>
      </button>
      <table className="highlight responsive-table">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Price</th>
            <th>Qnt</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          { (!!rows.length)
              ? rows
              : <tr>
                  <td colSpan="4" className="center-align">No Order ...</td>
                </tr>
          }
        </tbody>
      </table>
      <p className="flow-text">Total Price: {order.totalPrice || 0}</p>
      <ConfirmOrder />
    </Template>;
}

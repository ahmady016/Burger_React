import React from "react";
import Template from './../../Common/Template';
import AppState from "./../../Common/AppState";
import "./Burger.css";

export default () => {
  const { order } = AppState;
  const orderIngredients = Object.keys(order);
  const orderIngredientDivs = (orderIngredients)
                          ? Object.keys(order)
                              .map(key =>
                                [...Array(order[key].quantity)].map((_, i) => (
                                  <div key={key + i} className={key} />
                                )
                              ))
                              .reduce((arr, item) => arr.concat(item), [])
                          : null;
  return (
    <Template className="burger">
      <h5>Burger</h5>
      <div className="bread-top">
        <div className="seeds1" />
        <div className="seeds2" />
      </div>
      {
        !!orderIngredientDivs.length
          ? orderIngredientDivs
          : <p className="flow-text">start adding some ingredients ...</p>
      }
      <div className="bread-bottom"></div>
    </Template>
  );
};

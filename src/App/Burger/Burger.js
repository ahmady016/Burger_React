import React from "react";
import Template from './../../Common/Template';
import AppState from "./../../Common/AppState";
import "./Burger.css";

export default () => {
  const { ingredients } = AppState;
  const ingredientDivs = Object.keys(ingredients)
                          .map(key =>
                            [...Array(ingredients[key].quantity)].map((_, i) => (
                              <div key={key + i} className={key} />
                            )
                          ))
                          .reduce((arr, item) => arr.concat(item), []);
  return (
    <Template className="burger">
      <h5>Burger</h5>
      <div className="bread-top">
        <div className="seeds1" />
        <div className="seeds2" />
      </div>
      {
        !!ingredientDivs.length
          ? ingredientDivs
          : <p className="flow-text">start adding some ingredients ...</p>
      }
      <div className="bread-bottom"></div>
    </Template>
  );
};

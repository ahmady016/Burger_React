import React from 'react'
import Template from './../../Common/Template';
import AppState from "./../../Common/AppState";
import './Builder.css'

export default () => {
  const { ingredients, setOrder, order} = AppState;
  return (
    <Template className="builder">
      <h5>Ingredients</h5>
      {
        Object.keys(ingredients)
              .map( key =>
                <div key={key}>
                  <button className="btn-small btn-floating waves-effect waves-light"
                          disabled={!order[key]}
                          onClick={() => setOrder(key,-1)}>
                    <i className="material-icons">remove</i>
                  </button>
                  <span className="hoverable">
                    {key.toTitleCase()}
                  </span>
                  <button className="btn-small btn-floating waves-effect waves-light"
                          onClick={() => setOrder(key,1)}>
                    <i className="material-icons">add</i>
                  </button>
                </div>
              )
      }
    </Template>
  )
}

import React from 'react';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Template from './../Common/Template';
import './App.css';

export default () => {
    return (
      <Template className="container">
        <BurgerBuilder />
      </Template>
    );
}

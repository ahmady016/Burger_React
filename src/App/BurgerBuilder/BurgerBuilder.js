import React from 'react'
import Template from './../../Common/Template';
import Builder from '../Builder/Builder';
import Burger from '../Burger/Burger';
import Summary from '../Summary/Summary';

export default () => {
  return (
    <Template>
      <Builder />
      <Burger />
      <Summary />
    </Template>
  )
}

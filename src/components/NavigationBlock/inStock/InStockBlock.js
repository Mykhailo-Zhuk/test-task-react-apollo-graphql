import React, { Component } from 'react';

import { store } from '../../../store/store';
import './InStockBlock.css';

export class InStockBlock extends Component {
  render() {
    const takenCurrency = this.props.productItem.prices.find(
      (obj) => obj.currency.label === store.getState().convertCurency.currentLabel,
    );
    const [firstImageOfProduct] = this.props.productItem.gallery;
    return (
      <div className="pcInStock">
        <p className="inStockLabel">Size</p>
        <div className="pcInStockImage">
          <img src={firstImageOfProduct} alt="inStock" />
        </div>
        <div className="pcInStockContent">
          <p className="pcTitle">
            {this.props.productItem.name}
            {this.props.productItem.brand}
          </p>
          <p className="pcCurrencyItem">
            {takenCurrency.currency.symbol}
            {takenCurrency.amount}
          </p>
        </div>
        <div className="pcInStockDeleteButton">
          <button
            onClick={() =>
              store.dispatch({ type: 'DELETE_PRODUCT', id: this.props.productItem.id })
            }>
            -
          </button>
        </div>
      </div>
    );
  }
}

export default InStockBlock;

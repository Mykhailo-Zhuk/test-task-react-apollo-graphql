import React, { Component } from 'react';
import { store } from '../../../store/store';
import '../Navigation.css';

export default class ProductCartDetalies extends Component {
  render() {
    const product = store
      .getState()
      .targetProducts.find((prod) => prod.id === +this.props.productItem.id);
    const { convertIndex, symbol } = store.getState().convertCurency;
    const currentCurrency = (convertIndex * this.props.productItem.price).toFixed(2);
    return (
      <div className="productCartBlock">
        <div className="productCartConfig">
          <div className="productCartDescription">
            <p className="productCartTitle">{this.props.productItem.title}</p>
            <div className="productCartConfigCurrencyBlock">
              <div className="productCartCurrencyItem">
                {symbol}
                {currentCurrency}
              </div>
            </div>
            <div className="productCartConfigSizeRow">
              <p className="productCartRowTitle">Size:</p>
              <ul className="productCartSizeRowList">
                {this.props.productItem.sizes.map((element) => {
                  return (
                    <li className="productCartSizeRowItem">
                      <button>{element}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="productCartConfigColorRow">
              <p className="productCartRowTitle">Color:</p>
              <ul className="productCartColorRowList">
                {this.props.productItem.colors.map((element) => {
                  return (
                    <li className="productCartColorItem">
                      <button style={{ backgroundColor: `${element}` }}></button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="productCartAmountButtons">
            <button
              className="productCartAmountIncrease"
              onClick={() =>
                store.dispatch({ type: 'INCREASE_AMOUNT', id: +this.props.productItem.id })
              }>
              +
            </button>
            <p className="productCartAmount">{product.count}</p>
            <button
              className="productCartAmountDecrease"
              onClick={() =>
                store.dispatch({ type: 'DECREASE_AMOUNT', id: +this.props.productItem.id })
              }>
              -
            </button>
          </div>
        </div>
        <div className="productCartImage">
          <img src={this.props.productItem.image} alt="target's product"></img>
        </div>
        <div className="productDeleteButton">
          <button
            onClick={() =>
              store.dispatch({ type: 'DELETE_PRODUCT', id: +this.props.productItem.id })
            }>
            +
          </button>
        </div>
      </div>
    );
  }
}

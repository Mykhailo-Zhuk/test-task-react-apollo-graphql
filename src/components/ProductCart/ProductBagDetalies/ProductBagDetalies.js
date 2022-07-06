import React, { Component } from 'react';
import { store } from '../../../store/store';
import '../ProductBag.css';

export default class ProductBagDetalies extends Component {
  render() {
    const product = store
      .getState()
      .targetProducts.find((prod) => prod.id === +this.props.productItem.id);
    const { convertIndex, symbol } = store.getState().convertCurency;
    const currentCurrency = (convertIndex * this.props.productItem.price).toFixed(2);
    return (
      <div className="productBagBlock">
        {/* Left side with title, price, color, size and middle side with increase and decrease buttons*/}
        <div className="productBagConfig">
          <div className="productBagDescription">
            <p className="productBagTitle">{this.props.productItem.title}</p>
            <div className="productBagConfigCurrencyBlock">
              <div className="productBagCurrencyItem">
                {symbol}
                {currentCurrency}
              </div>
            </div>
            <div className="productBagConfigSizeRow">
              <p className="productBagRowTitle">Size:</p>
              <ul className="productBagSizeRowList">
                {this.props.productItem.sizes.map((element, index) => {
                  return (
                    <li key={index} className="productBagSizeRowItem">
                      <button>{element}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="productBagConfigColorRow">
              <p className="productBagRowTitle">Color:</p>
              <ul className="productBagColorRowList">
                {this.props.productItem.colors.map((element, index) => {
                  return (
                    <li key={index} className="productBagColorItem">
                      <button style={{ backgroundColor: `${element}` }}></button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Right side with increase/decrease amount button, image*/}
          <div className="productBagAmountButtons">
            <button
              className="productBagAmountIncrease"
              onClick={() =>
                store.dispatch({ type: 'INCREASE_AMOUNT', id: +this.props.productItem.id })
              }>
              +
            </button>
            <p className="productBagAmount">{product.count}</p>
            <button
              className="productBagAmountDecrease"
              onClick={() =>
                store.dispatch({ type: 'DECREASE_AMOUNT', id: +this.props.productItem.id })
              }>
              -
            </button>
          </div>
        </div>
        {/* Image and carets*/}
        <div className="productBagImage">
          <img src={this.props.productItem.image} alt="target product"></img>
          <div className="productBagImageCaret">
            <div className="productBagImageCaretLeft"></div>
            <div className="productBagImageCaretRight"></div>
          </div>
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

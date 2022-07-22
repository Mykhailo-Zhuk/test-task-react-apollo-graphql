import React, { Component } from 'react';
import { store } from '../../../store/store';
import '../ProductBag.css';

export default class ProductBagDetalies extends Component {
  pbToggleClassHandler = (e) => {
    if (e.target) {
      const link = e.target;
      const attRowItem = link.closest('.pbAttributesRowList').querySelectorAll('button');
      attRowItem.forEach((el) => {
        if (el === link) el.classList.toggle('selected');
      });
    }
  };
  render() {
    const takenCurrency = this.props.productItem.prices.find(
      (obj) => obj.currency.label === store.getState().convertCurency.currentLabel,
    );
    const currentProduct = store
      .getState()
      .targetProducts.find((prod) => prod.id === this.props.productItem.id);
    const [firstImageOfProduct] = this.props.productItem.gallery;
    return (
      <div className="pbBlock">
        {/* Left side with title, price, color, size and middle side with increase and decrease buttons*/}
        <div className="pbConfig">
          <div className="pbDescription">
            <p className="pbTitleBrand">{this.props.productItem.brand}</p>
            <p className="pbTitleName">{this.props.productItem.name}</p>
            <div className="pbConfigCurrencyBlock">
              <div className="pbCurrencyItem">
                {takenCurrency.currency.symbol}
                {takenCurrency.amount}
              </div>
            </div>
            <div className="pbConfigAttributesRow">
              {this.props.productItem.attributes.map((element) => {
                return (
                  <div>
                    <h3 className="pbRowTitle">{element.name}:</h3>
                    <ul className="pbAttributesRowList" onClick={this.pbToggleClassHandler}>
                      {element.items.map((subelement) => {
                        if (subelement.value.includes('#')) {
                          return (
                            <li className="pbAttributesRowColorItem">
                              <button style={{ backgroundColor: `${subelement.value}` }}></button>
                            </li>
                          );
                        } else {
                          return (
                            <li className="pbAttributesRowItem">
                              <button>{subelement.value}</button>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Right side with increase/decrease amount button, image*/}
          <div className="pbAmountButtons">
            <button
              className="pbAmountIncrease"
              onClick={() =>
                store.dispatch({ type: 'INCREASE_AMOUNT', id: this.props.productItem.id })
              }>
              -
            </button>
            <p className="pbAmount">{currentProduct.count}</p>
            <button
              className="pbAmountDecrease"
              onClick={() =>
                store.dispatch({ type: 'DECREASE_AMOUNT', id: this.props.productItem.id })
              }>
              -
            </button>
          </div>
        </div>
        {/* Image and carets*/}
        <div className="pbImage">
          <img src={firstImageOfProduct} alt="target product"></img>
          <div className="pbImageCaret">
            <div className="pbImageCaretLeft"></div>
            <div className="pbImageCaretRight"></div>
          </div>
        </div>
        <div className="pcDeleteButton">
          <button
            onClick={() =>
              store.dispatch({ type: 'DELETE_PRODUCT', id: this.props.productItem.id })
            }>
            +
          </button>
        </div>
      </div>
    );
  }
}

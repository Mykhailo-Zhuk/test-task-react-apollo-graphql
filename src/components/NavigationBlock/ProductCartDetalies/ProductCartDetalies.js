import React, { Component } from 'react';
import { store } from '../../../store/store';
import '../Navigation.css';

export default class ProductCartDetalies extends Component {
  pcToggleClassHandler = (e) => {
    if (e.target) {
      const link = e.target;
      const attRowItem = link.closest('.pcAttributesRowList').querySelectorAll('button');
      attRowItem.forEach((el) => {
        if (el === link) el.classList.toggle('selected');
      });
    }
  };
  render() {
    const { currentLabel } = store.getState().convertCurency;
    const { targetProducts } = store.getState();
    const takenCurrency = this.props.productItem.prices.find(
      (obj) => obj.currency.label === currentLabel,
    );
    const currentProduct = targetProducts.find((prod) => prod.id === this.props.productItem.id);
    const [firstImageOfProduct] = this.props.productItem.gallery;
    return (
      <div className="pcBlock">
        <div className="pcConfig">
          <div className="pcDescription">
            <p className="pcTitle">{this.props.productItem.brand}</p>
            <p className="pcTitle">{this.props.productItem.name}</p>
            <div className="pcConfigCurrencyBlock">
              <div className="pcCurrencyItem">
                {takenCurrency.currency.symbol}
                {takenCurrency.amount}
              </div>
            </div>
            <div className="pcConfigAttributesRow">
              {this.props.productItem.attributes.map((element) => {
                return (
                  <div>
                    <h3 className="pcRowTitle">{element.name}:</h3>
                    <ul className="pcAttributesRowList" onClick={this.pcToggleClassHandler}>
                      {element.items.map((subelement) => {
                        if (subelement.value.includes('#')) {
                          return (
                            <li className="pcAttributesColorItem">
                              <button style={{ backgroundColor: `${subelement.value}` }}></button>
                            </li>
                          );
                        } else {
                          return (
                            <li className="pcAttributesItem">
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
        </div>
        <div className="pcAmountButtons">
          <button
            className="pcAmountIncrease"
            onClick={() =>
              store.dispatch({ type: 'INCREASE_AMOUNT', id: this.props.productItem.id })
            }>
            +
          </button>
          <p className="pcAmount">{currentProduct.count}</p>
          <button
            className="pcAmountDecrease"
            onClick={() =>
              store.dispatch({ type: 'DECREASE_AMOUNT', id: this.props.productItem.id })
            }>
            -
          </button>
        </div>
        <div className="pcImage">
          <img src={firstImageOfProduct} alt="target's product"></img>
        </div>
        <div className="pcDeleteButton">
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

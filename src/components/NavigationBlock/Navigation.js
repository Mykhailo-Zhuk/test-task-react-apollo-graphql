import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';
import { Query } from '@apollo/client/react/components';
import { GET_FILTERED_BY_IDS } from '../../query/getProduct';
import ProductCartDetalies from './ProductCartDetalies/ProductCartDetalies';
import { store } from '../../store/store';

export class NavigationBlock extends Component {
  constructor() {
    super();
    this.state = {
      amountOfProduct: 0,
    };
    store.subscribe(this.updateAmountOfProduct);
  }
  updateAmountOfProduct = () => {
    const amount = store.getState().targetProducts.length;
    this.setState({
      amountOfProduct: amount,
    });
  };
  // When your mouse over in the navigation category to target element will add 'nav_active' class, else - remove this class
  onMouseOverHandler = (e) => {
    if (e.target) {
      const link = e.target;
      const siblings = link.closest('.navCategory').querySelectorAll('.navCategoryItem');
      siblings.forEach((el) => {
        if (el === link) el.classList.add('nav_active');
        else el.classList.remove('nav_active');
      });
    }
  };
  render() {
    const { targetProducts } = store.getState();
    const { convertIndex, symbol } = store.getState().convertCurency;
    const totalPrice = targetProducts
      .map((el) => el.price * el.count)
      .reduce((acc, cur) => acc + cur, 0);
    const currentCurrency = (convertIndex * totalPrice).toFixed(2);
    return (
      <nav className="nav">
        {/* Link to category */}
        <ul
          className="navCategory"
          onClick={(e) =>
            store.dispatch({
              type: 'FILTERED_PRODUCTS',
              categoryOfProducts: e.target.dataset.products,
            })
          }
          onMouseOver={this.onMouseOverHandler}>
          <li className="navCategoryItem" data-products="all products">
            all products
          </li>
          <li className="navCategoryItem" data-products="men's clothing">
            men's clothing
          </li>
          <li className="navCategoryItem" data-products="jewelery">
            jewelery
          </li>
          <li className="navCategoryItem" data-products="electronics">
            electronics
          </li>
          <li className="navCategoryItem" data-products="women's clothing">
            women's clothing
          </li>
        </ul>
        <div className="store-logo"></div>
        {/* Change currency block*/}
        <div className="navCartBlock">
          {/* Show or disappear currency list */}
          <div
            className="dolarSignUp"
            onClick={() => store.dispatch({ type: 'TOGGLE_CURRENCY_LIST' })}></div>
          {/* Currency list, open/close currency list */}
          <div className="navCurrencyCharacters">
            <ul
              onClick={(e) =>
                store.dispatch({
                  type: 'GET_CONVERT_CURENCY',
                  convertCurency: e.target.dataset.curency,
                })
              }>
              <li data-curency="USD">$ USD</li>
              <li data-curency="EUR">€ EUR</li>
              <li data-curency="JPY">¥ JPY</li>
            </ul>
          </div>
          {/* Empty cart sign, open/close products cart */}
          <div
            className="emptyCart"
            onClick={() => store.dispatch({ type: 'TOGGLE_PRODUCTS_CART' })}></div>
          {/* Show products cart */}
          <div className="navShowProductsCart">
            <div>
              <p className="productCartListTitle">
                <span>My Bag</span> {this.state.amountOfProduct} items
              </p>
            </div>
            {/* Main cart of taking products */}
            <Query
              query={GET_FILTERED_BY_IDS}
              variables={{
                id: store.getState().targetProducts.map((product) => product.id),
              }}>
              {({ data, error, loading }) => {
                if (loading) return <p>'Loading...'</p>;
                if (error) return <p>'Error! ${error.message}'</p>;
                return data.getFilteredByIds.map((products) => {
                  return <ProductCartDetalies key={products.id} productItem={products} />;
                });
              }}
            </Query>
            {/* Total price of taking product */}
            <div className="productCartTotalPrice">
              <p>Total</p>
              <p>
                {symbol}
                {currentCurrency}
              </p>
            </div>
            {/* Button link to ./cart */}
            <div className="productCartSubmitButton">
              <Link to={'/cart'}>
                <button
                  className="pcViewBagButton"
                  onClick={() => store.dispatch({ type: 'LINK_TO_CART' })}>
                  view bag
                </button>
              </Link>
              <button className="pcCheckOutButton">check out</button>
            </div>
            {/* Block of 'out of stock' product */}
            {this.state.amountOfProduct > 0 && (
              <Query
                query={GET_FILTERED_BY_IDS}
                variables={{
                  id: store.getState().targetProducts.map((product) => product.id),
                }}>
                {({ data, error, loading }) => {
                  if (loading) return <p>'Loading...'</p>;
                  if (error) return <p>'Error! ${error.message}'</p>;
                  if (this.state.amountOfProduct > 0 && this.state.amountOfProduct < 3) {
                    const outOfStock = data.getFilteredByIds[data.getFilteredByIds.length - 1];
                    return (
                      <div key={outOfStock.id} className="productCartOutOfStock">
                        <p className="productCartOutOfStockLabel">Size</p>
                        <div className="productCartOutOfStockImage">
                          <img src={outOfStock.image} alt="Out of Stock" />
                        </div>
                        <div className="productCartOutOfStockContent">
                          <p className="productCartTitle">{outOfStock.title}</p>
                          <p className="productCartCurrencyItem">
                            {symbol}
                            {convertIndex * outOfStock.price}
                          </p>
                        </div>
                      </div>
                    );
                  }
                }}
              </Query>
            )}
          </div>
          <span
            className="navChangeNumberOfProducts"
            style={{ display: this.state.amountOfProduct !== 0 ? 'block' : 'none' }}>
            {this.state.amountOfProduct}
          </span>
        </div>
      </nav>
    );
  }
}

export default NavigationBlock;

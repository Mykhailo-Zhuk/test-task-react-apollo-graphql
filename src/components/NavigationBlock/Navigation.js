import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';
import { Query } from '@apollo/client/react/components';
import { CATEGORIES, CURRENCIES, GET_FILTERED_BY_ID } from '../../query/getProduct';
import ProductCartDetalies from './ProductCartDetalies/ProductCartDetalies';
import { store } from '../../store/store';
import { Categories } from './Categories/Categories';
import { InStockBlock } from './inStock/InStockBlock';

export class NavigationBlock extends Component {
  constructor() {
    super();
    this.state = {
      amountOfProduct: 0,
      listOfTakingProducts: store.getState().targetProducts,
    };
    store.subscribe(this.updateProducts);
  }
  updateProducts = () => {
    const newAmount = store.getState().targetProducts.length;
    const newListOfTakingProducts = store.getState().targetProducts;
    this.setState({
      amountOfProduct: newAmount,
      listOfTakingProducts: newListOfTakingProducts,
    });
  };
  addActiveClassToNav = (e) => {
    if (e.target) {
      const link = e.target;
      const siblings = link.closest('.navCategory').querySelectorAll('.navCategoryItem');
      siblings.forEach((el) => {
        el.classList.remove('nav_active');
        if (el === link) el.classList.add('nav_active');
      });
    } else return;
  };
  removeClassFromNav = (e) => {
    const link = e.target;
    const siblings = link.closest('.navCategory').querySelectorAll('.navCategoryItem');
    siblings.forEach((el) => {
      el.classList.remove('nav_active');
    });
  };
  // When your mouse over in the navigation category to target element will add 'nav_active' class, else - remove this class
  render() {
    const { currentLabel } = store.getState().convertCurency;
    const { targetProducts } = store.getState();
    const filteredListWithoutInStock = targetProducts.filter((el) => !el.inStock);
    const totalPrice = filteredListWithoutInStock
      .map(
        (prod) => prod.count * prod.price.find((el) => el.currency.label === currentLabel).amount,
      )
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);

    const allCounts = filteredListWithoutInStock
      .map((product) => product.count)
      .reduce((acc, cur) => acc + cur, 0);
    return (
      <nav className="nav">
        {/* Link to category */}
        <div className="navCategories">
          <ul
            className="navCategory"
            onClick={(e) =>
              store.dispatch({
                type: 'FILTERED_PRODUCTS',
                categoryOfProducts: e.target.dataset.categories,
              })
            }
            onMouseOver={this.addActiveClassToNav}
            onMouseOut={this.removeClassFromNav}>
            <Query query={CATEGORIES}>
              {({ data, error, loading }) => {
                if (loading) return <p>'Loading...'</p>;
                if (error) return <p>'Error! ${error.message}'</p>;
                return data.categories.map((products, index) => {
                  return <Categories key={index} productCategory={products.name} />;
                });
              }}
            </Query>
          </ul>
        </div>
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
              <li data-curency="GBP">£ GBP</li>
              <li data-curency="JPY">¥ JPY</li>
              <li data-curency="AUD">A$ AUD</li>
              <li data-curency="RUB">₽ RUB</li>
            </ul>
          </div>
          {/* Empty cart sign, open/close products cart */}
          <div
            className="emptyCart"
            onClick={() => store.dispatch({ type: 'TOGGLE_PRODUCTS_CART' })}></div>
          {/* Show products cart */}
          <div className="navShowProductsCart">
            <div>
              <p className="pcListTitle">
                <span>My Bag</span> {allCounts} items
              </p>
            </div>
            {/* Main cart of taking products */}
            {this.state.listOfTakingProducts.map((curProd) => {
              return (
                <Query
                  query={GET_FILTERED_BY_ID}
                  variables={{
                    id: curProd.id,
                  }}>
                  {({ data, error, loading }) => {
                    if (loading) return <p>'Loading...'</p>;
                    if (error) return <p>'Error! ${error.message}'</p>;
                    if (!data.product.inStock)
                      return <ProductCartDetalies productItem={data.product} />;
                    else return;
                  }}
                </Query>
              );
            })}
            {/* Total price of taking products */}
            <Query query={CURRENCIES}>
              {({ data, error, loading }) => {
                if (loading) return <p>'Loading...'</p>;
                if (error) return <p>'Error! ${error.message}'</p>;
                const currency = data.currencies.find((el) => el.label === currentLabel);
                return (
                  <div className="pcTotalPrice">
                    Total
                    <span>
                      {currency.symbol}
                      {totalPrice}
                    </span>
                  </div>
                );
              }}
            </Query>
            {/* Button link to ./cart */}
            <div className="pcSubmitButton">
              <Link to={'/cart'}>
                <button
                  className="pcViewBagButton"
                  onClick={() => store.dispatch({ type: 'LINK_TO_CART' })}>
                  view bag
                </button>
              </Link>
              <button className="pcCheckOutButton">check out</button>
            </div>
            {/* Block of 'in stock' product */}
            {this.state.listOfTakingProducts.map((curProd) => {
              return (
                <Query
                  query={GET_FILTERED_BY_ID}
                  variables={{
                    id: curProd.id,
                  }}>
                  {({ data, error, loading }) => {
                    if (loading) return <p>'Loading...'</p>;
                    if (error) return <p>'Error! ${error.message}'</p>;
                    if (data.product.inStock) {
                      return <InStockBlock productItem={data.product} />;
                    } else return;
                  }}
                </Query>
              );
            })}
          </div>
          <span
            className="navChangeNumberOfProducts"
            style={{ display: allCounts !== 0 ? 'block' : 'none' }}>
            {allCounts}
          </span>
        </div>
      </nav>
    );
  }
}

export default NavigationBlock;

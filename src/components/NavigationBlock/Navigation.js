import React, { Component } from 'react';
import './Navigation.css';
import image from './icon/a-logo.svg';
import dolarDown from './icon/dolar-character-down.svg';
import dolarUp from './icon/dolar-character-up.svg';
import EmptyCart from './icon/Empty-Cart.svg';
import { Query } from '@apollo/client/react/components';
import { GET_FILTERED_BY_IDS } from '../../query/getProduct';
import { Link } from 'react-router-dom';
import ProductCartDetalies from './ProductCartDetalies/ProductCartDetalies';

export class NavigationBlock extends Component {
  constructor() {
    super();
    this.state = {
      listOfTakingProduct: [],
      onClickCurrencyList: false,
      amountOfProduct: 0,
      totalPrice: [],
      convertCurency: {},
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.targetProduct.idOfTargetProducts.size !== state.listOfTakingProduct.length ||
      props.targetProduct.totalPrice.length !== state.totalPrice.length
    ) {
      return {
        amountOfProduct: props.targetProduct.numberOfProduct,
        listOfTakingProduct: [...props.targetProduct.idOfTargetProducts],
        totalPrice: props.targetProduct.totalPrice,
      };
    } else if (props.targetProduct.idOfTargetProducts.length === 0) {
      return {
        amountOfProduct: 0,
        totalPrice: [],
      };
    }
    return null;
  }
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
  onClickHandler = () => {
    this.setState({ ...this.state, onClickCurrencyList: !this.state.onClickCurrencyList });
  };
  displayProductListHandler = () => {
    this.props.displayProductList();
  };
  linkCartHandler = () => {
    this.props.linkHandler();
  };
  getFilteredProducts = (e) => {
    this.props.getFilteredProducts(e.target.dataset.products);
  };
  onConvertCurency = (e) => {
    this.props.getConvertCurency(e.target.dataset.curency);
  };
  render() {
    const { convertIndex } = this.props.targetProduct.convertCurency;
    const { symbol } = this.props.targetProduct.convertCurency;
    const totalPrice = this.state.totalPrice.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const currentCurency = convertIndex * totalPrice;
    return (
      <nav className="nav">
        <ul
          className="navCategory"
          onClick={this.getFilteredProducts}
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
        <img src={image} height={32} width={32} alt="store-logo" />
        <div className="navCartBlock">
          {/* Change currency */}
          <div
            className="navCurrencyCharacter"
            style={{
              display: this.state.onClickCurrencyList ? 'block' : 'none',
            }}>
            <ul onClick={this.onConvertCurency}>
              <li data-curency="USD">$ USD</li>
              <li data-curency="EUR">€ EUR</li>
              <li data-curency="JPY">¥ JPY</li>
            </ul>
          </div>
          <img
            src={this.state.onClickCurrencyList ? dolarDown : dolarUp}
            alt="dolar-down-icon"
            onClick={this.onClickHandler}
            style={{ cursor: 'pointer' }}
          />
          <img
            src={EmptyCart}
            alt="empty-cart-icon"
            style={{ cursor: 'pointer' }}
            onClick={this.displayProductListHandler}
          />
          {/* Show products cart */}
          <div
            className="navShowProductsCart"
            style={{ display: this.props.targetProduct.displayProductList ? 'flex' : 'none' }}>
            <div>
              <p className="productCartListTitle">
                <span>My Bag</span> {this.state.amountOfProduct} items
              </p>
            </div>
            {/* Main cart of taking products */}
            <Query
              query={GET_FILTERED_BY_IDS}
              variables={{
                id: this.state.listOfTakingProduct,
              }}>
              {({ data, error, loading }) => {
                if (loading) return <p>'Loading...'</p>;
                if (error) return <p>'Error! ${error.message}'</p>;
                return data.getFilteredByIds.map((products) => {
                  return (
                    <ProductCartDetalies
                      key={products.id}
                      getCurrency={this.props.targetProduct}
                      state={this.state}
                      productItem={products}
                      deleteProductFromCart={this.props.deleteProductFromCart}
                      totalIncreasePriceHandler={this.props.totalIncreasePriceHandler}
                      totalDecreasePriceHandler={this.props.totalDecreasePriceHandler}
                    />
                  );
                });
              }}
            </Query>
            {/* Total price of taking product */}
            <div className="productCartTotalPrice">
              <p>Total</p>
              <p>
                {symbol}
                {currentCurency.toFixed(2)}
              </p>
            </div>
            {/* Button link to ./cart */}
            <div className="productCartSubmitButton">
              <Link to={'/cart'}>
                <button className="pcViewBagButton" onClick={this.linkCartHandler}>
                  view bag
                </button>
              </Link>
              <button className="pcCheckOutButton">check out</button>
            </div>
            {/* Block of 'out of stock' product */}
            {this.state.listOfTakingProduct.length !== 0 && (
              <Query
                query={GET_FILTERED_BY_IDS}
                variables={{
                  id: this.state.listOfTakingProduct,
                }}
                pollInterval={500}>
                {({ data, error, loading }) => {
                  if (loading) return <p>'Loading...'</p>;
                  if (error) return <p>'Error! ${error.message}'</p>;
                  if (
                    this.state.listOfTakingProduct !== 0 &&
                    this.state.listOfTakingProduct.length < 3
                  ) {
                    const outOfStock = data.getFilteredByIds[data.getFilteredByIds.length - 1];
                    return (
                      <div key={outOfStock?.id} className="productCartOutOfStock">
                        <p className="productCartOutOfStockLabel">Size</p>
                        <div className="productCartOutOfStockImage">
                          <img src={outOfStock?.image} alt="Out of Stock" />
                        </div>
                        <div className="productCartOutOfStockContent">
                          <p className="productCartTitle">{outOfStock?.title}</p>
                          <p className="productCartCurrencyItem">${outOfStock?.price}</p>
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

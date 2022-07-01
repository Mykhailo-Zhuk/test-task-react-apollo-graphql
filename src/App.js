import React, { Component } from 'react';
import './App.css';
import AllProducts from './components/AllProductComp/AllProducts';
import { Route, Routes } from 'react-router-dom';
import ProductDescription from './components/ProductDescription/ProductDescription';
import NavigationBlock from './components/NavigationBlock/Navigation';
import ProductBag from './components/ProductCart/ProductBag';

class App extends Component {
  constructor() {
    super();
    this.state = {
      targetProductId: 0,
      idOfTargetProducts: new Set(),
      displayProductList: false,
      categoryOfProducts: null,
      convertCurency: { symbol: '$', convertIndex: 1 },
      totalPrice: [],
      totalTax: [],
      numberOfProduct: 0,
    };
  }
  // Display and hidden product list in NavigationBlock with add classes overlay and body overflow: hidden
  displayProductListHandler = () => {
    this.setState({ ...this.state, displayProductList: !this.state.displayProductList });
    const body = document.querySelector('body');
    if (this.state.displayProductList) {
      body.classList.remove('hidden');
    } else {
      body.classList.add('hidden');
    }
  };
  getProductAfterClick = (value, price) => {
    const addId = this.state.idOfTargetProducts;
    addId.add(value);
    const addPrice = [...this.state.totalPrice];
    const concatPrice = addPrice.some((el) => el === price) ? addPrice : addPrice.concat([price]);
    const mapTax = concatPrice.map((el) => el * 0.21);
    this.setState({
      ...this.state,
      idOfTargetProducts: addId,
      targetProductId: value,
      totalPrice: concatPrice,
      numberOfProduct: addId.size,
      totalTax: mapTax,
    });
  };
  linkToCartHandler = () => {
    const body = document.querySelector('body');
    if (body.classList.contains('hidden')) {
      body.classList.remove('hidden');
      this.setState({ ...this.state, displayProductList: false });
    }
  };
  changeDisplayToNone = () => {
    const body = document.querySelector('body');
    if (body.classList.contains('hidden')) {
      body.classList.remove('hidden');
      this.setState({ ...this.state, displayProductList: false });
    }
  };
  getFilteredProducts = (value) => {
    this.setState({ ...this.state, categoryOfProducts: value });
  };
  getConvertCurency = (data) => {
    if (data === 'USD') {
      this.setState({ ...this.state, convertCurency: { symbol: '$', convertIndex: 1 } });
    } else if (data === 'EUR') {
      this.setState({ ...this.state, convertCurency: { symbol: '€', convertIndex: 0.95 } });
    } else if (data === 'JPY') {
      this.setState({ ...this.state, convertCurency: { symbol: '¥', convertIndex: 135.46 } });
    }
  };
  totalIncreasePriceHandler = (price, tax) => {
    const addPrice = [...this.state.totalPrice];
    const concatPrice = addPrice.concat([price]);

    const addTax = [...this.state.totalTax];
    const concatTax = addTax.concat([tax]);
    this.setState({
      ...this.state,
      totalPrice: concatPrice,
      totalTax: concatTax,
      numberOfProduct: this.state.numberOfProduct + 1,
    });
  };
  totalDecreasePriceHandler = (price, tax) => {
    const newListPrice = [...this.state.totalPrice];
    const decreasedPrice = newListPrice.indexOf(price);
    newListPrice.splice(decreasedPrice, 1);

    const newListTax = [...this.state.totalTax];
    const decreasedTax = newListTax.indexOf(tax);
    newListTax.splice(decreasedTax, 1);
    this.setState({
      ...this.state,
      totalPrice: newListPrice,
      numberOfProduct: this.state.numberOfProduct - 1,
      totalTax: newListTax,
    });
  };
  deleteProductFromCart = (id, price, tax = 0) => {
    // Delete id from Set
    const newSet = this.state.idOfTargetProducts;
    newSet.delete(id);

    // Remove price from this.state.totalPrice
    const newListPrice = [...this.state.totalPrice];
    const decreasedPrice = newListPrice.indexOf(price);
    newListPrice.splice(decreasedPrice, 1);

    // Remove tax from this.state.totalTax
    const newListTax = [...this.state.totalTax];
    const decreasedTax = newListTax.indexOf(tax);
    newListTax.splice(decreasedTax, 1);
    this.setState({
      ...this.state,
      idOfTargetProducts: newSet,
      totalPrice: newListPrice,
      numberOfProduct: this.state.numberOfProduct - 1,
      totalTax: newListTax,
    });
  };
  render() {
    const { client } = this.props;
    return (
      <div className="App">
        <NavigationBlock
          targetProduct={this.state}
          product={client}
          displayProductList={this.displayProductListHandler}
          linkHandler={this.linkToCartHandler}
          deleteProductFromCart={this.deleteProductFromCart}
          getFilteredProducts={this.getFilteredProducts}
          getConvertCurency={this.getConvertCurency}
          totalIncreasePriceHandler={this.totalIncreasePriceHandler}
          totalDecreasePriceHandler={this.totalDecreasePriceHandler}
        />
        <Routes>
          <Route path="/" element={<AllProducts products={client} state={this.state} />} />
          <Route
            path="/:id"
            element={
              <ProductDescription
                product={client}
                getProductAfterClick={this.getProductAfterClick}
                targetProduct={this.state}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ProductBag
                product={client}
                targetProduct={this.state}
                totalIncreasePriceHandler={this.totalIncreasePriceHandler}
                totalDecreasePriceHandler={this.totalDecreasePriceHandler}
                deleteProductFromCart={this.deleteProductFromCart}
              />
            }
          />
        </Routes>
        <div
          className="overlay"
          style={{ display: this.state.displayProductList ? 'block' : 'none' }}
          onClick={this.changeDisplayToNone}></div>
      </div>
    );
  }
}

export default App;

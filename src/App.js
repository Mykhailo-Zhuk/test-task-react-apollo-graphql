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
      idOfTargetProducts: [],
      displayProductList: false,
      categoryOfProducts: null,
      convertCurency: null,
    };
  }
  // Display and hidden product list in NavigationBlock with add classes overlay and body overflow: hidden
  displayProductListHandler = () => {
    this.setState({
      displayProductList: !this.state.displayProductList,
    });
    const body = document.querySelector('body');
    if (this.state.displayProductList) {
      body.classList.remove('hidden');
    } else {
      body.classList.add('hidden');
    }
  };
  onClickHandler = (value) => {
    this.state.idOfTargetProducts.push(Number(value));
    this.setState({
      targetProductId: Number(value),
    });
  };
  linkToCartHandler = () => {
    const body = document.querySelector('body');
    if (body.classList.contains('hidden')) {
      body.classList.remove('hidden');
      this.setState({
        displayProductList: false,
      });
    }
  };
  changeDisplayToNone = () => {
    const body = document.querySelector('body');
    if (body.classList.contains('hidden')) {
      body.classList.remove('hidden');
      this.setState({
        displayProductList: false,
      });
    }
  };
  deleteProductFromCart = (value) => {
    const deleted = this.state.idOfTargetProducts.indexOf(Number(value));
    this.state.idOfTargetProducts.splice(deleted, 1);
  };
  getFilteredProducts = (value) => {
    this.setState({
      categoryOfProducts: value,
    });
  };
  getConvertCurency = (value) => {
    this.setState({ ...this.state, convertCurency: value });
  };
  render() {
    const { client } = this.props;
    console.log(this.state);
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
        />
        <Routes>
          <Route path="/" element={<AllProducts products={client} state={this.state} />} />
          <Route
            path="/:id"
            element={<ProductDescription product={client} onClickHandler={this.onClickHandler} />}
          />
          <Route
            path="/cart"
            element={
              <ProductBag
                product={client}
                targetProduct={this.state}
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

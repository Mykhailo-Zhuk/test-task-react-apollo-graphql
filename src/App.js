import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import AllProducts from './components/AllProductComp/AllProducts';
import ProductDescription from './components/ProductDescription/ProductDescription';
import NavigationBlock from './components/NavigationBlock/Navigation';
import ProductBag from './components/ProductCart/ProductBag';
import { store } from './store/store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBlock />
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/:id" element={<ProductDescription />} />
          <Route path="/cart" element={<ProductBag />} />
        </Routes>
        <div
          className="overlay"
          onClick={() => store.dispatch({ type: 'CHANGE_DISPLAY_TO_NONE' })}></div>
      </div>
    );
  }
}

export default App;

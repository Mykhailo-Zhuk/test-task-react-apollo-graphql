import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { GET_FILTERED_BY_IDS } from '../../query/getProduct';
import { store } from '../../store/store';
import './ProductBag.css';
import ProductBagDetalies from './ProductBagDetalies/ProductBagDetalies';

export class ProductBag extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    store.subscribe(this.updateStore);
  }
  updateStore = () => {
    const products = store.getState().targetProducts;
    this.setState({
      data: products,
    });
  };
  render() {
    const { targetProducts } = store.getState();
    const { convertIndex, symbol } = store.getState().convertCurency;
    const mapTotalBagPrice = targetProducts
      .map((el) => el.price * el.count)
      .reduce((acc, cur) => acc + cur, 0);
    const currentBagCurrency = (convertIndex * mapTotalBagPrice).toFixed(2);

    const mapTotalBagTax = targetProducts
      .map((el) => el.tax * el.count)
      .reduce((acc, cur) => acc + cur, 0);
    const currentBagTax = (mapTotalBagTax * convertIndex).toFixed(2);

    const allCounts = targetProducts
      .map((product) => product.count)
      .reduce((acc, cur) => acc + cur, 0);
    return (
      <div className="productBag">
        <h2 className="productBagMainTitle">Cart</h2>
        {/* Main list of taking products */}
        <Query
          query={GET_FILTERED_BY_IDS}
          variables={{
            id: store.getState().targetProducts.map((product) => product.id),
          }}>
          {({ data, error, loading }) => {
            if (loading) return <p>'Loading...'</p>;
            if (error) return <p>'Error! ${error.message}'</p>;
            return data.getFilteredByIds.map((products) => {
              return <ProductBagDetalies key={products.id} productItem={products} />;
            });
          }}
        </Query>
        {/* Total price, tax, quantity block */}
        <div className="productBagTotalPriceBlock">
          <div className="productBagTotalResult">
            <div className="productBagTaxRow">
              Tax 21%:
              <span>
                {symbol}
                {currentBagTax}
              </span>
            </div>
            <div className="productBagQuantityRow">
              Quantity:<span>{allCounts}</span>
            </div>
            <div className="productBagTotalPriceRow">
              Total:
              <span>
                {symbol}
                {currentBagCurrency}
              </span>
            </div>
          </div>
          <div className="productBagTotalOrderButton">
            <button>order</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductBag;

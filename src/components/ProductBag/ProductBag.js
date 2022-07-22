import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { CURRENCIES, GET_FILTERED_BY_ID } from '../../query/getProduct';
import { store } from '../../store/store';
import './ProductBag.css';
import ProductBagDetalies from './ProductBagDetalies/ProductBagDetalies';

export class ProductBag extends Component {
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

    const totalTax = (totalPrice * 0.21).toFixed(2);

    const allCounts = filteredListWithoutInStock
      .map((product) => product.count)
      .reduce((acc, cur) => acc + cur, 0);
    return (
      <div className="pb">
        <h1 className="pbMainTitle">Cart</h1>
        {/* Main list of taking products */}
        {filteredListWithoutInStock.map((curProd) => {
          return (
            <Query
              query={GET_FILTERED_BY_ID}
              variables={{
                id: curProd.id,
              }}>
              {({ data, error, loading }) => {
                if (loading) return <p>'Loading...'</p>;
                if (error) return <p>'Error! ${error.message}'</p>;
                return <ProductBagDetalies productItem={data.product} />;
              }}
            </Query>
          );
        })}
        {/* Total price, tax, quantity block */}
        <div className="pbTotalPriceBlock">
          <div className="pbTotalResult">
            <Query query={CURRENCIES}>
              {({ data, error, loading }) => {
                if (loading) return <p>'Loading...'</p>;
                if (error) return <p>'Error! ${error.message}'</p>;
                const currency = data.currencies.find((el) => el.label === currentLabel);
                return (
                  <div className="pbTaxRow">
                    Tax 21%:
                    <span>
                      {currency.symbol}
                      {totalTax}
                    </span>
                  </div>
                );
              }}
            </Query>
            <div className="pbQuantityRow">
              Quantity:<span>{allCounts}</span>
            </div>
            <Query query={CURRENCIES}>
              {({ data, error, loading }) => {
                if (loading) return <p>'Loading...'</p>;
                if (error) return <p>'Error! ${error.message}'</p>;
                const currency = data.currencies.find((el) => el.label === currentLabel);
                return (
                  <div className="pbTotalPriceRow">
                    Total
                    <span>
                      {currency.symbol}
                      {totalPrice}
                    </span>
                  </div>
                );
              }}
            </Query>
          </div>
          <div className="pbTotalOrderButton">
            <button>order</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductBag;

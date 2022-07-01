import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { GET_FILTERED_BY_IDS } from '../../query/getProduct';
import './ProductBag.css';
import ProductBagDetalies from './ProductBagDetalies/ProductBagDetalies';

export class ProductBag extends Component {
  constructor() {
    super();
    this.state = {
      amountOfProduct: 0,
      listOfTakingProduct: [],
      totalPrice: [],
      totalTax: [],
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.targetProduct.idOfTargetProducts.size !== state.listOfTakingProduct.length ||
      props.targetProduct.totalPrice.length !== state.totalPrice.length
    ) {
      return {
        numberOfProduct: [...props.targetProduct.idOfTargetProducts].length,
        listOfTakingProduct: [...props.targetProduct.idOfTargetProducts],
        totalPrice: props.targetProduct.totalPrice,
        amountOfProduct: props.targetProduct.numberOfProduct,
      };
    } else if (props.targetProduct.idOfTargetProducts.length === 0) {
      return {
        amountOfProduct: 0,
        totalPrice: [],
      };
    }
    return null;
  }
  // componentDidUpdate(prevState) {
  //   if (prevState.totalPrice === this.state.totalPrice) {
  //     const tax = [...this.state.totalPrice];
  //     const changedTax = tax.map((el) => el * 0.21);
  //     this.setState({
  //       ...this.state,
  //       totalTax: changedTax,
  //     });
  //   }
  // }

  componentWillUnmount() {
    this.setState((state) => {
      const amountOfTakingProduct = this.props.targetProduct.idOfTargetProducts.length;
      return {
        allCount: amountOfTakingProduct > 1 ? amountOfTakingProduct : 1,
        totalPrice: [],
        totalTax: [],
      };
    });
  }
  render() {
    const { convertIndex } = this.props.targetProduct.convertCurency;
    const { symbol } = this.props.targetProduct.convertCurency;
    const totalPrice = this.props.targetProduct.totalPrice
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);
    const currentCurency = convertIndex * totalPrice;
    const totalCartTax = this.props.targetProduct.totalTax
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);
    const currentCartTax = totalCartTax * convertIndex;
    return (
      <div className="productBag">
        <h2 className="productBagMainTitle">Cart</h2>
        {/* Main list of taking products */}
        <Query
          query={GET_FILTERED_BY_IDS}
          variables={{
            id: [...this.props.targetProduct.idOfTargetProducts],
          }}
          pollInterval={500}>
          {({ data, error, loading }) => {
            if (loading) return <p>'Loading...'</p>;
            if (error) return <p>'Error! ${error.message}'</p>;
            return data.getFilteredByIds.map((products) => {
              return (
                <ProductBagDetalies
                  key={products.id}
                  productItem={products}
                  productState={this.state}
                  targetProduct={this.props.targetProduct}
                  allCountHandler={this.allCountHandler}
                  totalIncreasePriceHandler={this.props.totalIncreasePriceHandler}
                  totalDecreasePriceHandler={this.props.totalDecreasePriceHandler}
                  deleteProductFromCart={this.props.deleteProductFromCart}
                />
              );
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
                {currentCartTax.toFixed(2)}
              </span>
            </div>
            <div className="productBagQuantityRow">
              Quantity:<span>{this.state.amountOfProduct}</span>
            </div>
            <div className="productBagTotalPriceRow">
              Total:
              <span>
                {symbol}
                {currentCurency.toFixed(2)}
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

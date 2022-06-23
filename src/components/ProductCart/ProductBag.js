import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { GET_FILTERED_BY_IDS } from '../../query/getProduct';
import './ProductBag.css';
import ProductBagDetalies from './ProductBagDetalies/ProductBagDetalies';

export class ProductBag extends Component {
  constructor() {
    super();
    this.state = {
      allCount: 1,
      totalPrice: [],
      totalTax: [],
    };
  }
  componentDidMount() {
    if (this.props.targetProduct.idOfTargetProducts.length > 1) {
      this.setState({
        allCount: this.props.targetProduct.idOfTargetProducts.length,
      });
    }
  }
  allCountHandler = (value) => {
    this.setState((state) => {
      return { allCount: state.allCount + value };
    });
  };
  totalIncreasePriceHandler = (value) => {
    console.log(value);
    this.setState((state) => ({
      totalPrice: state.totalPrice.concat([value]),
    }));
  };
  totalIncreaseTaxHandler = (value) => {
    this.setState((state) => ({
      totalTax: state.totalTax.concat([value]),
    }));
  };
  totalDecreasePriceHandler = (value) => {
    const newList = [...this.state.totalPrice];
    const decreased = newList.indexOf(value);
    newList.splice(decreased, 1);
    this.setState({
      totalPrice: newList,
    });
  };
  totalDecreaseTaxHandler = (value) => {
    const newList = [...this.state.totalTax];
    const decreased = newList.indexOf(value);
    newList.splice(decreased, 1);
    this.setState({
      totalTax: newList,
    });
  };
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
    const showTotalCartTax = Number(
      this.state.totalTax.reduce((acc, cur) => acc + cur, 0).toFixed(2),
    );
    const showTotalCartPrice = Number(
      this.state.totalPrice.reduce((acc, cur) => acc + cur, 0).toFixed(2),
    );
    return (
      <div className="productBag">
        <h2 className="productBagMainTitle">Cart</h2>
        {/* Main list of taking products */}
        <Query
          query={GET_FILTERED_BY_IDS}
          variables={{
            id: this.props.targetProduct.idOfTargetProducts,
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
                  allCountHandler={this.allCountHandler}
                  totalIncreasePriceHandler={this.totalIncreasePriceHandler}
                  totalIncreaseTaxHandler={this.totalIncreaseTaxHandler}
                  totalDecreasePriceHandler={this.totalDecreasePriceHandler}
                  totalDecreaseTaxHandler={this.totalDecreaseTaxHandler}
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
              <span>${showTotalCartTax}</span>
            </div>
            <div className="productBagQuantityRow">
              Quantity:<span>{this.state.allCount}</span>
            </div>
            <div className="productBagTotalPriceRow">
              Total:
              <span>${showTotalCartPrice}</span>
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

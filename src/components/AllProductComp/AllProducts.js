import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import Detalies from './ProductDetalies/Detalies';
import { Link } from 'react-router-dom';
import { GET_ALL_PRODUCTS, GET_FILTERED_BY_CATEGORY } from '../../query/getProduct';
import styles from './AllProducts.module.css';

export class AllProducts extends Component {
  constructor() {
    super();
    this.state = {
      queries: GET_ALL_PRODUCTS,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.state.categoryOfProducts !== prevProps.state.categoryOfProducts) {
      if (this.props.state.categoryOfProducts === 'all products') {
        this.setState({
          queries: GET_ALL_PRODUCTS,
        });
      } else {
        this.setState({
          queries: GET_FILTERED_BY_CATEGORY,
        });
      }
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <div className={styles.productList}>
          <Query
            query={this.state.queries}
            variables={{ category: this.props.state.categoryOfProducts }}>
            {({ loading, error, data }) => {
              if (loading) return <p>'Loading...'</p>;
              if (error) return <p>'Error! ${error.message}'</p>;
              const fiilteredData = data.getAllProducts || data.getFilteredByCategory;
              return fiilteredData.map((product) => (
                <div>
                  <Link to={`/${product.id}`}>
                    <Detalies
                      key={product.id}
                      product={product}
                      data={this.props}
                      onClickHandler={this.props.onClickHandler}
                    />
                  </Link>
                </div>
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default AllProducts;

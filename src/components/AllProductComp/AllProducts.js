import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { Link } from 'react-router-dom';

import styles from './AllProducts.module.css';
import { GET_ALL_PRODUCTS, GET_FILTERED_BY_CATEGORY } from '../../query/getProduct';
import Detalies from './ProductDetalies/Detalies';
import { store } from '../../store/store';

export class AllProducts extends Component {
  constructor() {
    super();
    this.state = {
      queries: GET_ALL_PRODUCTS,
      category: store.getState().categoryOfProducts,
    };
    store.subscribe(this.updateCategoryOfProducts);
  }
  updateCategoryOfProducts = () => {
    const newCategory = store.getState().categoryOfProducts;
    this.setState({
      ...this.state,
      category: newCategory,
    });
  };
  render() {
    const getQuery =
      store.getState().categoryOfProducts === 'all products'
        ? GET_ALL_PRODUCTS
        : GET_FILTERED_BY_CATEGORY;
    return (
      <div>
        <div className={styles.productList}>
          <Query query={getQuery} variables={{ category: this.state.category }}>
            {({ loading, error, data }) => {
              if (loading) return <p>'Loading...'</p>;
              if (error) return <p>'Error! ${error.message}'</p>;
              const fiilteredData = data.getAllProducts || data.getFilteredByCategory;
              return fiilteredData.map((product) => (
                <div>
                  <Link to={`/${product.id}`}>
                    <Detalies key={product.id} product={product} />
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

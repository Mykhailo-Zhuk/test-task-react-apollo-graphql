import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { Link } from 'react-router-dom';

import './AllProducts.css';
import { GET_FILTERED_BY_CATEGORY } from '../../query/getProduct';
import MainProductDetalies from './ProductDetalies/MainProductDetalies';
import { store } from '../../store/store';

class AllProducts extends Component {
  constructor() {
    super();
    this.state = {
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
    const category = store.getState().categoryOfProducts;
    return (
      <div>
        <div>
          <Query query={GET_FILTERED_BY_CATEGORY} variables={{ input: { title: `${category}` } }}>
            {({ loading, error, data }) => {
              if (loading) return <p>'Loading...'</p>;
              if (error) return <p>'Error! ${error.message}'</p>;
              return (
                <div>
                  <p className="navCategoriesName">{data.category.name}</p>
                  <div className="navProductList">
                    {data.category.products.map((product, index) => (
                      <Link to={`/${product.id}`}>
                        <MainProductDetalies key={index} product={product} />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
export default AllProducts;

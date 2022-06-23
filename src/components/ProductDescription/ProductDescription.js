import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { GET_PRODUCT_DESCRIPTION } from '../../query/getProduct';
import styles from './ProductDescription.module.css';

export class ProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      params: window.location.pathname.substring(1),
    };
  }
  // When click to getIdOfTargetProductHandler 'this.props.product.id' will put to the App state.
  getIdOfTargetProductHandler = () => {
    this.props.onClickHandler(this.state.params);
  };

  render() {
    return (
      <div>
        <Query
          query={GET_PRODUCT_DESCRIPTION}
          variables={{
            id: this.state.params,
          }}>
          {({ loading, error, data }) => {
            if (loading) return <p>'Loading...'</p>;
            if (error) return <p>'Error! ${error.message}'</p>;
            return (
              <div key={data.getProductDescription.id}>
                <div className={styles.configWrapper}>
                  {/* Left Block with 3 photos */}
                  <div className={styles.leftPhotoBlock}>
                    <div className={styles.leftPhotoItem}>
                      <img src={data.getProductDescription.image} alt="product" />
                    </div>
                    <div className={styles.leftPhotoItem}>
                      <img src={data.getProductDescription.image} alt="product" />
                    </div>
                    <div className={styles.leftPhotoItem}>
                      <img src={data.getProductDescription.image} alt="product" />
                    </div>
                  </div>
                  {/* Main block with 1 big photo */}
                  <div className={styles.mainPhotoBlock}>
                    <img src={data.getProductDescription.image} alt="product" />
                  </div>
                  {/* Config block with title, size button, color button, add product button, description */}
                  <div className={styles.photoConfigBlock}>
                    <div className={styles.configTitle}>{data.getProductDescription.title}</div>
                    <div className={styles.configSizeRow}>
                      <h3 className={styles.rowTitle}>size:</h3>
                      <ul className={styles.sizeRowList}>
                        {data.getProductDescription.sizes.map((element) => {
                          return (
                            <li key={element.id} className={styles.sizeRowItem}>
                              <button>{element.size}</button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className={styles.configColorRow}>
                      <h3 className={styles.rowTitle}>color:</h3>
                      <ul className={styles.colorRowList}>
                        {data.getProductDescription.colors.map((element) => {
                          return (
                            <li key={element.id} className={styles.colorRowItem}>
                              <button style={{ backgroundColor: `${element.color}` }}></button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className={styles.configCurrencyBlock}>
                      <h3 className={styles.rowTitle}>price:</h3>
                      <div className={styles.currencyItem}>${data.getProductDescription.price}</div>
                    </div>
                    <div className={styles.configAddToCartButton}>
                      <button onClick={this.getIdOfTargetProductHandler}>add to cart</button>
                    </div>
                    <div className={styles.configDescriptionBlock}>
                      {data.getProductDescription.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ProductDescription;

import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { GET_PRODUCT_DESCRIPTION } from '../../query/getProduct';
import { store } from '../../store/store';
import styles from './ProductDescription.module.css';

export class ProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      params: window.location.pathname.substring(1),
      priceOfProduct: 0,
      taxOfProduct: 0,
    };
  }

  // When click to getIdOfTargetProductHandler 'this.props.product.id' will put to the App state.
  render() {
    const { convertIndex, symbol } = store.getState().convertCurency;
    const totalPrice = this.state.priceOfProduct;
    const currentCurrency = (convertIndex * totalPrice).toFixed(2);
    const RenderedProduct = (
      <Query
        query={GET_PRODUCT_DESCRIPTION}
        variables={{
          id: this.state.params,
        }}
        onCompleted={(data) => {
          this.setState({
            ...this.state,
            priceOfProduct: data.getProductDescription.price,
            taxOfProduct: data.getProductDescription.price * 0.21,
          });
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
                          <li className={styles.sizeRowItem}>
                            <button>{element}</button>
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
                          <li className={styles.colorRowItem}>
                            <button style={{ backgroundColor: `${element}` }}></button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className={styles.configCurrencyBlock}>
                    <h3 className={styles.rowTitle}>price:</h3>
                    <div className={styles.currencyItem}>
                      {symbol}
                      {currentCurrency}
                    </div>
                  </div>
                  <div className={styles.configAddToCartButton}>
                    <button
                      onClick={() =>
                        store.dispatch({
                          type: 'GET_TARGET_PRODUCT',
                          targetProduct: {
                            id: Number(this.state.params),
                            count: 1,
                            price: this.state.priceOfProduct,
                            tax: this.state.taxOfProduct,
                          },
                        })
                      }>
                      add to cart
                    </button>
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
    );
    return <div>{RenderedProduct}</div>;
  }
}

export default ProductDescription;

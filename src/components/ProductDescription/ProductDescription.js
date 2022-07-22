import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { GET_FILTERED_BY_ID } from '../../query/getProduct';
import { store } from '../../store/store';
import './ProductDescription.css';

export class ProductDescription extends Component {
  constructor() {
    super();
    this.state = {
      params: window.location.pathname.substring(1),
      convertCurrency: store.getState().convertCurency,
    };
    store.subscribe(this.updateCurrency);
  }
  updateCurrency = () => {
    const newConvertCurrency = store.getState().convertCurency;
    this.setState({
      ...this.state,
      convertCurrency: newConvertCurrency,
    });
  };
  pdToggleClassHandler = (e) => {
    if (e.target) {
      const link = e.target;
      const attRowItem = link.closest('.attributesRowList').querySelectorAll('button');
      attRowItem.forEach((el) => {
        if (el === link) el.classList.toggle('selected');
      });
    }
  };
  // When click to getIdOfTargetProductHandler 'this.props.product.id' will put to the App state.
  render() {
    const RenderedProduct = (
      <Query
        query={GET_FILTERED_BY_ID}
        variables={{
          id: this.state.params,
        }}>
        {({ loading, error, data }) => {
          if (loading) return <p>'Loading...'</p>;
          if (error) return <p>'Error! ${error.message}'</p>;
          const getCurrentCurrency = data.product.prices.find(
            (el) => el.currency.label === this.state.convertCurrency.currentLabel,
          );
          return (
            <div>
              <div className="configWrapper">
                {/* Left Block with 3 photos */}
                <div className="leftPhotoBlock">
                  {data.product.gallery.map((photosLinks) => {
                    return (
                      <div className="leftPhotoItem">
                        <img
                          src={photosLinks}
                          onClick={() =>
                            this.setState({
                              mainPhoto: photosLinks,
                            })
                          }
                          alt="product"
                        />
                      </div>
                    );
                  })}
                </div>
                {/* Main block with 1 big photo */}
                <div className="mainPhotoBlock">
                  <img src={this.state.mainPhoto || data.product.gallery[0]} alt="product" />
                </div>
                {/* Config block with title, size button, color button, add product button, description */}
                <div className="photoConfigBlock">
                  <div className="configTitle">
                    <p className="configTitleBrand">{data.product.brand}</p>
                    <p className="configTitleName">{data.product.name}</p>
                  </div>
                  <div className="configattributesRow">
                    {data.product.attributes.map((element) => {
                      return (
                        <div>
                          <h3 className="rowTitle">{element.name}:</h3>
                          <ul className="attributesRowList" onClick={this.pdToggleClassHandler}>
                            {element.items.map((subelement) => {
                              if (subelement.value.includes('#')) {
                                return (
                                  <li className="attributesRowColorItem">
                                    <button
                                      style={{ backgroundColor: `${subelement.value}` }}></button>
                                  </li>
                                );
                              } else {
                                return (
                                  <li className="attributesRowItem">
                                    <button>{subelement.value}</button>
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                  <div className="configCurrencyBlock">
                    <h3 className="rowTitle">price:</h3>
                    <div className="currencyItem">
                      {getCurrentCurrency.currency.symbol}
                      {getCurrentCurrency.amount}
                    </div>
                  </div>
                  <div className="configAddToCartButton">
                    <button
                      onClick={() =>
                        store.dispatch({
                          type: 'GET_TARGET_PRODUCT',
                          targetProduct: {
                            id: this.state.params,
                            count: 1,
                            price: data.product.prices,
                            inStock: data.product.inStock,
                          },
                        })
                      }>
                      add to cart
                    </button>
                  </div>
                  <div className="configDescriptionBlock">{data.product.description}</div>
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

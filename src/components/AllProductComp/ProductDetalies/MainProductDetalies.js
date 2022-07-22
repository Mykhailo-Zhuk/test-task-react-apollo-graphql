import React, { Component } from 'react';
import { store } from '../../../store/store';
// import { store } from '../../../store/store';
import './MainProductDetalies.css';

class MainProductDetalies extends Component {
  constructor() {
    super();
    this.state = {
      // Display or disappear cartIcon and badgeIcon
      isHovered: false,
    };
  }
  // CartIcon and badgeIcon will display when mouse hovered product item
  onMouseHoverHandler = () => {
    this.setState({
      isHovered: true,
    });
  };
  // CartIcon and badgeIcon will disappeared when mouse went out from product item
  onMouseOutHandler = () => {
    this.setState({
      isHovered: false,
    });
  };

  render() {
    const [firstImage] = this.props.product.gallery;
    const takenCurrency = this.props.product.prices.find(
      (obj) => obj.currency.label === store.getState().convertCurency.currentLabel,
    );
    const inStock = this.props.product.inStock ? 'productItem inStock' : 'productItem';
    return (
      <div className="productWrapper">
        <div
          className={inStock}
          onMouseOver={this.onMouseHoverHandler}
          onMouseOut={this.onMouseOutHandler}>
          {/* Badge icon */}
          <div
            style={{ display: this.state.isHovered ? 'block' : 'none' }}
            className="badgeIcon"></div>
          {/* Cart icon */}
          <div
            style={{ display: this.state.isHovered ? 'block' : 'none' }}
            className="cartIcon"></div>
          <div className="productImage">
            <img src={firstImage} alt="product" />
          </div>
          <div className="productDetalies">
            <div className="productDetaliesTitle">{this.props.product.name}</div>
            <div className="productDetaliesPrice">
              {takenCurrency.currency.symbol} {takenCurrency.amount}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MainProductDetalies;

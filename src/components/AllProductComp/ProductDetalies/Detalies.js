import React, { Component } from 'react';
import { store } from '../../../store/store';
import './Detalies.css';

export class Detalies extends Component {
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
    const { convertIndex, symbol } = store.getState().convertCurency;
    const currentCurrency = (convertIndex * this.props.product.price).toFixed(2);
    return (
      <div className="productWrapper">
        <div
          className="productItem"
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
            <img src={this.props.product.image} alt="product" />
          </div>
          <div className="productDetalies">
            <div className="productDetaliesTitle">{this.props.product.title}</div>
            <div className="productDetaliesPrice">
              {symbol}
              {currentCurrency}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detalies;

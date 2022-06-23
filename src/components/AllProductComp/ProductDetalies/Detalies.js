import React, { Component } from 'react';
import './Detalies.css';
import badgeIcon from './icon/Badge.svg';
import cartIcon from './icon/Circle Icon.svg';

export class Detalies extends Component {
  constructor() {
    super();
    this.state = {
      // Display or disappear cartIcon and badgeIcon
      isHovered: false,
      // Display the amount of taken product
      idOfTargetProduct: 0,
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
    const { convertIndex } = this.props.data.state.convertCurency;
    const { symbol } = this.props.data.state.convertCurency;
    const currentCurency = convertIndex * this.props.product.price;
    return (
      <div className="productWrapper">
        <div
          className="productItem"
          onMouseOver={this.onMouseHoverHandler}
          onMouseOut={this.onMouseOutHandler}>
          {/* Badge icon */}
          <img
            src={badgeIcon}
            alt="badge"
            style={{ display: this.state.isHovered ? 'block' : 'none' }}
            className="badgeIcon"
          />
          {/* Cart icon */}
          <img
            src={cartIcon}
            alt="cartIcon"
            style={{ display: this.state.isHovered ? 'block' : 'none' }}
            className="cartIcon"
          />
          <div className="productImage">
            <img src={this.props.product.image} alt="product" />
          </div>
          <div className="productDetalies">
            <div className="productDetaliesTitle">{this.props.product.title}</div>
            <div className="productDetaliesPrice">
              {symbol}
              {currentCurency.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detalies;

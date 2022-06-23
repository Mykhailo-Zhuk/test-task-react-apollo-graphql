import React, { Component } from 'react';
import '../Navigation.css';

export default class ProductCartDetalies extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      priceOfProduct: 0,
    };
  }
  productAmountIncrease = () => {
    this.setState((state) => {
      return { counter: state.counter + 1 };
    });
    this.props.totalIncreasePriceHandler(this.state.priceOfProduct);
  };
  productAmountDecrease = () => {
    if (this.state.counter > 1) {
      this.setState((state) => {
        return { counter: state.counter - 1 };
      });
      this.props.totalDecreasePriceHandler(this.state.priceOfProduct);
    }
  };

  componentDidMount() {
    this.setState({
      priceOfProduct: Number(this.props.productItem.price),
    });
    this.props.totalDecreasePriceHandler(this.state.priceOfProduct);
  }
  getIdOfDeletedProduct = () => {
    this.props.deleteProductFromCart(this.props.productItem.id);
  };

  render() {
    return (
      <div className="productCartBlock">
        <div className="productCartConfig">
          <div className="productCartDescription">
            <p className="productCartTitle">{this.props.productItem.title}</p>
            <div className="productCartConfigCurrencyBlock">
              <div className="productCartCurrencyItem">${this.props.productItem.price}</div>
            </div>
            <div className="productCartConfigSizeRow">
              <p className="productCartRowTitle">Size:</p>
              <ul className="productCartSizeRowList">
                {this.props.productItem.sizes.map((element) => {
                  return (
                    <li key={element.id} className="productCartSizeRowItem">
                      <button>{element.size}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="productCartConfigColorRow">
              <p className="productCartRowTitle">Color:</p>
              <ul className="productCartColorRowList">
                {this.props.productItem.colors.map((element) => {
                  return (
                    <li key={element.id} className="productCartColorItem">
                      <button style={{ backgroundColor: `${element.color}` }}></button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="productCartAmountButtons">
            <button className="productCartAmountIncrease" onClick={this.productAmountIncrease}>
              +
            </button>
            <p className="productCartAmount">{this.state.counter}</p>
            <button className="productCartAmountDecrease" onClick={this.productAmountDecrease}>
              -
            </button>
          </div>
        </div>
        <div className="productCartImage">
          <img src={this.props.productItem.image} alt="target's product"></img>
        </div>
        <div className="productDeleteButton">
          <button onClick={this.getIdOfDeletedProduct}>+</button>
        </div>
      </div>
    );
  }
}

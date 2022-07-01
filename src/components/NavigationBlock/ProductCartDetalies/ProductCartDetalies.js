import React, { Component } from 'react';
import '../Navigation.css';

export default class ProductCartDetalies extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
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
    this.setState({ ...this.state, priceOfProduct: Number(this.props.productItem.price) });
    this.props.totalDecreasePriceHandler(this.state.priceOfProduct);
  }
  getIdOfDeletedProduct = () => {
    this.props.deleteProductFromCart(+this.props.productItem.id, this.state.priceOfProduct);
  };
  render() {
    const { convertIndex } = this.props.getCurrency.convertCurency;
    const { symbol } = this.props.getCurrency.convertCurency;
    const totalPrice = this.props.productItem.price;
    const currentCurency = convertIndex * totalPrice;
    return (
      <div className="productCartBlock">
        <div className="productCartConfig">
          <div className="productCartDescription">
            <p className="productCartTitle">{this.props.productItem.title}</p>
            <div className="productCartConfigCurrencyBlock">
              <div className="productCartCurrencyItem">
                {symbol}
                {currentCurency.toFixed(2)}
              </div>
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

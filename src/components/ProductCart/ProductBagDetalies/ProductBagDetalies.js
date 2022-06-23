import React, { Component } from 'react';
import '../ProductBag.css';
import vector from './icon/Vector.svg';

export default class ProductBagDetalies extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
      totalPrice: 0,
      totalTax: 0,
    };
  }
  productAmountIncrease = () => {
    this.setState((state) => {
      return {
        counter: state.counter + 1,
      };
    });
    this.props.allCountHandler(1);
    this.props.totalIncreasePriceHandler(this.state.totalPrice);
    this.props.totalIncreaseTaxHandler(this.state.totalTax);
  };
  productAmountDecrease = () => {
    if (this.state.counter !== 1) {
      this.setState((state) => {
        return {
          counter: state.counter - 1,
        };
      });
      this.props.allCountHandler(-1);
      this.props.totalDecreasePriceHandler(this.state.totalPrice);
      this.props.totalDecreaseTaxHandler(this.state.totalTax);
    }
  };
  componentDidMount() {
    this.setState((state, props) => {
      const price = props.productItem.price;
      return {
        totalPrice: Number(price.toFixed(2)),
        totalTax: Number((price * 0.21).toFixed(2)),
      };
    });
    // this.props.totalDecreasePriceHandler(this.state.totalPrice);
    // this.props.totalDecreaseTaxHandler(this.state.totalTax);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.productState.counter !== prevProps.productState.counter) {
      this.props.totalIncreasePriceHandler(this.state.totalPrice);
      this.props.totalIncreaseTaxHandler(this.state.totalTax);
    }
  }
  getIdOfDeletedProduct = () => {
    this.props.deleteProductFromCart(this.props.productItem.id);
  };

  render() {
    console.log(this.state, this.props);
    return (
      <div className="productBagBlock">
        {/* Left side with title, price, color, size and middle side with increase and decrease buttons*/}
        <div className="productBagConfig">
          <div className="productBagDescription">
            <p className="productBagTitle">{this.props.productItem.title}</p>
            <div className="productBagConfigCurrencyBlock">
              <div className="productBagCurrencyItem">${this.props.productItem.price}</div>
            </div>
            <div className="productBagConfigSizeRow">
              <p className="productBagRowTitle">Size:</p>
              <ul className="productBagSizeRowList">
                {this.props.productItem.sizes.map((element) => {
                  return (
                    <li key={element.id} className="productBagSizeRowItem">
                      <button>{element.size}</button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="productBagConfigColorRow">
              <p className="productBagRowTitle">Color:</p>
              <ul className="productBagColorRowList">
                {this.props.productItem.colors.map((element) => {
                  return (
                    <li key={element.id} className="productBagColorItem">
                      <button style={{ backgroundColor: `${element.color}` }}></button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="productBagAmountButtons">
            <button className="productBagAmountIncrease" onClick={this.productAmountIncrease}>
              +
            </button>
            <p className="productBagAmount">{this.state.counter}</p>
            <button className="productBagAmountDecrease" onClick={this.productAmountDecrease}>
              -
            </button>
          </div>
        </div>
        {/* Right with image and carets*/}
        <div className="productBagImage">
          <img src={this.props.productItem.image} alt="target's product"></img>
          <div className="productBagImageCaret">
            <div className="productBagImageCaretLeft">
              <img src={vector} alt="vector"></img>
            </div>
            <div className="productBagImageCaretRight">
              <img src={vector} alt="vector"></img>
            </div>
          </div>
        </div>
        <div className="productDeleteButton">
          <button onClick={this.getIdOfDeletedProduct}>+</button>
        </div>
      </div>
    );
  }
}

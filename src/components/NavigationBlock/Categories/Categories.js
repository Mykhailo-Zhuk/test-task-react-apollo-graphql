import React, { Component } from 'react';

import '../Navigation.css';

export class Categories extends Component {
  render() {
    return (
      <li className="navCategoryItem" data-categories={this.props.productCategory}>
        {this.props.productCategory}
      </li>
    );
  }
}

export default Categories;

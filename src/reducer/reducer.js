const defaultState = {
  targetProducts: [],
  toggleProductsList: false,
  toggleCurrencyList: false,
  categoryOfProducts: 'all products',
  convertCurency: { symbol: '$', convertIndex: 1 },
};

export const reducer = (state = defaultState, action) => {
  const body = document.querySelector('body');
  const overlay = document.querySelector('.overlay');
  const navProductsCart = document.querySelector('.navShowProductsCart');
  const currencyList = document.querySelector('.dolarSignUp');
  const navCurrencyCharacters = document.querySelector('.navCurrencyCharacters');

  switch (action.type) {
    // When you click to the icon button EmptyCart display will change from none to block and to <body> add class 'hidden'
    case 'TOGGLE_PRODUCTS_CART': {
      if (state.toggleProductsList) {
        body.classList.remove('hidden');
        overlay.classList.remove('active');
        navProductsCart.classList.remove('openProductCart');
      } else {
        body.classList.add('hidden');
        overlay.classList.add('active');
        navProductsCart.classList.add('openProductCart');
      }
      return { ...state, toggleProductsList: !state.toggleProductsList };
    }
    // When you click to the overlay classes 'active', 'hidden', 'openProductCart' will removed.
    case 'CHANGE_DISPLAY_TO_NONE': {
      if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        overlay.classList.remove('active');
        navProductsCart.classList.remove('openProductCart');
      }
      return { ...state, toggleProductsList: false };
    }
    // When you click to the dolar sign background will change (url in class 'signDown') and display currencies list
    case 'TOGGLE_CURRENCY_LIST': {
      if (state.toggleCurrencyList) {
        currencyList.classList.add('signDown');
        navCurrencyCharacters.classList.add('currencyListOpen');
      } else {
        currencyList.classList.remove('signDown');
        navCurrencyCharacters.classList.remove('currencyListOpen');
      }
      return { ...state, toggleCurrencyList: !state.toggleCurrencyList };
    }
    // When click button 'view bag' toggleProductsList will disappeared
    case 'LINK_TO_CART': {
      if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        overlay.classList.remove('active');
        navProductsCart.classList.remove('openProductCart');
      }
      return { ...state, toggleProductsList: false };
    }
    // Link to certain category when click one of the category in navigation
    case 'FILTERED_PRODUCTS': {
      return { ...state, categoryOfProducts: action.categoryOfProducts };
    }
    // Get new object with id, count, price, tax or count++
    case 'GET_TARGET_PRODUCT': {
      let product = state.targetProducts.find((prod) => prod.id === action.targetProduct.id);
      if (product) {
        product.count += 1;
      } else {
        return {
          ...state,
          targetProducts: state.targetProducts.concat([
            {
              id: action.targetProduct.id,
              count: 1,
              price: action.targetProduct.price,
              tax: action.targetProduct.tax,
            },
          ]),
        };
      }
      return { ...state };
    }
    // Convert all currency on site
    case 'GET_CONVERT_CURENCY': {
      const currency = action.convertCurency;
      if (currency === 'USD') {
        return { ...state, convertCurency: { symbol: '$', convertIndex: 1 } };
      } else if (currency === 'EUR') {
        return { ...state, convertCurency: { symbol: '€', convertIndex: 0.95 } };
      } else if (currency === 'JPY') {
        return { ...state, convertCurency: { symbol: '¥', convertIndex: 135.46 } };
      }
      return { ...state };
    }
    // Increase amount of product
    case 'INCREASE_AMOUNT': {
      let product = state.targetProducts.find((prod) => prod.id === action.id);
      if (product) {
        product.count += 1;
      }
      return { ...state };
    }
    // Decrease amount of product
    case 'DECREASE_AMOUNT': {
      let product = state.targetProducts.find((prod) => prod.id === action.id);
      if (product && product.count > 1) {
        product.count -= 1;
      }
      return { ...state };
    }
    // Delete product
    case 'DELETE_PRODUCT': {
      const listOfFiltredProducts = state.targetProducts.filter(
        (product) => product.id !== action.id,
      );
      return { ...state, targetProducts: listOfFiltredProducts };
    }
    default:
      return state;
  }
};

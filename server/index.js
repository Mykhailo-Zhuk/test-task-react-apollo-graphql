const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
let storeData = require('./fake-store-data');

const app = express();

app.use(cors());

const root = {
  getAllProducts: () => {
    return storeData;
  },
  getProductDescription: ({ id }) => {
    return storeData.find((product) => product.id == id);
  },
  deleteProduct: ({ id }) => {
    storeData = storeData.filter((product) => product.id !== id);
    return true;
  },
  createProduct: ({ input }) => {
    const product = {
      ...input,
    };
    storeData.push(product);
    return product;
  },
  getFilteredByCategory: ({ category }) => {
    return storeData.filter((product) => product.category == category);
  },
  getFilteredByIds: ({ ids }) => {
    const arrayOfIds = ids;
    return storeData.filter((product) => arrayOfIds.includes(product.id));
  },
};
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  }),
);

app.listen(5000, () => console.log('Server started on port 5000'));

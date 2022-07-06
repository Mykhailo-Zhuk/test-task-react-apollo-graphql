const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Products {
    id: ID
    title: String
    price: Float
    description: String
    category: String
    image: String
    sizes: [String]
    colors: [String]
}

type Query {
    getAllProducts: [Products]
    getProductDescription(id: ID): Products
    getFilteredByCategory(category: String!): [Products]
    getFilteredByIds(ids: [Int!]): [Products]
}
`);

module.exports = schema;

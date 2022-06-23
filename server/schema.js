const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Products {
    id: ID
    title: String
    price: Float
    description: String
    category: String
    image: String
    sizes: [Sizes]
    colors: [Colors]
}
type Sizes {
    id: ID
    size: String
}

type Colors {
    id: ID
    color: String
}

input UserInput {
    id: ID!
    title: String
    price: Float
    description: String
    category: String
    image: String
}

type Query {
    getAllProducts: [Products]
    getProductDescription(id: ID): Products
    getFilteredByCategory(category: String!): [Products]
    getFilteredByIds(ids: [Int!]): [Products]
}

type Mutation {
    createProduct(input: UserInput): Products
    deleteProduct(id: ID!): Boolean!
}
`);

module.exports = schema;

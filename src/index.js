import { GraphQLServer } from "graphql-yoga";

// graphQL Scalar Types : Strings, Boolean, Int, Float, ID(Like a primary key),

// Type definitions (schema)

// the useage of a ! means it will always return as the things it is ex: boolean has to be a boolean
const typeDefs = `
type Query {
  
  title: String!
  price: Float!
  releaseYear: Int
  rating: Float
  inStock: Boolean!

}
`;

// Resolvers

const resolvers = {
  Query: {
    title() {
      return "Gone Girl";
    },
    price() {
      return "9.92";
    },
    releaseYear() {
      return "2014";
    },
    rating() {
      return "8.4";
    },
    inStock() {
      return false;
    }
  }
};

const options = {
  port: 5000
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(options, ({ port }) => {
  console.log(`The server is up!, ${port}`);
});

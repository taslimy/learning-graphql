import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)

// the useage of a ! means it will always return as a string
const typeDefs = `
type Query {
  hello: String!,
  name: String!,
  location: String!,
  bio: String!
}
`;

// Resolvers

const resolvers = {
  Query: {
    hello() {
      return "Is this how it works?";
    },
    name() {
      return "Tas Tas";
    },
    location() {
      return "NYC BABY";
    },
    bio() {
      return "lorem ipsum about me stuff ";
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

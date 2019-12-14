import { GraphQLServer } from "graphql-yoga";

// graphQL Scalar Types : Strings, Boolean, Int, Float, ID(Like a primary key),

// Type definitions (schema)

// the useage of a ! means it will always return as the things it is ex: boolean has to be a boolean, or cannot be empty or incorrect type.
const typeDefs = `
type Query {
  greeting(name: String age: Int): String!
  add(numbers: [Float!]!): Float!
  grades: [Int!]!
  me: User!
  post: Post!

}

type User {
  id:  ID!
  name: String!
  email: String!
  age: Int

}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
}

`;

// Resolvers

const resolvers = {
  Query: {
    grades(parent, args, ctx, info) {
      return [98, 80, 93]
    },
    add(parent, args, ctx, info) {
      if(args.numbers.length <= 0) {
        return 0
      }

      //[4,5,6,7,12]
      return args.numbers.reduce((acc, curr) => {
        return acc + curr
      })
    },
    greeting(parent, args, ctx, info) {
      if ((args.name, args.age)) {
        return `Hello, ${args.name}! Your are ${args.age} old!`;
      } else {
        return "Hello!";
      }
    },
    me() {
      return {
        id: "12394",
        name: "Tas",
        email: "taslimer@gmail.com",
        age: "25"
      };
    },
    post() {
      return {
        id: "1234",
        title: "A book",
        body: "Lorem Ipsum sum sum sum nro eugh mena",
        published: false
      };
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

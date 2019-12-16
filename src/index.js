import { GraphQLServer } from "graphql-yoga";

// graphQL Scalar Types : Strings, Boolean, Int, Float, ID(Like a primary key),

// Type definitions (schema)

// the useage of a ! means it will always return as the things it is ex: boolean has to be a boolean, or cannot be empty or incorrect type.

// Fake users
const users = [
  {
    id: 1,
    name: "Tas",
    email: "tas@tas.me",
    age: 25
  },
  {
    id: 2,
    name: "Sarah",
    email: "sarah@example.com",
    age: 22
  },
  {
    id: 3,
    name: "james",
    email: "james@example.com"
  },
  {
    id: 4,
    name: "dust",
    email: "dust@example.com"
  }
];

// Fake posts

const posts = [
  {
    id: 1,
    title: "Lorem Ipsum",
    body: "Quisque iaculis a leo quis viverra",
    published: true,
    author: 1
  },
  {
    id: 2,
    title: " Sed sagittis quam",
    body: ". Curabitur vitae leo sollicitudin",
    published: false,
    author: 1
  },
  {
    id: 3,
    title: "efficitur nunc",
    body: "Proin non dolor porta, congue lacus eget",
    published: false,
    author: 2
  },
  {
    id: 4,
    title: "the story of dust",
    body: "it all started when the fire nation attacked.",
    published: true,
    author: 4
  }
];

const typeDefs = `
type Query {
  users(query: String): [User!]!
  me: User!
  post(query: String): [Post!]!
 

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
  author: User!
}

`;

// Resolvers

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(x => {
        return x.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    post(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(x => {
        return x.title
          .toLowerCase()
          .includes(
            args.query.toLowerCase() ||
              x.body.toLowerCase().includes(args.query.toLowerCase())
          );
      });
    },
    me() {
      return {
        id: "12394",
        name: "Tas",
        email: "taslimer@gmail.com",
        age: "25"
      };
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(x => {
        return x.id === parent.author;
      });
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

import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';

// Type Definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    add(a: Float!, b: Float!): Float!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
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
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.position}`;
      }
      return 'Hello!';
    },
    add(parent, args, ctx, info) {
      return args.a + args.b;
    },
    me() {
      return {
        id: uuidv4(),
        name: 'Phong',
        email: 'phongctnguyen.bby',
        age: 26,
      };
    },
    post() {
      return {
        id: uuidv4(),
        title: 'my first post',
        body: 'hello world',
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('The server is up!');
});

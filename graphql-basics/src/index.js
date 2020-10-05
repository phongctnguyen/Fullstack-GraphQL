import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';

// Demo User Data
let users = [
  {
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27,
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
  },
];

let posts = [
  {
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1',
  },
  {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '1',
  },
  {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2',
  },
];

let comments = [
  {
    id: '102',
    text: 'This worked well for me. Thanks!',
    author: '3',
    post: '10',
  },
  {
    id: '103',
    text: 'Glad you enjoyed it.',
    author: '1',
    post: '10',
  },
  {
    id: '104',
    text: 'This did no work.',
    author: '2',
    post: '11',
  },
  {
    id: '105',
    text: 'Nevermind. I got it to work.',
    author: '1',
    post: '11',
  },
];

// Type Definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
    scalarString: String!
  }

  type Mutation {
    createUser(data: createUserInput!): User!
    createPost(data: createPostInput!): Post!
    createComment(data: createCommentInput): Comment!
  }

  input createUserInput {
    name: String!
    email: String!
    age: Int
  }

  input createPostInput {
    title: String!
    body: String!
    published: Boolean
    author: ID!
  }

  input createCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },

    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },

    comments(parent, args, ctx, info) {
      if (!args.query) {
        return comments;
      }

      return comments.filter((comment) => {
        return comment.text.toLowerCase().includes(args.query.toLowerCase());
      });
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

    scalarString() {
      return 'Hello World';
    },
  },

  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);

      if (emailTaken) {
        throw new Error('Email taken!!!');
      }

      const user = {
        id: uuidv4(),
        ...args.data,
      };

      users = [...users, user];

      return user;
    },

    createPost(parent, args, ctx, info) {
      const userExist = users.some((user) => user.id === args.data.author);

      if (!userExist) {
        throw new Error('User not found!');
      }

      const post = {
        id: uuidv4(),
        ...args.data,
      };

      posts = [...posts, post];

      return post;
    },

    createComment(parent, args, ctx, info) {
      const userExist = users.some((user) => user.id === args.data.author);

      if (!userExist) {
        throw new Error('User not found!');
      }

      const postExistAndPublished = posts.some(
        (post) => post.id === args.data.post && post.published === true
      );

      if (!postExistAndPublished) {
        throw new Error('Post not found or not published');
      }

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      comments = [...comments, comment];

      return comment;
    },
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },

    post(parent, args, ctx, info) {
      return posts.find((postEl) => postEl.id === parent.post);
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

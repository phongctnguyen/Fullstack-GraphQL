'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prismaBinding = require('prisma-binding');

var _resolvers = require('./resolvers');

var prisma = new _prismaBinding.Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'x8m968m8mvtpk',
  fragmentReplacements: _resolvers.fragmentReplacements
});

exports.default = prisma;

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({
//     id: authorId,
//   });

//   if (!userExists) {
//     throw new Error('User not found');
//   }

//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId,
//           },
//         },
//       },
//     },
//     '{author {id name email posts {id title published}}}'
//   );

//   return post.author;
// };

// createPostForUser('ckg80x6hs003k0747km6hq2dk', {
//   title: 'Best book to read',
//   body: 'The God Of War',
//   published: true,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({
//     id: postId,
//   });

//   if (!postExists) {
//     throw new Error('Post not found');
//   }

//   const post = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postId,
//       },
//       data,
//     },
//     '{author {id name email posts {id title published}}}'
//   );

//   return post.author;
// };

// updatePostForUser('ckg9i3vor006k0747au98z7jk', {
//   body: 'GraphQL bootcamp ',
//   published: false,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'GraphQL 101',
//         body: '',
//         published: false,
//         author: {
//           connect: {
//             id: 'ckg80x6hs003k0747km6hq2dk',
//           },
//         },
//       },
//     },
//     '{id title body published}'
//   )
//   .then((data) => {
//     console.log(data);
//     return prisma.query.users(null, '{ id name posts { id title } }');
//   })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation
//   .updatePost(
//     {
//       where: {
//         id: 'ckg9i3vor006k0747au98z7jk',
//       },
//       data: {
//         body: 'Good GraphQL 101 Course',
//         published: true,
//       },
//     },
//     '{id}'
//   )
//   .then((data) => {
//     console.log(data);
//     return prisma.query.posts(null, '{id title body published}');
//   })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });
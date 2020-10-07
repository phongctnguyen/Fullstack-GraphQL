const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },

  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    });
  },

  comments(parent, args, { db }, info) {
    if (!args.query) {
      return db.comments;
    }

    return db.comments.filter((comment) => {
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
};

export { Query as default };

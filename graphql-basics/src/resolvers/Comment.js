const Comment = {
  author(parent, args, { db }, info) {
    return db.users.find((user) => user.id === parent.author);
  },

  post(parent, args, { db }, info) {
    return db.posts.find((postEl) => postEl.id === parent.post);
  },
};

export { Comment as default };

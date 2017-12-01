const userControllers = require("../controllers/userControllers");
const postControllers = require("../controllers/postControllers");

module.exports = app => {
  //add your new routes here

  app
    .route("/login") // login
    .post(userControllers.loginUser);

  app
    .route("/new-user") // create new user
    .post(userControllers.newUser);

  app
    .route("/posts") // display all blog posts
    .get(postControllers.displayAllPosts);

  app
    .route("/new-post") // create new post
    .post(postControllers.newPost);

  app
    .route("/posts/:id") // find specific post and add comments
    .get(postControllers.findOnePost)
    .put(postControllers.addCommentToPost);
};

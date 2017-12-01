const mongoose = require("mongoose");

const Post = require("../models/postModels");
const Comment = require("../models/commentModels");

const STATUS_USER_ERROR = 422;

const newPost = (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content, author });

  newPost
    .save()
    .then(createdPost => {
      res.json(createdPost);
    })
    .catch(err => {
      res.status(500).json({ err });
      return;
    });
};

const displayAllPosts = (req, res) => {
  Post.find()
    .select("title")
    .exec()
    .then(posts => {
      if (posts.length === null) throw new Error();
      res.json(posts);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ err });
    });
};

const findOnePost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: { path: "author", select: "username" }
    })
    .exec()
    .then(onePost => {
      if (onePost === null) throw new Error();
      res.json(onePost);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ err });
    });
};

const addCommentToPost = (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  const newComment = new Comment({ text, author, _parent: id });

  newComment.save().catch(err => {
    res.status(STATUS_USER_ERROR).json({ err });
  });

  Post.findByIdAndUpdate(id, { $push: { comments: newComment._id } })
    .exec()
    .then(post => {
      if (post === null) throw new Error();
      res.json(post);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json({ err });
      return;
    });
};

module.exports = {
  newPost,
  displayAllPosts,
  findOnePost,
  addCommentToPost
};

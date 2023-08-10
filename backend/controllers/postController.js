import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const addPost = asyncHandler(async (req, res) => {
  const { user, title, body, updated } = req.body;

  const post = await Post.create({
    user,
    title,
    body,
    updated,
  });

  if (post) {
    res.status(201).json({
      _id: post.id,
      user,
      title,
      body,
      updated,
    });
  } else {
    res.status(400);
    throw new Error("Wrong data");
  }
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404);
    throw new Error("Posts were not found");
  }
});

const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
    throw new Error("Data were not found");
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const { user, title, body, updated } = req.body;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { user, title, body, updated: true },
    { new: true }
  );

  if (updatedPost) {
    res.status(200).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const deletedPost = await Post.findByIdAndDelete(postId);

  if (deletedPost) {
    res.status(200).json(deletedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export { addPost, getPosts, getPostById, updatePost, deletePost };

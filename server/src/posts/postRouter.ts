import { Router } from "express";
import * as postController from "./postController";
const router = Router();

// Create New post
router
  .post("/", postController.createPostHandler)
  // Get all posts
  .get("/", postController.getManyPostsHandler)
  // Get single post
  .get("/:postId", postController.getSinglePostHandler)
  // Update a post
  .put("/:postId", postController.updatePostHandler)
  // Delete a post
  .delete("/:postId", postController.deletePostHandler);

export default router;

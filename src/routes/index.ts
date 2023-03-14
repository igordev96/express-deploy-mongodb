import express from "express";
import { auth } from "../auth/auth";
import PostsController from "../controllers/posts";
import UsersController from "../controllers/users";

const router = express.Router();

const postsController = new PostsController();
const usersController = new UsersController();

router
  .route("/posts")
  .get(auth, postsController.getPosts)
  .post(auth, postsController.createPost);

// router.route("/posts/:id").delete(auth, postsController.deletePost);

router.route("/users").post(usersController.createUser).post();
router.route("/users/login").post(usersController.loginUser);

export default router;

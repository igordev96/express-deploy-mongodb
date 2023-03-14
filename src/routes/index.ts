import express from "express";
import { auth } from "../auth/auth";
import TasksController from "../controllers/tasks";
import UsersController from "../controllers/users";

const router = express.Router();

const tasksController = new TasksController();
const usersController = new UsersController();

router
  .route("/tasks")
  .get(auth, tasksController.getTasks)
  .post(auth, tasksController.createTask);

router.route("/tasks/:id").delete(auth, tasksController.deleteTask);

router.route("/users").post(usersController.createUser).post();
router.route("/users/login").post(usersController.loginUser);

export default router;

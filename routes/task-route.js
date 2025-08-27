import express from "express";
import validateRequest from "../middlewares/validator.js";
import {
  TaskValidator,
  updateTaskValidator,
} from "../validators/task-validator.js";
import {
  completeTask,
  createTask,
  deleteCompletedTask,
  deleteTask,
  EditTask,
  getAllTasks,
  getCompletedTask,
  getSingleTask,
} from "../controllers/task-controller.js";

const TaskRouter = express.Router();

TaskRouter.route("/")
  .post(validateRequest(TaskValidator), createTask)
  .get(getAllTasks);
TaskRouter.route("/complete")
  .put(completeTask)
  .get(getCompletedTask)
  .delete(deleteCompletedTask);
TaskRouter.route("/single")
  .get(getSingleTask)
  .delete(deleteTask)
  .put(validateRequest(updateTaskValidator), EditTask);
export default TaskRouter;

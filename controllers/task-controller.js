import { StatusCodes } from "http-status-codes";
import TaskModel from "../models/task.js";
import userModel from "../models/user.js";
import { notFoundError, unauthenticatedError } from "../errors/index.js";
import categoryModel from "../models/category.js";

const createTask = async (req, res, next) => {
  const payload = req.body;
  const { id } = req.user;
  const { categoryId } = req.query;
  try {
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      const err = new notFoundError("category does not exist");
      return next(err);
    }

    const task = new TaskModel({ ...payload, user: id, category: categoryId });
    const savetask = await task.save();

    const userInfo = await userModel.findById(id);
    userInfo.task.push(savetask._id);
    await userInfo.save();

    res.status(StatusCodes.CREATED).json({ msg: "created", task: savetask });
  } catch (error) {
    next(error);
  }
};
const getAllTasks = async (req, res, next) => {
  const { id } = req.user;
  try {
    const userTasks = await TaskModel.find({ user: id })
      .select("-_id -__v")
      .sort("deadline")
      .populate("category", "-_id name");
    if (!userTasks) {
      const err = new notFoundError("You have not created any task");
      return next(err);
    }

    return res
      .status(StatusCodes.OK)
      .json({ tasks: userTasks.length, userTasks });
  } catch (error) {
    next(error);
  }
};
const getSingleTask = async (req, res, next) => {
  const { id } = req.user;
  const { taskId } = req.query;

  try {
    const task = await TaskModel.findById(taskId).populate(
      "category",
      "-_id name"
    );
    if (!task) {
      const err = new notFoundError("Task does not exist");
      return next(err);
    }
    if (id !== task.user.toString()) {
      const err = new unauthenticatedError("You cannot get this task");
      return next(err);
    }
    if (Date.now() > task.deadline) {
      const updated = await TaskModel.findByIdAndUpdate(
        taskId,
        {
          status: "in-completed",
        },
        { new: true }
      ).populate("category", "-_id name");
      return res.status(StatusCodes.OK).json(updated);
    }

    return res.status(StatusCodes.ACCEPTED).json({ msg: task });
  } catch (error) {
    return next(error);
  }
};
const completeTask = async (req, res, next) => {
  const { id } = req.user;
  const { taskId } = req.query;

  try {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      const err = new notFoundError("Task does not exist");
      return next(err);
    }
    if (id !== task.user.toString()) {
      const err = new unauthenticatedError("You cannot complete this task");
      return next(err);
    }
    if (Date.now() > task.deadline) {
      await TaskModel.findByIdAndUpdate(taskId, {
        status: "in-completed",
      });
      return res
        .status(StatusCodes.OK)
        .json({ msg: `${task.title} has exceeded its deadline` });
    }
    const complete = await TaskModel.findByIdAndUpdate(taskId, {
      status: "completed",
    });

    return res
      .status(StatusCodes.ACCEPTED)
      .json({ msg: `You've completed ${complete.title}` });
  } catch (error) {
    return next(error);
  }
};
const getCompletedTask = async (req, res, next) => {
  const { id } = req.user;
  const { status } = req.query;

  try {
    const task = await TaskModel.aggregate([
      {
        $match: {
          status: status,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          pipeline: [{ $project: { _id: 0, name: 1 } }],
          as: "category",
        },
      },
      {
        $sort: { deadline: 1 },
      },
      {
        $limit: 10,
      },
    ]);
    if (!task) {
      const err = new notFoundError("You don't have any completed task");
      return next(err);
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "These are your completed tasks", task });
  } catch (error) {
    return next(error);
  }
};
const deleteTask = async (req, res, next) => {
  const { id } = req.user;
  const { taskId } = req.query;

  try {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      const err = new notFoundError("Task not found");
      return next(err);
    }

    const deleted = await TaskModel.findByIdAndDelete(taskId);

    const userInfo = await userModel.findById(id);
    userInfo.task.pull(deleted._id);
    await userInfo.save();

    return res.status(StatusCodes.ACCEPTED).json({ msg: "task deleted" });
  } catch (error) {
    return next(error);
  }
};

const deleteCompletedTask = async (req, res, next) => {
  const { id } = req.user;
  const { status } = req.query;

  try {
    const tasks = await TaskModel.find({ status, user: id });
    if (tasks.length === 0) {
      const err = new notFoundError("You don't have any completed task");
      return next(err);
    }
    await TaskModel.deleteMany({ status, user: id });

    const TaskIds = tasks.map((task) => task._id);
    console.log(TaskIds);

    await userModel.findByIdAndUpdate(id, {
      $pull: { task: { $in: TaskIds } },
    });

    res.status(StatusCodes.OK).json({ msg: "tasks deleted" });
  } catch (error) {
    return next(error);
  }
};
const EditTask = async (req, res, next) => {
  const { id } = req.user;
  const { taskId } = req.query;
  const payload = req.body;

  try {
    const task = await TaskModel.findOne({ _id: taskId, user: id });
    if (!task) {
      const err = new notFoundError("Task does not exist");
      return next(err);
    }
    const edited = await TaskModel.findByIdAndUpdate(taskId, payload, {
      new: true,
    }).populate("category", "-_id name");

    return res
      .status(StatusCodes.ACCEPTED)
      .json({ msg: "Task Edited Successfully", edited });
  } catch (error) {
    return next(error);
  }
};
export {
  createTask,
  getAllTasks,
  completeTask,
  getSingleTask,
  getCompletedTask,
  deleteCompletedTask,
  deleteTask,
  EditTask,
};

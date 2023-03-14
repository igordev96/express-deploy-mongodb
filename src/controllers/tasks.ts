import { Request, Response } from "express";
import { TaskDTO } from "../models/task";

let tasks: TaskDTO[] = [
  {
    createdBy: "Igor",
    id: "same-id",
    title: "New task 1",
  },
];

class TasksController {
  getTasks(req: Request, res: Response) {
    try {
      res.status(200).json(tasks);
    } catch (e: any) {
      res.status(400).json({
        msg: e?.message,
      });
    }
  }

  createTask(req: Request, res: Response) {
    try {
      if (!req.body.createdBy || !req.body.title) {
        throw new Error("The task must have a title and createdBy");
      } else {
        const newTask = new TaskDTO(req.body.title, req.body.createdBy);
        tasks.push(newTask);
        res.status(201).json({
          id: newTask.id,
        });
      }
    } catch (e: any) {
      res.status(400).json({
        msg: e?.message,
      });
    }
  }

  deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (tasks.some((task) => task.id === id)) {
        tasks = tasks.filter((task) => task.id !== id);
        res.status(200).json({
          id,
        });
      } else {
        throw new Error(`No tasks found with id: ${id}`);
      }
    } catch (e: any) {
      res.status(400).json({
        msg: e?.message,
      });
    }
  }
}

export default TasksController;

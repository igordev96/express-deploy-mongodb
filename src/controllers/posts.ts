import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class PostsController {
  async getPosts(req: Request, res: Response) {
    try {
      const postsDb = await prisma.post.findMany({
        where: {
          authorNickname: req.body.authorNickname,
        },
      });
      res.status(200).json(postsDb);
    } catch (e: any) {
      res.status(400).json({
        msg: e?.message,
      });
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      if (!req.body.authorNickname || !req.body.title || !req.body.content) {
        throw new Error("The task must have a title, an author and a content");
      } else {
        const newPost = await prisma.post.create({
          data: {
            authorNickname: req.body.authorNickname,
            title: req.body.title,
            content: req.body.content,
          },
        });
        res.status(201).json({
          id: newPost.id,
        });
      }
    } catch (e: any) {
      res.status(400).json({
        msg: e?.message,
      });
    }
  }

  // deletePost(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;
  //     if (tasks.some((task) => task.id === id)) {
  //       tasks = tasks.filter((task) => task.id !== id);
  //       res.status(200).json({
  //         id,
  //       });
  //     } else {
  //       throw new Error(`No tasks found with id: ${id}`);
  //     }
  //   } catch (e: any) {
  //     res.status(400).json({
  //       msg: e?.message,
  //     });
  //   }
  // }
}

export default PostsController;

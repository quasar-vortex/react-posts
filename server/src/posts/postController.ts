import { RequestHandler } from "express";
import { Post } from "../types/Post";
import db from "../config/db";

export const createPostHandler: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, content } = req.body as Partial<Post>;
    console.log(title, content);
    const [result] = await db.execute(
      `insert into posts (title, content) values (?, ?)`,
      [title, content]
    );
    const insertId = (result as any).insertId;
    res.status(201).json({
      message: "Created post",
      code: 201,
      data: { title, content, id: insertId },
    });
    return;
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getSinglePostHandler: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.postId;
    const [result] = await db.query(
      `select id, title, content from posts where id = ?;`,
      [id]
    );
    res.status(200).json({
      message: "Queried posts",
      code: 200,
      data: result,
    });
    return;
  } catch (error) {
    next(error);
  }
};
export const getManyPostsHandler: RequestHandler = async (req, res, next) => {
  try {
    const [result] = await db.query(`select id, title, content from posts;`);
    res.status(200).json({
      message: "Queried posts",
      code: 200,
      data: result,
    });
    return;
  } catch (error) {
    next(error);
  }
};
export const updatePostHandler: RequestHandler = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body as Partial<Post>;
    const [qResult] = await db.query(`select id from posts where id = ?`, [
      postId,
    ]);
    const result = qResult as Post[];
    if (result.length > 0) {
      await db.execute(`update posts set title = ?, content = ? where id = ?`, [
        title,
        content,
        postId,
      ]);
      res.status(200).json({
        message: "Updated Post",
        code: 200,
        data: { id: postId, title, content },
      });
    } else {
      res
        .status(400)
        .json({ message: "Post not found", code: 400, data: null });
      return;
    }
  } catch (error) {
    next(error);
  }
};
export const deletePostHandler: RequestHandler = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const [result] = await db.execute(`delete from posts where id = ?`, [
      postId,
    ]);
    console.log(result);
    res.status(200).json({ message: "Post Deleted", data: null, code: 200 });
  } catch (error) {
    next(error);
  }
};

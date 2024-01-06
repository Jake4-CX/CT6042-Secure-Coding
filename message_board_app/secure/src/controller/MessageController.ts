import type { NextFunction, Response, Request } from "express";
import { Database } from "../utils/db.server";
import createError = require("http-errors");

export class MessageController {

  async allMessages(request: Request, response: Response, next: NextFunction) {

    const messages = await Database.getInstance().query("SELECT messages.id, messages.messageTitle, messages.messageContent, " +
      " messages.createdAt, messages.updatedAt, users.id AS userId, users.userName, users.createdAt AS userCreatedAt, " +
      " users.updatedAt AS userUpdatedAt FROM messages JOIN users ON messages.userId = users.id ORDER BY messages.createdAt DESC; ");

    // Transform into correct data format
    const formattedMessages = messages.map(message => ({
      id: message.id,
      messageTitle: message.messageTitle,
      messageContent: message.messageContent,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      user: {
        userId: message.userId,
        userName: message.userName,
        userCreatedAt: message.userCreatedAt,
        userUpdatedAt: message.userUpdatedAt
      }
    })) as Message[];

    response.json(formattedMessages);
  }

  async addMessage(request: Request, response: Response, next: NextFunction) {

    const { messageTitle, messageContent } = request.body;

    const user = request.user;

    // Using parameterized query to prevent SQL Injection
    const message = await Database.getInstance().query(
      "INSERT INTO messages (messageTitle, messageContent, userId) VALUES (?, ?, ?)",
      [messageTitle, messageContent, user.id] // values / parameters to be passed to the query
    );
    response.json({
      message: "Message created successfully"
    });

  }

  async updateMessage(request: Request, response: Response, next: NextFunction) {

    const { messageTitle, messageContent } = request.body;
    const { id } = request.params;

    const user = request.user;

    // Check if user owns the message
    const messageCheck = await Database.getInstance().query(
      "SELECT * FROM messages WHERE id = ? AND userId = ?",
      [id, user.id]
    );

    if (!messageCheck || messageCheck.length === 0) {
      return next(createError(401, "Message not found"));
    }

    const message = await Database.getInstance().query(
      "UPDATE messages SET messageTitle = ?, messageContent = ? WHERE id = ? AND userId = ?",
      [messageTitle, messageContent, id, user.id]
    );

    if (message.affectedRows === 0) {
      return next(createError(401, "Message not found"));
    }

    response.json({
      message: "Message updated successfully"
    });

  }

  async deleteMessage(request: Request, response: Response, next: NextFunction) {

    const { id } = request.params;

    const user = request.user;

    // Check if user owns the message
    const messageCheck = await Database.getInstance().query(
      "SELECT * FROM messages WHERE id = ? AND userId = ?",
      [id, user.id]
    );

    if (!messageCheck || messageCheck.length === 0) {
      return next(createError(401, "Message not found"));
    }

    const message = await Database.getInstance().query(
      "DELETE FROM messages WHERE id = ? AND userId = ?",
      [id, user.id]
    );

    if (message.affectedRows === 0) {
      return next(createError(401, "Message not found"));
    }

    response.json({
      message: "Message deleted successfully"
    });

  }

  async getMessage(request: Request, response: Response, next: NextFunction) {

    const { id } = request.query;

    // Using parameterized query to prevent SQL Injection
    const query = "SELECT messages.id, messages.messageTitle, messages.messageContent, " +
      " messages.createdAt, messages.updatedAt, users.id AS userId, users.userName, users.createdAt AS userCreatedAt, " +
      " users.updatedAt AS userUpdatedAt FROM messages JOIN users ON messages.userId = users.id WHERE messages.id = ?";

    const message = await Database.getInstance().query(
      query,
      [id]
    );

    if (!message || message.length === 0) {
      return next(createError(401, "Message not found"));
    }

    // Transform into correct data format
    const formattedMessage = message.map(message => ({
      id: message.id,
      messageTitle: message.messageTitle,
      messageContent: message.messageContent,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      user: {
        userId: message.userId,
        userName: message.userName,
        userCreatedAt: message.userCreatedAt,
        userUpdatedAt: message.userUpdatedAt
      }
    })) as Message[];

    response.json(formattedMessage[0]);

  }
}
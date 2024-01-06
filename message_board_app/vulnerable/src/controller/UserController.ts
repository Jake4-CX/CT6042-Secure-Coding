import { NextFunction, Response, Request } from "express";
import { Database } from "../utils/db.server";
import createError = require("http-errors");
import { generateToken } from "../utils/tokenUtil";

export class UserController {

  async loginUser(request: Request, response: Response, next: NextFunction) {

    const { userEmail, userPassword } = request.body;

    // Vulnerable to SQL Injection
    const user = await Database.getInstance().query("SELECT * FROM users WHERE userEmail = '" + userEmail + "' AND userPassword = '" + userPassword + "'") as User[];

    if (!user || user.length === 0) {
      return next(createError(400, "User not found"));
    }

    const userData = user[0];
    delete userData.userPassword;

    response.status(200).json({
      message: "User logged in successfully",
      user: userData
    });
  }

  async registerUser(request: Request, response: Response, next: NextFunction) {

    const { userName, userEmail, userPassword } = request.body;

    // Vulnerable to SQL Injection
    const user = await Database.getInstance().query("SELECT * FROM users WHERE userName = '" + userName + "' OR userEmail = '" + userEmail + "'");

    if (user && user.length > 0) {
      return next(createError(400, "User already exists"));
    }

    try {
      await Database.getInstance().query("INSERT INTO users (userName, userEmail, userToken, userPassword) VALUES ('" + userName + "', '" + userEmail + "', '" + generateToken(16) + "', '" + userPassword + "')");
      response.status(200).json({
        message: "User created successfully"
      });

    } catch (error) {
      console.log(error);
      return next(createError(500, "User creation failed"));
    }

  }
}
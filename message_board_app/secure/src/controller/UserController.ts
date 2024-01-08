import { NextFunction, Response, Request } from "express";
import { Database } from "../utils/db.server";
import createError = require("http-errors");
import { generateToken } from "../utils/tokenUtil";
import bcrypt = require("bcrypt");
import { verifyRecaptcha } from "../utils/recaptcha";

export class UserController {

  async loginUser(request: Request, response: Response, next: NextFunction) {

    const { userEmail, userPassword, recaptchaToken } = request.body;

    // Validate recaptcha token
    if (!(await verifyRecaptcha(recaptchaToken))) {
      return next(createError(400, "Recaptcha validation failed"));
    }

    // Using parameterized query to prevent SQL Injection
    const user = await Database.getInstance().query(
      "SELECT * FROM users WHERE userEmail = ?",
      [userEmail] // values / parameters to be passed to the query
    ) as User[];

    if (!user || user.length === 0) {
      return next(createError(400, "User not found"));
    }

    const userData = user[0];

    // Check if password matches
    const passwordMatch = await bcrypt.compare(userPassword, userData.userPassword);

    if (!passwordMatch) return next(createError(400, "Password incorrect"));

    delete userData.userPassword;

    response.status(200).json({
      message: "User logged in successfully",
      user: userData
    });
  }

  async registerUser(request: Request, response: Response, next: NextFunction) {

    const { userName, userEmail, userPassword, recaptchaToken } = request.body;

    // Validate recaptcha token
    if (!(await verifyRecaptcha(recaptchaToken))) {
      return next(createError(400, "Recaptcha validation failed"));
    }

    const user = await Database.getInstance().query(
      "SELECT * FROM users WHERE userName = ? OR userEmail = ?",
      [userName, userEmail]
    );

    if (user && user.length > 0) {
      return next(createError(400, "User already exists"));
    }

    try {
      await Database.getInstance().query(
        "INSERT INTO users (userName, userEmail, userToken, userPassword) VALUES (?, ?, ?, ?)",
        [userName, userEmail, generateToken(16), await bcrypt.hash(userPassword, 10)]
      );
      response.status(200).json({
        message: "User created successfully"
      });

    } catch (error) {
      console.log(error);
      return next(createError(500, "User creation failed"));
    }

  }
}
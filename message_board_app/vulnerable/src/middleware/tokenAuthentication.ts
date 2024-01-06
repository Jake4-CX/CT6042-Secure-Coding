import { NextFunction, Request, Response } from "express";
import createError = require("http-errors");
import { validateTokenFormat } from "../utils/tokenUtil";
import { Database } from "../utils/db.server";

export async function tokenAuthentication(request: Request, response: Response, next: NextFunction) {

  if (!request.headers["authorization"]) {
    return next(createError(401, "No authorization token provided!"));
  }

  const token = request.headers["authorization"].split(" ")[1];
  request.token = token;

  if (!token) return next(createError(401, "No authorization token provided!"));

  if (validateTokenFormat(token, 16) === false) {
    return next(createError(401, "Invalid token"));
  }

  try {
    // Vulnerable to SQL Injection
    const user = await Database.getInstance().query("SELECT * FROM users WHERE userToken = '" + token + "'") as User[];

    if (user && user.length >= 1) {
      request.user = user[0];
    } else {
      return next(createError(401, "Invalid token"));
    }

  } catch (error) {
    return next(createError(401, "Invalid token"));
  }

  next();
}
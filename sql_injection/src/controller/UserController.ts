import { NextFunction, Response, Request } from "express";


export class UserController {

  async loginUser(request: Request, response: Response, next: NextFunction) {

    response.status(200).send("Login User");
  }
}
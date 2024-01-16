import type { NextFunction, Response, Request } from "express";

export class MaliciousController {

  
  async yoinkAccount(request: Request, response: Response, next: NextFunction) {
    const { user } = request.body;

    // Extract and send details to database

    response.json({
      message: `Yoinked account`,
      user: user
    });
  }
}
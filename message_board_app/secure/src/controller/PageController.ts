import { NextFunction, Response, Request } from "express";

export class PageController {

  async homePage(request: Request, response: Response, next: NextFunction) {
    response.render("pages/landing", {
      layout: "../views/layouts/layout",
    })
  }

  async loginPage(request: Request, response: Response, next: NextFunction) {
    response.render("pages/login", {
      layout: "../views/layouts/layout",
    })
  }

  async registerPage(request: Request, response: Response, next: NextFunction) {
    response.render("pages/register", {
      layout: "../views/layouts/layout",
    })
  }

  async editMessagePage(request: Request, response: Response, next: NextFunction) {
    response.render("pages/editMessage", {
      layout: "../views/layouts/layout",
      messageId: request.params.id
    })
  }

}
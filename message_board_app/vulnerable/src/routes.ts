import { body, param, query } from "express-validator";
import { UserController } from "./controller/UserController";
import { PageController } from "./controller/PageController";
import { MessageController } from "./controller/MessageController";

export const Routes = [
  {
    method: "POST",
    route: "/users/login",
    controller: UserController,
    action: "loginUser",
    authorization: false,
    validation: [
      body("userEmail").isString().withMessage("Email is not valid"),
      body("userPassword").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long")
    ]
  }, {
    method: "POST",
    route: "/users/register",
    controller: UserController,
    action: "registerUser",
    authorization: false,
    validation: [
      body("userName").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
      body("userEmail").isEmail().withMessage("Email is not valid"),
      body("userPassword").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long")
    ]
  }, {
    method: "GET",
    route: "",
    controller: PageController,
    action: "homePage",
    authorization: false,
    validation: []
  }, {
    method: "GET",
    route: "/login",
    controller: PageController,
    action: "loginPage",
    authorization: false,
    validation: []
  }, {
    method: "GET",
    route: "/register",
    controller: PageController,
    action: "registerPage",
    authorization: false,
    validation: []
  }, {
    method: "GET",
    route: "/message/:id/edit",
    controller: PageController,
    action: "editMessagePage",
    authorization: false,
    validation: [
      param("id").notEmpty().withMessage("ID must be a number")
    ]
  }, {
    method: "GET",
    route: "/message",
    controller: MessageController,
    action: "getMessage",
    authorization: false,
    validation: [
      query("id").notEmpty().withMessage("ID must be a number")
    ]
  }, {
    method: "GET",
    route: "/messages",
    controller: MessageController,
    action: "allMessages",
    authorization: false,
    validation: []
  }, {
    method: "POST",
    route: "/messages",
    controller: MessageController,
    action: "addMessage",
    authorization: true,
    validation: [
      body("messageTitle").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
      body("messageContent").isLength({ min: 5 }).withMessage("Content must be at least 5 characters long")
    ]
  },
  {
    method: "PUT",
    route: "/messages/:id",
    controller: MessageController,
    action: "updateMessage",
    authorization: true,
    validation: [
      body("messageTitle").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
      body("messageContent").isLength({ min: 5 }).withMessage("Content must be at least 5 characters long")
    ]
  }, {
    method: "DELETE",
    route: "/messages/:id",
    controller: MessageController,
    action: "deleteMessage",
    authorization: true,
    validation: [
      param("id").isNumeric().withMessage("ID must be a number")
    ]
  }
] as RouteType[];
import { body } from "express-validator";
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
      body("userEmail").isEmail().withMessage("Email is not valid"),
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
    route: "/messages",
    controller: MessageController,
    action: "allMessages",
    authorization: false,
    validation: []
  }
] as RouteType[];
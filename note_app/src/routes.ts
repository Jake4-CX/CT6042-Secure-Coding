import { UserController } from "./controller/UserController";

export const Routes = [
  {
    method: "GET",
    route: "/",
    controller: UserController,
    action: "loginUser",
    authorization: false,
    validation: [

    ]
  }
] as RouteType[];
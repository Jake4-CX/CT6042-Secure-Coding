import bodyParser = require("body-parser");
import * as express from "express";
import { type Express, type NextFunction } from "express";
import { validationResult } from "express-validator";
import morgan = require("morgan");
import { Routes } from "./routes";

export default class App {

  public app: Express = express();

  public async start() {

    this.app.use(morgan("tiny"));
    this.app.use(bodyParser.json());
    this.app.use(this.handleError);

    this.setupRoutes(Routes, "");

    // API endpoints:
    //  - Register,
    //  - Login
    //  - AddNote - POST, incoming data: title, content. (Contains XSS Exploit)
    //  - GetNotes
    //  - DeleteNote - GET, id included within the URL.

  }

  private async setupRoutes(routes: RouteType[], prefix: string) {
    const router = express.Router();

    routes.forEach((route) => {
      (router as any)[route.method](route.route,
        ...route.validation,
        // route.authorization === true ? jwtAuthentication : [],
        async (req: express.Request, res: express.Response, next: NextFunction) => {
          try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }

            const result = await (new route.controller())[route.action](req, res, next);
            if (result) {
              res.json(result);
            }
          } catch (error) {
            next(error);
          }
        })

    });

    this.app.use(prefix, router);
  }


  public handleError(error: any, req: express.Request, res: express.Response, next: NextFunction) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }

}
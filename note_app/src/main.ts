import bodyParser = require("body-parser");
import * as express from "express";
import { type Express, type NextFunction } from "express";
import { validationResult } from "express-validator";
import morgan = require("morgan");
import { Routes } from "./routes";
import expressEjsLayouts = require("express-ejs-layouts");

export default class App {

  public app: Express = express();

  public async start() {

    this.app.use(morgan("tiny"));
    this.app.use(bodyParser.json());

    this.app.set('layout', '../views/layouts/main');
    this.app.set('view engine', 'ejs');

    this.app.use(express.static('public'));

    this.app.use(expressEjsLayouts);

    this.setupRoutes(Routes, "");

    this.app.use(this.handleError);

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

      (router)[route.method.toLowerCase()](route.route,
        ...route.validation,
        route.authorization === true ? [] : [],
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
    if (res.headersSent) {
      return next(error);
    }

    res.status(error.statusCode || 500).send({ message: error.message });
  }
}
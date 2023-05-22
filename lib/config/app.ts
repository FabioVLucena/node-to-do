import * as express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { TaskRoutes } from "../routes/task_routes";
import { CommonRoutes } from "../routes/common_routes";

class App {
   public app: express.Application;
   private task_routes: TaskRoutes = new TaskRoutes();
   private common_routes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express.default();
      this.config();
      this.task_routes.route(this.app);
      this.common_routes.route(this.app);
   }
    
   private config(): void {
      this.app.use(cors({
         origin: '*'
      }));
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
   }
}

export default new App().app;
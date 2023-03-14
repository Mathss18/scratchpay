import express from "express";
import { router } from "./router";

export class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  public start(callback: () => void) {
    this.app.listen(this.port, callback);
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
  }

  public routes() {
    this.app.use(router);
  }
}

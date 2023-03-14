import express from "express";
import { router } from "./router";
import { Server as HttpServer } from "http";

export class Server {
  public app: express.Application;
  private connection: HttpServer;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  public start(callback = () => {}) {
    this.connection = this.app.listen(this.port, callback);
    this.middlewares();
    this.routes();
  }

  public stop(callback = () => {}) {
    this.connection.close(callback);
  }

  private middlewares() {
    this.app.use(express.json());
  }

  public routes() {
    this.app.use(router);
  }
}

import express from "express";
import { router } from "./router";
import cors from 'cors'
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
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(router);
  }
}

import express from "express";

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
  }

  private middlewares() {
    this.app.use(express.json());
  }
}

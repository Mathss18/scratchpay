import { Server } from "./server";
import dotenv from "dotenv";
dotenv.config();

export class Main {
  private server: Server;
  constructor() {
    this.server = new Server(3000);
  }
  public boot(): void {
    this.server.start(() => {
      console.log("Server is running on port 3000");
    });
  }
  public shutdown(): void {
    this.server.stop(() => {
      console.log("Server is shutting down");
    });
  }
}

const main = new Main();
main.boot();

import { Server } from "./server";

const server = new Server(3000);

server.start(() => {
  console.log("Server started on port 3000");
  server.app.get("/", (req, res) => {
    res.send("Hello World!");
  });
});


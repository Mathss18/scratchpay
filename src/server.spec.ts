import express from "express";
import { Server } from "./server";
import request from "supertest";

describe("Server", () => {
  let server: Server;
  beforeAll(() => {
    server = new Server(3001);
    server.start();
  });

  afterAll(() => {
    server.stop();
  });

  describe("POST /api/clinics", () => {
    it("should return a 200 status code", async () => {
      const response = await request(server.app).post("/api/clinics");
      expect(response.status).toBe(200);
    });

    it("should return a 404 status code", async () => {
      const response = await request(server.app).get("/api/clinics");
      expect(response.status).toBe(404);
    });
  });
});

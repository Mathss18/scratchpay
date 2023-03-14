import { Router } from "express";
import { clinicController } from "./controller/clinic.controller";

const router: Router = Router();

router.get("/", (req, res) => clinicController.index(req, res));

export { router };

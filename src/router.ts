import { Request, Router } from "express";
import { rateLimit } from "express-rate-limit";
import { ClinicController } from "./controllers/clinic.controller";
import { DentalClinicsProvider } from "./providers/dental-clinics.provider";
import { PetClinicsProvider } from "./providers/pet-clinics.provider";
import { ClinicService } from "./services/clinic.service";

const router: Router = Router();

const PROVIDERS = [new DentalClinicsProvider(), new PetClinicsProvider()];
const clinicController = new ClinicController(new ClinicService(PROVIDERS));

const apiLimiter = rateLimit({
  windowMs: +process.env.RATE_LIMIT_WINDOW_IN_SECONDS * 1000,
  max: +process.env.MAX_REQUESTS_PER_WINDOW,
  keyGenerator: (req: Request) => req.ip,
  handler: (_, res) => {
    res.status(429).json({
      message: "Too many requests, please try again later.",
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(apiLimiter);

router.post("/api/clinics", (req, res) => clinicController.index(req, res));

export { router };

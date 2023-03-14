import { Router } from "express";
import { ClinicController } from "./controllers/clinic.controller";
import { DentalClinicsProvider } from "./providers/dental-clinics.provider";
import { PetClinicsProvider } from "./providers/pet-clinics.provider";
import { ClinicService } from "./services/clinic.service";

const router: Router = Router();

const PROVIDERS = [new DentalClinicsProvider(), new PetClinicsProvider()];
const clinicController = new ClinicController(new ClinicService(PROVIDERS));

router.post("/api/clinics", (req, res) => clinicController.index(req, res));

export { router };

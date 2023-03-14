import { Request, Response } from "express";
import { ZodError } from "zod";
import { SearchClinicsDto } from "../dtos/search-clinics.dto";
import { StateHelper } from "../helpers/states";
import { ClinicService } from "../services/clinic.service";

export class ClinicController {
  constructor(private clinicService: ClinicService) {
    this.clinicService = clinicService;
  }

  public async index(req: Request, res: Response): Promise<void> {
    try {
      const { name, state, from, to } = req.body;

      const options = {
        name: name?.toString(),
        state: state ? StateHelper.getStateName(state.toString()) : undefined,
        from: from?.toString(),
        to: to?.toString(),
      };
      SearchClinicsDto.validate(options);

      res
        .status(200)
        .json({ clinics: await this.clinicService.searchClinics(options) });
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ error: err.issues[0].message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  }
}

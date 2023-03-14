import { Request, Response } from "express";

interface Clinic {
  name: string;
  state: string;
  availability: {
    from: string;
    to: string;
  };
}

class ClinicController {
  private providers: string[];

  constructor() {
    this.providers = [
      "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json",
      "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json",
    ];
  }

  public async index(req: Request, res: Response): Promise<void> {
    try {
      const clinicRequests = this.providers.map((provider) =>
        fetch(provider).then((res) => res.json())
      );
      const clinicArrays = await Promise.all(clinicRequests);
      const clinics: Clinic[] = clinicArrays.flat();

      res.json({ clinics });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch clinics" });
    }
  }
}

export const clinicController = new ClinicController();

import { Response } from "express";
import { ClinicService } from "../services/clinic.service";
import { FakeClinicsProviderMock } from "../__mocks__/fake-clinics.provider";
import { ClinicController } from "./clinic.controller";

describe("Clinic Controller Test", () => {
  let clinicService: ClinicService;
  let clinicController: ClinicController;

  beforeEach(() => {
    const PROVIDERS_MOCK = [new FakeClinicsProviderMock()];

    clinicService = new ClinicService(
      PROVIDERS_MOCK
    ) as jest.Mocked<ClinicService>;
    clinicController = new ClinicController(clinicService);
  });

  describe("Clinic Controller Tests", () => {
    const res = {
      status: jest.fn((x) => res),
      json: jest.fn((x) => x),
    } as unknown as Response;

    it("should fetch all clinics and return them as JSON", async () => {
      const expected = [
        {
          name: "Fake Clinic",
          state: "Alaska",
          availability: {
            from: "10:00",
            to: "19:30",
          },
        },
        {
          name: "Good Health Home",
          state: "Florida",
          availability: {
            from: "15:00",
            to: "20:00",
          },
        },
      ];

      // spy on the searchClinics method
      jest.spyOn(clinicService, "searchClinics").mockResolvedValue(expected);

      const req: any = { body: {} };
      await clinicController.index(req, res);

      expect(res.status).toHaveBeenLastCalledWith(200);
      expect(res.json).toHaveBeenLastCalledWith({ clinics: expected });
    });

    it("should fetch all clinics with name = 'Fake' and return them as JSON", async () => {
      const expected = [
        {
          name: "Fake Clinic",
          state: "Alaska",
          availability: {
            from: "10:00",
            to: "19:30",
          },
        },
      ];

      // spy on the searchClinics method
      // jest.spyOn(clinicService, "searchClinics").mockResolvedValue(expected);

      const req: any = { body: { name: "Fake" } };
      await clinicController.index(req, res);

      // expect(clinicService.searchClinics).toHaveBeenLastCalledWith(undefined, undefined, undefined, undefined);
      expect(res.json).toHaveBeenLastCalledWith({ clinics: expected });
    });

    it("should fetch all clinics with state = 'Alaska' and return them as JSON", async () => {
      const expected = [
        {
          name: "Fake Clinic",
          state: "Alaska",
          availability: {
            from: "10:00",
            to: "19:30",
          },
        },
      ];

      // spy on the searchClinics method
      jest.spyOn(clinicService, "searchClinics").mockResolvedValue(expected);

      const req: any = { body: { state: "Alaska" } };
      await clinicController.index(req, res);

      expect(clinicService.searchClinics).toHaveBeenLastCalledWith({
        state: "Alaska",
        from: undefined,
        name: undefined,
        to: undefined,
      });
      expect(res.json).toHaveBeenLastCalledWith({ clinics: expected });
    });

    it("should fetch all clinics with state = 'AK' and return them as JSON", async () => {
      const expected = [
        {
          name: "Fake Clinic",
          state: "Alaska",
          availability: {
            from: "10:00",
            to: "19:30",
          },
        },
      ];

      // spy on the searchClinics method
      jest.spyOn(clinicService, "searchClinics").mockResolvedValue(expected);

      const req: any = { body: { state: "AK" } };
      await clinicController.index(req, res);

      expect(clinicService.searchClinics).toHaveBeenLastCalledWith({
        state: "Alaska",
        from: undefined,
        name: undefined,
        to: undefined,
      });
      expect(res.json).toHaveBeenLastCalledWith({ clinics: expected });
    });

    it("should throw an error if state has less than 2 chars.", async () => {
      const req: any = { body: { state: "a" } };
      await clinicController.index(req, res);

      expect(res.status).toHaveBeenLastCalledWith(400);
      expect(res.json).toHaveBeenLastCalledWith({
        error: "State must have at least 2 characters.",
      });
    });

    it("should throw an error if from is in wrong format (HH:mm:ss)", async () => {
      const req: any = { body: { from: "10:00:00" } };
      await clinicController.index(req, res);

      expect(res.status).toHaveBeenLastCalledWith(400);
      expect(res.json).toHaveBeenLastCalledWith({
        error: "From must follow this format: HH:mm (00:00 -> 23:59).",
      });
    });

    it("should throw an error if from is in wrong format (24:00)", async () => {
      const req: any = { body: { from: "24:00" } };
      await clinicController.index(req, res);

      expect(res.status).toHaveBeenLastCalledWith(400);
      expect(res.json).toHaveBeenLastCalledWith({
        error: "From must follow this format: HH:mm (00:00 -> 23:59).",
      });
    });

    it("should throw an error if to is in wrong format (HH:mm:ss)", async () => {
      const req: any = { body: { to: "10:00:00" } };
      await clinicController.index(req, res);

      expect(res.status).toHaveBeenLastCalledWith(400);
      expect(res.json).toHaveBeenLastCalledWith({
        error: "To must follow this format: HH:mm (00:00 -> 23:59).",
      });
    });

    it("should throw an error if to is in wrong format (24:00)", async () => {
      const req: any = { body: { to: "24:00" } };
      await clinicController.index(req, res);

      expect(res.status).toHaveBeenLastCalledWith(400);
      expect(res.json).toHaveBeenLastCalledWith({
        error: "To must follow this format: HH:mm (00:00 -> 23:59).",
      });
    });

    it("should throw an error if body is wrong", async () => {
      const req: any = { wrong: "wrong" };
      await clinicController.index(req, res);

      expect(res.status).toHaveBeenLastCalledWith(500);
    });
  });
});

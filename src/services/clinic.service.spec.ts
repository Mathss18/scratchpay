import { ClinicService } from "../services/clinic.service";
import { FakeClinicsProviderMock } from "../__mocks__/fake-clinics.provider";

describe("Clinic Service Tests", () => {
  let clinicService: ClinicService;

  beforeEach(() => {
    const PROVIDERS_MOCK = [new FakeClinicsProviderMock()];
    clinicService = new ClinicService(PROVIDERS_MOCK);
  });

  describe("Clinic Service Tests", () => {
    it("should fetch all clinics of providers", async () => {
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

      const result = await clinicService.getClinics();

      expect(result).toEqual(expected);
    });

    it("should fetch all clinics of providers that matches all requirements", async () => {
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

      const result = await clinicService.searchClinics({
        name: "Fake Clinic",
        state: "Alaska",
        from: "10:00",
        to: "19:30",
      });

      expect(result).toEqual(expected);
    });

    it("should fetch no clinics of providers", async () => {
      const expected = [];

      const result = await clinicService.searchClinics({
        name: "Fake Clinic",
        state: "Wrong",
        from: "10:00",
        to: "19:30",
      });

      expect(result).toEqual(expected);
    });

    it("should fetch no clinics of providers", async () => {
      const expected = [];

      const result = await clinicService.searchClinics({
        from: "23:58",
        to: "23:59",
      });

      expect(result).toEqual(expected);
    });
  });
});

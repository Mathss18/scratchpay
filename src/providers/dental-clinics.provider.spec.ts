import { DentalClinicsProvider } from "./dental-clinics.provider";

describe("ClinicController", () => {
  let dentalClinicProvider: DentalClinicsProvider;

  beforeEach(() => {
    dentalClinicProvider = new DentalClinicsProvider();
  });

  describe("Dental Clinics Provider Test", () => {
    const mockRespose = [
      {
        name: "Good Health Home",
        stateName: "Alaska",
        availability: {
          from: "10:00",
          to: "19:30",
        },
      },
      {
        name: "Mayo Clinic",
        stateName: "Florida",
        availability: {
          from: "09:00",
          to: "20:00",
        },
      },
    ];
    const mockResposeNormalized = [
      {
        name: "Good Health Home",
        state: "Alaska",
        availability: {
          from: "10:00",
          to: "19:30",
        },
      },
      {
        name: "Mayo Clinic",
        state: "Florida",
        availability: {
          from: "09:00",
          to: "20:00",
        },
      },
    ];

    it("should fetch all clinics of provider", async () => {
      const clinics = await dentalClinicProvider.getClinics();
      expect(Array.isArray(clinics)).toBe(true);
    });

    it("should fetch all clinics of provider", async () => {
      jest
        .spyOn(dentalClinicProvider, "getClinics")
        .mockResolvedValue(mockRespose);
      const clinics = await dentalClinicProvider.getClinics();
      expect(clinics).toEqual(mockRespose);
    });

    it("should normalize all clinics of provider", async () => {
      jest
        .spyOn(dentalClinicProvider, "getClinics")
        .mockResolvedValue(mockRespose);
      const clinics = await dentalClinicProvider.getClinics();
      const normalizedClinics = dentalClinicProvider.normalize(clinics);
      expect(normalizedClinics).toEqual(mockResposeNormalized);
    });
  });
});

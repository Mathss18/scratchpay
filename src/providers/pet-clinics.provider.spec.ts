import { PetClinicsProvider } from "./pet-clinics.provider";

describe("ClinicController", () => {
  let petClinicProvider: PetClinicsProvider;

  beforeEach(() => {
    petClinicProvider = new PetClinicsProvider();
  });

  describe("Pet Clinics Provider Test", () => {
    const mockRespose = [
      {
        clinicName: "Good Health Home",
        stateCode: "Alaska",
        opening: {
          from: "10:00",
          to: "19:30",
        },
      },
      {
        clinicName: "Mayo Clinic",
        stateCode: "Florida",
        opening: {
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
      const clinics = await petClinicProvider.getClinics();
      expect(Array.isArray(clinics)).toBe(true);
    });

    it("should fetch all clinics of provider", async () => {
      jest
        .spyOn(petClinicProvider, "getClinics")
        .mockResolvedValue(mockRespose);
      const clinics = await petClinicProvider.getClinics();
      expect(clinics).toEqual(mockRespose);
    });

    it("should normalize all clinics of provider", async () => {
      jest
        .spyOn(petClinicProvider, "getClinics")
        .mockResolvedValue(mockRespose);
      const clinics = await petClinicProvider.getClinics();
      const normalizedClinics = petClinicProvider.normalize(clinics);
      expect(normalizedClinics).toEqual(mockResposeNormalized);
    });
  });
});

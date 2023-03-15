import { Clinic } from "../providers/base-provider.provider";

interface FakeClinic {
  name: string;
  stateName: string;
  availability: {
    from: string;
    to: string;
  };
}

export class FakeClinicsProviderMock {
  public readonly uri = "";
  private clinics = [
    {
      name: "Fake Clinic",
      stateName: "Alaska",
      availability: {
        from: "10:00",
        to: "19:30",
      },
    },
    {
      name: "Good Health Home",
      stateName: "Florida",
      availability: {
        from: "15:00",
        to: "20:00",
      },
    },
  ];

  public async getClinics(): Promise<FakeClinic[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.clinics);
      }, 100);
    });
  }

  public normalize(clinics: FakeClinic[]): Clinic[] {
    return clinics.map((clinic) => {
      return {
        name: clinic.name,
        state: clinic.stateName,
        availability: clinic.availability,
      };
    });
  }
}

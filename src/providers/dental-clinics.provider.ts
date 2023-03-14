import { BaseProvider, Clinic } from "./base-provider.provider";

interface DentalClinic {
  name: string;
  stateName: string;
  availability: {
    from: string;
    to: string;
  };
}

export class DentalClinicsProvider implements BaseProvider<DentalClinic> {
  public readonly uri =
    "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";
  private clinics: Promise<DentalClinic[]>;

  public async getClinics(): Promise<DentalClinic[]> {
    const response = await fetch(this.uri);
    this.clinics = response.json();
    return this.clinics;
  }

  public normalize(clinics: DentalClinic[]): Clinic[] {
    return clinics.map((clinic) => {
      return {
        name: clinic.name,
        state: clinic.stateName,
        availability: clinic.availability,
      };
    });
  }
}

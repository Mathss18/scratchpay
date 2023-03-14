import { StateHelper } from "../helpers/states";
import { BaseProvider, Clinic } from "./base-provider.provider";

interface PetClinic {
  clinicName: string;
  stateCode: string;
  opening: {
    from: string;
    to: string;
  };
}

export class PetClinicsProvider implements BaseProvider<PetClinic> {
  public readonly uri =
    "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json";
  private clinics: Promise<PetClinic[]>;

  public async getClinics(): Promise<PetClinic[]> {
    const response = await fetch(this.uri);
    this.clinics = response.json();
    console.log("[PET] MAKING API CALL");
    return this.clinics;
  }

  public normalize(clinics: PetClinic[]): Clinic[] {
    return clinics.map((clinic) => {
      return {
        name: clinic.clinicName,
        state: StateHelper.getStateName(clinic.stateCode),
        availability: clinic.opening,
      };
    });
  }
}

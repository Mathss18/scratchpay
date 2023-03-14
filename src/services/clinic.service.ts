import cacheManager from "../cache/cache-manager";
import { SearchClinicsOptions } from "../dtos/search-clinics.dto";
import { BaseProvider, Clinic } from "../providers/base-provider.provider";

export class ClinicService {
  protected readonly CACHE_KEY = "clinics";
  protected readonly CACHE_TTL = 600; // Time in seconds | 10 minutes

  constructor(private providers: BaseProvider<unknown>[]) {
    this.providers = providers;
  }

  public async getClinics(): Promise<Clinic[]> {
    const cachedClinics = cacheManager.get(this.CACHE_KEY);
    if (cachedClinics) {
      return cachedClinics;
    }
    const clinicRequests = this.providers.map((provider) =>
      provider.getClinics().then((clinics) => provider.normalize(clinics))
    );
    const clinics = await Promise.all(clinicRequests);

    cacheManager.set(this.CACHE_KEY, clinics.flat(), this.CACHE_TTL);
    return clinics.flat();
  }

  public async searchClinics(options: SearchClinicsOptions): Promise<Clinic[]> {
    const { name, state, from, to } = options;
    const clinics = await this.getClinics();

    return clinics.filter((clinic) => {
      if (name && !clinic.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }
      if (state && clinic.state.toLowerCase() !== state.toLowerCase()) {
        return false;
      }
      if (from && to) {
        const currentDate = new Date().toISOString().slice(0, 10);
        const clinicFrom = new Date(
          `${currentDate}T${clinic.availability.from}`
        );
        const clinicTo = new Date(`${currentDate}T${clinic.availability.to}`);
        const searchFrom = new Date(`${currentDate}T${from}`);
        const searchTo = new Date(`${currentDate}T${to}`);
        if (searchFrom < clinicFrom || searchTo > clinicTo) {
          return false;
        }
      }

      return true;
    });
  }
}

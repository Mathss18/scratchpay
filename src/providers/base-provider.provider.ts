export interface Clinic {
  name: string;
  state: string;
  availability: {
    from: string;
    to: string;
  };
}

export interface BaseProvider<T> {
  getClinics(): Promise<T[]>;
  normalize(clinics: T[]): Clinic[];
}

import { z } from "zod";

const SearchClinicsOptions = z.object({
  name: z.string().optional(),
  state: z
    .string()
    .min(2, { message: "State must have at least 2 characters." })
    .optional(),
  from: z
    .string()
    .regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "From must follow this format: HH:mm (00:00 -> 23:59).",
    })
    .optional(),
  to: z
    .string()
    .regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "To must follow this format: HH:mm (00:00 -> 23:59).",
    })
    .optional(),
});

export type SearchClinicsOptions = z.infer<typeof SearchClinicsOptions>;

export class SearchClinicsDto {
  public static validate(options: SearchClinicsOptions): void {
    SearchClinicsOptions.parse(options);
  }
}

import * as z from "zod";

export interface ZettlekastenType {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export const ZettleFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(256),
  description: z.string(),
  active: z.boolean(),
})

export type ZettleFormValues = z.infer<typeof ZettleFormSchema>

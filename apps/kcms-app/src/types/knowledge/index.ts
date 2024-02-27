import * as z from "zod";
export * from "./zettle";

export interface KnowledgeManageTableColumns {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export const KnowledgeFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(256),
  description: z.string(),
  active: z.boolean(),
})

export type KnowledgeFormValues = z.infer<typeof KnowledgeFormSchema>

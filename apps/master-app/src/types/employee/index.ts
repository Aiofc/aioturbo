import * as z from "zod";

export interface EmployeeTableColumns {
    id: string;
    name: string;
    jobTitle: string;
    active: boolean;
}

export const EmployeeFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2).max(6),
    jobTitle: z.string(),
    active: z.number(),
})

export type EmployeeFormValues = z.infer<typeof EmployeeFormSchema>

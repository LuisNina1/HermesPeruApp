import z from "zod";

export const branchSchema = z.object({
	code: z.string().min(2, "Minimo 2 caracteres").max(5, "Maximo 5 caracteres"),
	name: z.string().min(1, "el nombre es obligatorio"),
	city: z.string().min(1, "la ciudad es obligatoria"),
	address: z.string().min(1, "la direccion es obligatoria"),
});

export type BranchFormValues = z.infer<typeof branchSchema>;

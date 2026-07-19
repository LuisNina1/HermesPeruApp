import { z } from "zod";
export const machineSchema = z.object({
	code: z.string().min(1, "el codigo es obligatorio"),
	brand: z.string().min(1, "la marca es obligatoria"),
	model: z.string().min(1, "el modelo es obligatorio"),
	status: z.enum(["operativa", "inoperativa", "observaciones"]),
	location: z.string().min(1, "la ubicación es obligatoria"),
	branchId: z.string().min(1, "el id de la sucursal es obligatorio"),
});

export type MachineFormValues = z.infer<typeof machineSchema>;

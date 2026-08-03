import { z } from "zod";

export const workOrderSchema = z.object({
	machineId: z.string().min(1, "Selecciona una máquina"),
	type: z.enum(["correctivo", "preventivo"]),
	technicianId: z.string().min(1, "Asigna un técnico"),
	status: z.enum(["abierta", "en_proceso", "completada"]),
	description: z.string().min(1, "Describe el trabajo a realizar"),
	usedParts: z.array(
		z.object({
			name: z.string().min(1, "Nombre requerido"),
			quantity: z.number().min(1, "Mínimo 1"),
		}),
	),
});

export type WorkOrderFormValues = z.infer<typeof workOrderSchema>;

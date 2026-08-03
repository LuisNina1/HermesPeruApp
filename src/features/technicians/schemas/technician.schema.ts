import z from "zod";

export const technicianSchema = z.object({
	code: z.string().min(1, "El codigo es obligatorio"),
	name: z.string().min(1, "El nombre es obligatorio"),

	level: z.union([z.literal(1), z.literal(2), z.literal(3)]), // ← sin coerce ni pipe
	phone: z.string().min(6, "Telefono invalido"),
	email: z.string().email("Correo inválido"),
	hireDate: z.string().min(1, "Fecha es obligatoria"),
	status: z.enum(["activo", "inactivo"]),
	branchIds: z.array(z.string()).min(1, "Asigna almenos una sucursal "),
});

export type TechnicianFormValues = z.infer<typeof technicianSchema>;

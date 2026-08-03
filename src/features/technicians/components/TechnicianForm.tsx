/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBranchOptions } from "@/features/branches";
import {
	type TechnicianFormValues,
	technicianSchema,
} from "../schemas/technician.schema";
import type { Technician } from "../types/technician.types";

const inputClass =
	"w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-primary";

interface Props {
	initialData?: Technician;
	onSubmit: (values: TechnicianFormValues) => void;
	onCancel: () => void;
	isSubmitting?: boolean;
}

export function TechnicianForm({
	initialData,
	onSubmit,
	onCancel,
	isSubmitting,
}: Props) {
	const { data: branches } = useBranchOptions();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TechnicianFormValues>({
		resolver: zodResolver(technicianSchema),
		defaultValues: initialData
			? {
					code: initialData.code,
					name: initialData.name,
					level: initialData.level,
					phone: initialData.phone,
					email: initialData.email,
					hireDate: initialData.hireDate,
					status: initialData.status,
					branchIds: initialData.branchIds,
				}
			: {
					code: "",
					name: "",
					level: 1,
					phone: "",
					email: "",
					hireDate: "",
					status: "activo",
					branchIds: [],
				},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm mb-1">Código</label>
					<input
						{...register("code")}
						className={`${inputClass} ${initialData ? "opacity-60 cursor-not-allowed " : ""}`}
						placeholder="TEC-001"
						disabled={!!initialData}
						readOnly={!!initialData}
					/>
					{errors.code && (
						<p className="text-xs text-red-400 mt-1">{errors.code.message}</p>
					)}
				</div>
				<div>
					<label className="block text-sm mb-1">Nivel</label>
					<select
						{...register("level", { setValueAs: (v) => Number(v) })}
						className={inputClass}
					>
						<option value={1}>Técnico 1</option>
						<option value={2}>Técnico 2</option>
						<option value={3}>Técnico 3</option>
					</select>
				</div>
			</div>

			<div>
				<label className="block text-sm mb-1">Nombre completo</label>
				<input
					{...register("name")}
					className={inputClass}
					placeholder="Luis Nina"
				/>
				{errors.name && (
					<p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
				)}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm mb-1">Teléfono</label>
					<input
						{...register("phone")}
						className={inputClass}
						placeholder="959111222"
					/>
					{errors.phone && (
						<p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>
					)}
				</div>
				<div>
					<label className="block text-sm mb-1">Fecha de ingreso</label>
					<input type="date" {...register("hireDate")} className={inputClass} />
					{errors.hireDate && (
						<p className="text-xs text-red-400 mt-1">
							{errors.hireDate.message}
						</p>
					)}
				</div>
			</div>

			<div>
				<label className="block text-sm mb-1">Correo</label>
				<input
					{...register("email")}
					className={inputClass}
					placeholder="luis.nina@empresa.pe"
				/>
				{errors.email && (
					<p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
				)}
			</div>

			<div>
				<label className="block text-sm mb-1">Estado</label>
				<select {...register("status")} className={inputClass}>
					<option value="activo">Activo</option>
					<option value="inactivo">Inactivo</option>
				</select>
			</div>

			{/* ⭐ Multi-select: asignación de sucursales */}
			<div>
				<label className="block text-sm mb-2">Sucursales asignadas</label>
				<div className="space-y-2 rounded-lg border border-border bg-bg p-3">
					{branches?.map((b) => (
						<label
							key={b.id}
							className="flex items-center gap-2 text-sm cursor-pointer"
						>
							<input
								type="checkbox"
								value={b.id}
								{...register("branchIds")}
								className="accent-primary"
							/>
							{b.name}
						</label>
					))}
				</div>
				{errors.branchIds && (
					<p className="text-xs text-red-400 mt-1">
						{errors.branchIds.message}
					</p>
				)}
			</div>

			<div className="flex justify-end gap-3 pt-2">
				<button
					type="button"
					onClick={onCancel}
					className="rounded-lg px-4 py-2 text-sm text-text-muted hover:bg-surface-hover"
				>
					Cancelar
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
				>
					{isSubmitting
						? "Guardando..."
						: initialData
							? "Guardar cambios"
							: "Crear técnico"}
				</button>
			</div>
		</form>
	);
}

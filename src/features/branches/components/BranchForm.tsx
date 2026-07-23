/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type BranchFormValues, branchSchema } from "../schemas/branch.schema";
import type { Branch } from "../types/branch.types";

const inputClass =
	"w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-primary";

interface BranchFormProps {
	initialData?: Branch;
	onSubmit: (values: BranchFormValues) => void;
	onCancel: () => void;
	isSubmitting?: boolean;
}

export function BranchForm({
	initialData,
	onSubmit,
	onCancel,
	isSubmitting,
}: BranchFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BranchFormValues>({
		resolver: zodResolver(branchSchema),
		defaultValues: initialData
			? {
					code: initialData.code,
					name: initialData.name,
					city: initialData.city,
					address: initialData.address,
				}
			: { code: "", name: "", city: "", address: "" },
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<label className="block text-sm mb-1">Código / Abreviatura</label>
				<input {...register("code")} className={inputClass} placeholder="AQP" />
				{errors.code && (
					<p className="text-xs text-red-400 mt-1">{errors.code.message}</p>
				)}
			</div>
			<div>
				<label className="block text-sm mb-1">Nombre</label>
				<input
					{...register("name")}
					className={inputClass}
					placeholder="Sucursal Arequipa"
				/>
				{errors.name && (
					<p className="text-xs text-red-400 mb-1">{errors.name?.message}</p>
				)}
			</div>
			<div>
				<label className="block text-sm mb-1">Ciudad</label>
				<input
					{...register("city")}
					className={inputClass}
					placeholder="Arequipa"
				/>
				{errors.city && (
					<p className="text-xs text-red-400 mb-1">{errors.city?.message}</p>
				)}
			</div>
			<div>
				<label className="block text-sm mb-1">Dirección</label>
				<input
					{...register("address")}
					className={inputClass}
					placeholder="Av. Ejército 123"
				/>
				{errors.address && (
					<p className="text-xs text-red-400 mt-1">{errors.address.message}</p>
				)}
			</div>

			<div className="flex justify-end gap-3 pt-2">
				<button
					type="button"
					onClick={onCancel}
					className="rounded-lg px-4 text-sm text-text-muted hover:bg-surface-hover"
				>
					Cancelar
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					className=" rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
				>
					{isSubmitting
						? "Guardando"
						: initialData
							? "Guardar cambios"
							: "Crear sucursal"}
				</button>
			</div>
		</form>
	);
}

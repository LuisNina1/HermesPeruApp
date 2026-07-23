/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/features/auth";
import { useBranchOptions } from "@/features/branches";
import {
	type MachineFormValues,
	machineSchema,
} from "../schemas/machine.schema";
import type { Machine } from "../types/machine.types";
import { canAssingToAnyBranch } from "../utils/machinePermissions";

const BRANDS = ["Glory", "JetScan", "Kisan", "De La Rue"];
const inputClass =
	"w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-primary";

interface MachineFormProps {
	initialData?: Machine;
	onSubmit: (values: MachineFormValues) => void;
	onCancel: () => void;
	isSubmitting: boolean;
}

export function MachineForm({
	initialData,
	onSubmit,
	onCancel,
	isSubmitting,
}: MachineFormProps) {
	const user = useAuthStore((s) => s.user);
	const { data: branches } = useBranchOptions();
	const canChooseBranch = canAssingToAnyBranch(user);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<MachineFormValues>({
		resolver: zodResolver(machineSchema),
		defaultValues: initialData
			? {
					code: initialData.code,
					brand: initialData.brand,
					model: initialData.model,
					status: initialData.status,
					location: initialData.location,
					branchId: initialData.branchId,
				}
			: {
					code: "",
					brand: "",
					model: "",
					status: "operativa",
					location: "",
					branchId: "",
				},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<label className="block text-sm mb-1">Código / Serie</label>
				<input
					{...register("code")}
					className={inputClass}
					placeholder="AQP-CJS-001"
				/>
				{errors.code && (
					<p className="text-xs text-red-400 mt-1">{errors.code.message}</p>
				)}
			</div>

			<div>
				<label className="block text-sm mb-1">Marca</label>
				<select {...register("brand")} className={inputClass}>
					<option value="">Selecciona una marca</option>
					{BRANDS.map((b) => (
						<option key={b} value={b}>
							{b}
						</option>
					))}
				</select>
				{errors.brand && (
					<p className="text-xs text-red-400 mt-1">{errors.brand.message}</p>
				)}
			</div>

			<div>
				<label className="block text-sm mb-1">Modelo</label>
				<input
					{...register("model")}
					className={inputClass}
					placeholder="JetScan MPS"
				/>
				{errors.model && (
					<p className="text-xs text-red-400 mt-1">{errors.model.message}</p>
				)}
			</div>

			<div>
				<label className="block text-sm mb-1">Estado</label>
				<select {...register("status")} className={inputClass}>
					<option value="operativa">Operativa</option>
					<option value="inoperativa">Inoperativa</option>
					<option value="observaciones">Con Observaciones</option>
				</select>
			</div>

			<div>
				<label className="block text-sm mb-1">Ubicación</label>
				<input
					{...register("location")}
					className={inputClass}
					placeholder="Bóveda principal"
				/>
				{errors.location && (
					<p className="text-xs text-red-400 mt-1">{errors.location.message}</p>
				)}
			</div>

			{/* Sucursal: select para supervisor, campo bloqueado para técnico */}
			<div>
				<label className="block text-sm mb-1">Sucursal</label>
				{canChooseBranch ? (
					<select {...register("branchId")} className={inputClass}>
						<option value="">Selecciona una sucursal</option>
						{branches?.map((b) => (
							<option key={b.id} value={b.id}>
								{b.name}
							</option>
						))}
					</select>
				) : (
					<>
						<input
							value={user?.branchName ?? ""}
							disabled
							className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-muted"
						/>
						<input type="hidden" {...register("branchId")} />
					</>
				)}
				{errors.branchId && (
					<p className="text-xs text-red-400 mt-1">{errors.branchId.message}</p>
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
							: "Crear máquina"}
				</button>
			</div>
		</form>
	);
}

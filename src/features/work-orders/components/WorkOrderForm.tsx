/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useAuthStore } from "@/features/auth";
import { useMachines } from "@/features/machines";
import { useTechnicians } from "@/features/technicians";
import {
	type WorkOrderFormValues,
	workOrderSchema,
} from "../schemas/workOrder.schema";
import type { WorkOrder } from "../types/workOrder.types";

const inputClass =
	"w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-primary";

interface Props {
	initialData?: WorkOrder;
	onSubmit: (values: WorkOrderFormValues) => void;
	onCancel: () => void;
	isSubmitting?: boolean;
}

export function WorkOrderForm({
	initialData,
	onSubmit,
	onCancel,
	isSubmitting,
}: Props) {
	const user = useAuthStore((s) => s.user);
	const { data: machines } = useMachines();
	const { data: technicians } = useTechnicians();
	const isEditing = !!initialData;

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<WorkOrderFormValues>({
		resolver: zodResolver(workOrderSchema),
		defaultValues: initialData
			? {
					machineId: initialData.machineId,
					type: initialData.type,
					technicianId: initialData.technicianId,
					status: initialData.status,
					description: initialData.description,
					usedParts: initialData.usedParts,
				}
			: {
					machineId: "",
					type: "correctivo",
					technicianId: "",
					status: "abierta",
					description: "",
					usedParts: [],
				},
	});

	// Patrón nuevo 1: lista dinámica de repuestos
	const { fields, append, remove } = useFieldArray({
		control,
		name: "usedParts",
	});

	// Patrón nuevo 2: reaccionar a la máquina elegida
	const selectedMachineId = useWatch({ control, name: "machineId" });
	const selectedMachine = machines?.find((m) => m.id === selectedMachineId);

	// Máquinas visibles según rol
	const machineOptions = (machines ?? []).filter((m) =>
		user?.role === "supervisor" ? true : m.branchId === user?.branchId,
	);

	// Técnicos: activos Y de la sucursal de la máquina elegida
	const technicianOptions = (technicians ?? []).filter(
		(t) =>
			t.status === "activo" &&
			selectedMachine != null &&
			t.branchIds.includes(selectedMachine.branchId),
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm mb-1">Máquina</label>
					<select {...register("machineId")} className={inputClass}>
						<option value="">Selecciona una máquina</option>
						{machineOptions.map((m) => (
							<option key={m.id} value={m.id}>
								{m.code} · {m.model}
							</option>
						))}
					</select>
					{errors.machineId && (
						<p className="text-xs text-red-400 mt-1">
							{errors.machineId.message}
						</p>
					)}
				</div>
				<div>
					<label className="block text-sm mb-1">Tipo</label>
					<select {...register("type")} className={inputClass}>
						<option value="correctivo">Correctivo</option>
						<option value="preventivo">Preventivo</option>
					</select>
				</div>
			</div>

			<div>
				<label className="block text-sm mb-1">Técnico asignado</label>
				<select
					{...register("technicianId")}
					className={inputClass}
					disabled={!selectedMachine}
				>
					<option value="">
						{selectedMachine
							? "Selecciona un técnico"
							: "Primero elige una máquina"}
					</option>
					{technicianOptions.map((t) => (
						<option key={t.id} value={t.id}>
							{t.name} (Técnico {t.level})
						</option>
					))}
				</select>
				{errors.technicianId && (
					<p className="text-xs text-red-400 mt-1">
						{errors.technicianId.message}
					</p>
				)}
			</div>

			{/* El estado solo se edita en OTs existentes (una nueva siempre nace 'abierta') */}
			{isEditing && (
				<div>
					<label className="block text-sm mb-1">Estado</label>
					<select {...register("status")} className={inputClass}>
						<option value="abierta">Abierta</option>
						<option value="en_proceso">En Proceso</option>
						<option value="completada">Completada</option>
					</select>
				</div>
			)}

			<div>
				<label className="block text-sm mb-1">Descripción</label>
				<textarea
					{...register("description")}
					rows={3}
					className={inputClass}
					placeholder="Detalle de la falla o del mantenimiento..."
				/>
				{errors.description && (
					<p className="text-xs text-red-400 mt-1">
						{errors.description.message}
					</p>
				)}
			</div>

			{/* Patrón nuevo 1 en acción: repuestos usados */}
			<div>
				<div className="flex items-center justify-between mb-2">
					<label className="text-sm">Repuestos usados</label>
					<button
						type="button"
						onClick={() => append({ name: "", quantity: 1 })}
						className="inline-flex items-center gap-1 text-xs text-primary hover:opacity-80"
					>
						<Plus size={14} /> Agregar
					</button>
				</div>
				<div className="space-y-2">
					{fields.length === 0 && (
						<p className="text-xs text-text-muted">
							Sin repuestos registrados.
						</p>
					)}
					{fields.map((field, i) => (
						<div key={field.id} className="flex gap-2">
							<input
								{...register(`usedParts.${i}.name`)}
								placeholder="Nombre del repuesto"
								className={`${inputClass} flex-1`}
							/>
							<input
								type="number"
								min={1}
								{...register(`usedParts.${i}.quantity`, {
									valueAsNumber: true,
								})}
								className={`${inputClass} w-20`}
							/>
							<button
								type="button"
								onClick={() => remove(i)}
								className="px-2 text-text-muted hover:text-red-400"
							>
								<Trash2 size={16} />
							</button>
						</div>
					))}
				</div>
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
						: isEditing
							? "Guardar cambios"
							: "Crear OT"}
				</button>
			</div>
		</form>
	);
}

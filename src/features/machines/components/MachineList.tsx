/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import { Pencil } from "lucide-react";
import { useAuthStore } from "@/features/auth";
import { useMachines } from "../api/machines.queries";
import type { Machine } from "../types/machine.types";
import { canEditMachine } from "../utils/machinePermissions";
import { MachineStatusBadge } from "./MachineStatusBadge";

interface MachineListProps {
	onEdit: (machine: Machine) => void;
}

export function MachineList({ onEdit }: MachineListProps) {
	const { data: machines, isLoading, isError } = useMachines();
	const user = useAuthStore((s) => s.user);
	if (isLoading) {
		return (
			<p className="text-text-muted py-8 text-center">Cargando máquinas...</p>
		);
	}

	if (isError) {
		return (
			<p className="text-red-400 py-8 text-center">Error al cargar máquinas</p>
		);
	}

	if (!machines || machines.length === 0) {
		return <p className="text-text-muted py-8 text-center">No hay máquinas</p>;
	}

	const visible = (machines ?? []).filter((m) =>
		user?.role === "supervisor" ? true : m.branchId === user?.branchId,
	);

	if (visible.length === 0) {
		return (
			<p className="text-text-muted py-8 text-center">
				No hay máquinas registradas.
			</p>
		);
	}

	return (
		<div className="overflow-hidden rounded-xl border border-border bg-surface">
			<table className="w-full text-sm">
				<thead className="border-b border-border text-text-muted">
					<tr className="text-left">
						<th className="px-4 py-3 font-medium">Código</th>
						<th className="px-4 py-3 font-medium">Modelo</th>
						<th className="px-4 py-3 font-medium">Marca</th>
						<th className="px-4 py-3 font-medium">Sucursal</th>
						<th className="px-4 py-3 font-medium">Estado</th>
					</tr>
				</thead>
				<tbody>
					{visible.map((m) => (
						<tr
							key={m.id}
							className="border-b border-border last:border-0 hover:bg-surface-hover"
						>
							<td className="px-4 py-3 font-medium">{m.code}</td>
							<td className="px-4 py-3">{m.model}</td>
							<td className="px-4 py-3 text-text-muted">{m.brand}</td>
							<td className="px-4 py-3 text-text-muted">{m.branchName}</td>
							<td className="px-4 py-3">
								<MachineStatusBadge status={m.status} />
							</td>
							<td className="px-4 py-3 text-right">
								{onEdit && canEditMachine(user, m) && (
									<button
										onClick={() => onEdit(m)}
										className="inline-flex items-center gap-1 text-text-muted hover:text-primary"
									>
										<Pencil size={15}>Editar</Pencil>
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

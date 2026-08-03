/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import { Pencil } from "lucide-react";
import { useAuthStore } from "@/features/auth";
import { useWorkOrders } from "../api/workOrders.queries";
import type { WorkOrder } from "../types/workOrder.types";
import { canManageWorkOrder } from "../utils/workOrderPermissions";
import { StatusBadge, TypeBadge } from "./WorkOrderBadges";

interface Props {
	onEdit?: (wo: WorkOrder) => void;
}

export function WorkOrderList({ onEdit }: Props) {
	const { data: workOrders, isLoading, isError } = useWorkOrders();
	const user = useAuthStore((s) => s.user);

	if (isLoading)
		return (
			<p className="text-text-muted py-8 text-center">Cargando órdenes...</p>
		);
	if (isError)
		return (
			<p className="text-red-400 py-8 text-center">
				Error al cargar las órdenes.
			</p>
		);

	// El técnico solo ve las de su sucursal (el backend también filtrará)
	const visible = (workOrders ?? []).filter((wo) =>
		user?.role === "supervisor" ? true : wo.branchId === user?.branchId,
	);

	if (visible.length === 0) {
		return (
			<p className="text-text-muted py-8 text-center">
				No hay órdenes de trabajo.
			</p>
		);
	}

	return (
		<div className="overflow-hidden rounded-xl border border-border bg-surface">
			<table className="w-full text-sm">
				<thead className="border-b border-border text-text-muted">
					<tr className="text-left">
						<th className="px-4 py-3 font-medium">Código</th>
						<th className="px-4 py-3 font-medium">Máquina</th>
						<th className="px-4 py-3 font-medium">Técnico</th>
						<th className="px-4 py-3 font-medium">Estado</th>
						<th className="px-4 py-3 font-medium">Apertura</th>
						<th className="px-4 py-3 font-medium text-right">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{visible.map((wo) => (
						<tr
							key={wo.id}
							className="border-b border-border last:border-0 hover:bg-surface-hover"
						>
							<td className="px-4 py-3">
								<div className="font-medium">{wo.code}</div>
								<div className="mt-1">
									<TypeBadge type={wo.type} />
								</div>
							</td>
							<td className="px-4 py-3">
								<div>{wo.machineModel}</div>
								<div className="text-xs text-text-muted">{wo.machineCode}</div>
							</td>
							<td className="px-4 py-3 text-text-muted">{wo.technicianName}</td>
							<td className="px-4 py-3">
								<StatusBadge status={wo.status} />
							</td>
							<td className="px-4 py-3 text-text-muted">{wo.openedAt}</td>
							<td className="px-4 py-3 text-right">
								{onEdit && canManageWorkOrder(user, wo) && (
									<button
										onClick={() => onEdit(wo)}
										className="inline-flex items-center gap-1 text-text-muted hover:text-primary"
									>
										<Pencil size={15} /> Editar
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

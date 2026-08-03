/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import { Plus } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/features/auth";
import {
	canCreateWorkOrder,
	type WorkOrder,
	WorkOrderFormModal,
	WorkOrderList,
} from "@/features/work-orders";

export function WorkOrdersPage() {
	const user = useAuthStore((s) => s.user);
	const [open, setOpen] = useState(false);
	const [workOrderToEdit, setWorkOrderToEdit] = useState<WorkOrder | null>(
		null,
	);

	const openCreate = () => {
		setWorkOrderToEdit(null);
		setOpen(true);
	};
	const openEdit = (wo: WorkOrder) => {
		setWorkOrderToEdit(wo);
		setOpen(true);
	};

	return (
		<div>
			<div className="flex items-start justify-between">
				<div>
					<h1 className="text-2xl font-bold">Órdenes de Trabajo</h1>
					<p className="text-text-muted mt-1">
						Atenciones correctivas y preventivas a las máquinas
					</p>
				</div>
				{canCreateWorkOrder(user) && (
					<button
						onClick={openCreate}
						className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
					>
						<Plus size={16} /> Nueva OT
					</button>
				)}
			</div>

			<div className="mt-6">
				<WorkOrderList onEdit={openEdit} />
			</div>

			<WorkOrderFormModal
				open={open}
				workOrderToEdit={workOrderToEdit}
				onClose={() => setOpen(false)}
			/>
		</div>
	);
}

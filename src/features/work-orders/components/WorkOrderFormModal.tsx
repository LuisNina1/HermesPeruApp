import { useMachines } from "@/features/machines";
import { useTechnicians } from "@/features/technicians";
import { Modal } from "@/shared/components/ui/Modal";
import {
	useCreateWorkOrder,
	useUpdateWorkOrder,
} from "../api/workOrders.queries";
import type { WorkOrderFormValues } from "../schemas/workOrder.schema";
import type { WorkOrder } from "../types/workOrder.types";
import { WorkOrderForm } from "./WorkOrderForm";

const today = () => new Date().toISOString().slice(0, 10);

interface Props {
	open: boolean;
	workOrderToEdit: WorkOrder | null;
	onClose: () => void;
}

export function WorkOrderFormModal({ open, workOrderToEdit, onClose }: Props) {
	const createMutation = useCreateWorkOrder();
	const updateMutation = useUpdateWorkOrder();
	const { data: machines } = useMachines();
	const { data: technicians } = useTechnicians();

	const isEditing = !!workOrderToEdit;
	const isSubmitting = createMutation.isPending || updateMutation.isPending;

	const handleSubmit = (values: WorkOrderFormValues) => {
		// Resolver los datos denormalizados desde los ids elegidos
		const machine = machines?.find((m) => m.id === values.machineId);
		const technician = technicians?.find((t) => t.id === values.technicianId);

		const payload = {
			type: values.type,
			machineId: values.machineId,
			machineCode: machine?.code ?? "",
			machineModel: machine?.model ?? "",
			branchId: machine?.branchId ?? "",
			branchName: machine?.branchName ?? "",
			technicianId: values.technicianId,
			technicianName: technician?.name ?? "",
			description: values.description,
			usedParts: values.usedParts,
		};

		if (isEditing) {
			// Transición de estado: al completar, se fija la fecha de cierre; si sale de completada, se limpia
			const closedAt =
				values.status === "completada"
					? (workOrderToEdit.closedAt ?? today())
					: null;
			updateMutation.mutate(
				{
					id: workOrderToEdit.id,
					input: { ...payload, status: values.status, closedAt },
				},
				{ onSuccess: onClose },
			);
		} else {
			createMutation.mutate(payload, { onSuccess: onClose });
		}
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			title={isEditing ? "Editar orden de trabajo" : "Nueva orden de trabajo"}
		>
			<WorkOrderForm
				initialData={workOrderToEdit ?? undefined}
				onSubmit={handleSubmit}
				onCancel={onClose}
				isSubmitting={isSubmitting}
			/>
		</Modal>
	);
}

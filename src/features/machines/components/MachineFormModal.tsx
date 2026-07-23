import { useBranchOptions } from "@/features/branches";
import { Modal } from "@/shared/components/ui/Modal";
import { useCreateMachine, useUpdateMachine } from "../api/machines.queries";
import type { MachineFormValues } from "../schemas/machine.schema";
import type { Machine } from "../types/machine.types";
import { MachineForm } from "./MachineForm";

interface Props {
	open: boolean;
	machineToEdit: Machine | null;
	onClose: () => void;
}

export function MachineFormModal({ open, machineToEdit, onClose }: Props) {
	const createMutation = useCreateMachine();
	const updateMutation = useUpdateMachine();
	const { data: branches } = useBranchOptions();

	const isEditing = !!machineToEdit;
	const isSubmitting = createMutation.isPending || updateMutation.isPending;

	const handleSubmit = (values: MachineFormValues) => {
		const branchName =
			branches?.find((b) => b.id === values.branchId)?.name ?? "";
		const input = { ...values, branchName };
		if (isEditing) {
			updateMutation.mutate(
				{ id: machineToEdit.id, input },
				{ onSuccess: onClose },
			);
		} else {
			createMutation.mutate(input, { onSuccess: onClose });
		}
	};
	return (
		<Modal
			open={open}
			onClose={onClose}
			title={isEditing ? "Editar maquina" : "Nueva maquina"}
		>
			<MachineForm
				initialData={machineToEdit ?? undefined}
				onSubmit={handleSubmit}
				onCancel={onClose}
				isSubmitting={isSubmitting}
			></MachineForm>
		</Modal>
	);
}

import { useBranchOptions } from "@/features/branches";
import { Modal } from "@/shared/components/ui/Modal";
import {
	useCreateTechnician,
	useUpdateTechnician,
} from "../api/technicians.queries";
import type { TechnicianFormValues } from "../schemas/technician.schema";
import type { Technician } from "../types/technician.types";
import { TechnicianForm } from "./TechnicianForm";

interface Props {
	open: boolean;
	technicianToEdit: Technician | null;
	onClose: () => void;
}

export function TechnicianFormModal({
	open,
	technicianToEdit,
	onClose,
}: Props) {
	const createMutation = useCreateTechnician();
	const updateMutation = useUpdateTechnician();
	const { data: branches } = useBranchOptions();

	const isEditing = !!technicianToEdit;
	const isSubmitting = createMutation.isPending || updateMutation.isPending;

	const handleSubmit = (values: TechnicianFormValues) => {
		// Resolver los nombres de sucursal desde los ids seleccionados
		const branchNames = values.branchIds
			.map((id) => branches?.find((b) => b.id === id)?.name)
			.filter((n): n is string => Boolean(n));

		const input = { ...values, branchNames };

		if (isEditing) {
			updateMutation.mutate(
				{ id: technicianToEdit.id, input },
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
			title={isEditing ? "Editar técnico" : "Nuevo técnico"}
		>
			<TechnicianForm
				initialData={technicianToEdit ?? undefined}
				onSubmit={handleSubmit}
				onCancel={onClose}
				isSubmitting={isSubmitting}
			/>
		</Modal>
	);
}

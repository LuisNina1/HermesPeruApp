import { Modal } from "@/shared/components/ui/Modal";
import { useCreateBranch, useUpdateBranch } from "../api/branches.queries";
import type { BranchFormValues } from "../schemas/branch.schema";
import type { Branch } from "../types/branch.types";
import { BranchForm } from "./BranchForm";

interface Props {
	open: boolean;
	branchToEdit: Branch | null;
	onClose: () => void;
}

export function BranchFormModal({ open, branchToEdit, onClose }: Props) {
	const createMutation = useCreateBranch();
	const updateMutation = useUpdateBranch();

	const isEditing = !!branchToEdit;
	const isSubmitting = createMutation.isPending || updateMutation.isPending;

	const handleSubmit = (values: BranchFormValues) => {
		if (isEditing) {
			updateMutation.mutate(
				{ id: branchToEdit.id, input: values },
				{ onSuccess: onClose },
			);
		} else {
			createMutation.mutate(values, { onSuccess: onClose });
		}
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			title={isEditing ? "Editar sucursal" : "Nueva sucursal"}
		>
			<BranchForm
				initialData={branchToEdit ?? undefined}
				onSubmit={handleSubmit}
				onCancel={onClose}
				isSubmitting={isSubmitting}
			></BranchForm>
		</Modal>
	);
}

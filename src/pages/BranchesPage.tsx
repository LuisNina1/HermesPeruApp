/** biome-ignore-all lint/a11y/useButtonType: <explanation> */

import { Plus } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/app/router";
import { useAuthStore } from "@/features/auth";
import {
	type Branch,
	BranchFormModal,
	BranchList,
	canManageBranches,
} from "@/features/branches";

export function BranchesPage() {
	const user = useAuthStore((s) => s.user);
	const [open, setOpen] = useState(false);
	const [branchToEdit, setBranchToEdit] = useState<Branch | null>(null);

	if (!canManageBranches(user)) {
		return <Navigate to={ROUTES.dashboard} replace></Navigate>;
	}

	const openCreate = () => {
		setBranchToEdit(null);
		setOpen(true);
	};
	const openEdit = (b: Branch) => {
		setBranchToEdit(b);
		setOpen(true);
	};

	return (
		<div>
			<div className="flex items-start justify-between">
				<div>
					<h1 className="text-2xl font-bold">Sucursales</h1>
					<p>Gestion de sucursales y su resumen operativo</p>
				</div>
				<button
					onClick={openCreate}
					className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
				>
					<Plus size={16}></Plus>
					Nueva sucursal
				</button>
			</div>
			<div className="mt-6">
				<BranchList onEdit={openEdit}></BranchList>
			</div>
			<BranchFormModal
				open={open}
				branchToEdit={branchToEdit}
				onClose={() => setOpen(false)}
			></BranchFormModal>
		</div>
	);
}

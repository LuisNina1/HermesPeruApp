/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import { Plus } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/app/router";
import { useAuthStore } from "@/features/auth";
import {
	canManageTechnicians,
	type Technician,
	TechnicianFormModal,
	TechnicianList,
} from "@/features/technicians";

export function TechniciansPage() {
	const user = useAuthStore((s) => s.user);
	const [open, setOpen] = useState(false);
	const [technicianToEdit, setTechnicianToEdit] = useState<Technician | null>(
		null,
	);

	if (!canManageTechnicians(user)) {
		return <Navigate to={ROUTES.dashboard} replace></Navigate>;
	}

	const openCreate = () => {
		setTechnicianToEdit(null);
		setOpen(true);
	};
	const openEdit = (t: Technician) => {
		setTechnicianToEdit(t);
		setOpen(true);
	};
	return (
		<div>
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Técnicos</h1>
					<p className="text-text-muted mt-1">
						Personal técnico y sus sucursales asignadas
					</p>
				</div>
				<button
					onClick={openCreate}
					className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
				>
					<Plus size={16}></Plus>
				</button>
			</div>
			<div className="mt-6">
				<TechnicianList onEdit={openEdit}></TechnicianList>
			</div>

			<TechnicianFormModal
				open={open}
				technicianToEdit={technicianToEdit}
				onClose={() => setOpen(false)}
			></TechnicianFormModal>
		</div>
	);
}

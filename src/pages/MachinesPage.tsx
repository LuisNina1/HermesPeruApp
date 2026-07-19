/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import { Plus } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/features/auth";
import {
	canCreateMachine,
	type Machine,
	MachineFormModal,
	MachineList,
} from "@/features/machines";

export function MachinesPage() {
	const user = useAuthStore((s) => s.user);
	const [open, setOpen] = useState(false);
	const [machineToEdit, setMachineToEdit] = useState<Machine | null>(null);

	const openCreate = () => {
		setMachineToEdit(null);
		setOpen(true);
	};

	const openEdit = (m: Machine) => {
		setMachineToEdit(m), setOpen(true);
	};

	return (
		<div>
			<div className="flex items-start justify-between ">
				<div>
					<h1 className="text-2xl font-bold">Máquinas</h1>
					<p className="text-text-muted mt-1">
						Equipos de procesamiento de dinero
					</p>
				</div>
				{canCreateMachine(user) && (
					<button
						onClick={openCreate}
						className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
					>
						<Plus size={16} />
						Nueva máquina
					</button>
				)}
			</div>

			<div className="mt-6">
				<MachineList onEdit={openEdit} />
			</div>
			<MachineFormModal
				open={open}
				machineToEdit={machineToEdit}
				onClose={() => setOpen(false)}
			></MachineFormModal>
		</div>
	);
}

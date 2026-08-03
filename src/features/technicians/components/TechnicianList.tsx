import { useTechnicians } from "../api/technicians.queries";
import type { Technician } from "../types/technician.types";
import { TechnicianCard } from "./TechnicianCard";

interface Props {
	onEdit?: (t: Technician) => void;
}

export function TechnicianList({ onEdit }: Props) {
	const { data: technicians, isLoading, isError } = useTechnicians();

	if (isLoading)
		return (
			<p className="text-text-muted py-8 text-center">Cargando técnicos...</p>
		);
	if (isError)
		return (
			<p className="text-red-400 py-8 text-center">Error al cargar técnicos</p>
		);
	if (!technicians || technicians.length === 0) {
		return (
			<p className="text-text-muted py-8 text-center">
				No hay técnicos registrados
			</p>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
			{technicians.map((t) => (
				<TechnicianCard key={t.id} technician={t} onEdit={onEdit} />
			))}
		</div>
	);
}

import { useBranches } from "../api/branches.queries";
import type { Branch } from "../types/branch.types";
import { BranchCard } from "./BranchCard";

interface BranchLIstProps {
	onEdit?: (branch: Branch) => void;
}

export function BranchList({ onEdit }: BranchLIstProps) {
	const { data: branches, isLoading, isError } = useBranches();

	if (isLoading)
		return (
			<p className="text-text-muted py-8 text-center">Cargando sucursales...</p>
		);
	if (isError)
		return (
			<p className="text-red-400 py-8 text-center">
				Error al cargar sucursales.
			</p>
		);
	if (!branches || branches.length === 0) {
		return (
			<p className="text-text-muted py-8 text-center">
				No hay sucursales registradas.
			</p>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
			{branches.map((b) => (
				<BranchCard key={b.id} branch={b} onEdit={onEdit}></BranchCard>
			))}
		</div>
	);
}

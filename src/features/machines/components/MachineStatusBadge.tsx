import type { MachineStatus } from "../types/machine.types";

const STATUS_CONFIG: Record<MachineStatus, { label: string; classes: string }> =
	{
		operativa: {
			label: "Operativa",
			classes: "bg-green-500/15 text-green-400",
		},
		inoperativa: {
			label: "Inoperativa",
			classes: "bg-red-500/15 text-red-400",
		},
		observaciones: {
			label: "Con observaciones",
			classes: "bg-amber-500/15 text-amber-400",
		},
	};

export function MachineStatusBadge({ status }: { status: MachineStatus }) {
	const { label, classes } = STATUS_CONFIG[status];
	return (
		<span
			className={`inline-flex px-2.5 py-1 rounded-full text-ts font-medium ${classes}`}
		>
			{label}
		</span>
	);
}

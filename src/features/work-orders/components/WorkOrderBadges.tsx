import type { WorkOrderStatus, WorkOrderType } from "../types/workOrder.types";

const TYPE = {
	correctivo: {
		label: "Correctivo",
		classes: "bg-amber-500/15 text-amber-400",
	},
	preventivo: { label: "Preventivo", classes: "bg-blue-500/15 text-blue-400" },
} as const;

export function TypeBadge({ type }: { type: WorkOrderType }) {
	const { label, classes } = TYPE[type];
	return (
		<span
			className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${classes}`}
		>
			{label}
		</span>
	);
}

const STATUS = {
	abierta: { label: "Abierta", classes: "bg-gray-500/20 text-gray-300" },
	en_proceso: { label: "En Proceso", classes: "bg-blue-500/15 text-blue-400" },
	completada: {
		label: "Completada",
		classes: "bg-green-500/15 text-green-400",
	},
} as const;

export function StatusBadge({ status }: { status: WorkOrderStatus }) {
	const { label, classes } = STATUS[status];
	return (
		<span
			className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${classes}`}
		>
			{label}
		</span>
	);
}

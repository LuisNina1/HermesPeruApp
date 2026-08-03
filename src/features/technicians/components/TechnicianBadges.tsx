import type {
	TechnicianLevel,
	TechnicianStatus,
} from "../types/technician.types";

export function LevelBadge({ level }: { level: TechnicianLevel }) {
	return (
		<span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-blue-500/15 text-blue-500">
			Técnico {level}
		</span>
	);
}

const STATUS = {
	activo: { label: "activo", classes: "bg-green-500/15 text-green-500" },
	inactivo: { label: "inactivo", classes: "bg-gray-500/15 text-gray-500" },
} as const;

export function StatusBadge({ status }: { status: TechnicianStatus }) {
	const { label, classes } = STATUS[status];
	return (
		<span
			className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${classes}`}
		>
			{label}
		</span>
	);
}

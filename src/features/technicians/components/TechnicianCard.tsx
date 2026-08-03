/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import { Building2, Mail, Pencil, Phone } from "lucide-react";
import type { Technician } from "../types/technician.types";
import { LevelBadge, StatusBadge } from "./TechnicianBadges";

interface Props {
	technician: Technician;
	onEdit?: (t: Technician) => void;
}

export function TechnicianCard({ technician: t, onEdit }: Props) {
	return (
		<div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-3">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="grid place-items-center w-11 h-11 rounded-full bg-primary/15 text-primary font-semibold">
						{t.name
							.split(" ")
							.map((n) => n[0])
							.slice(0, 2)
							.join("")}
					</div>
					<div>
						<h3 className="font-semibold leading-tight">{t.name}</h3>
						<p className="text-xs text-text-muted">{t.code}</p>
					</div>
				</div>

				{onEdit && (
					<button
						onClick={() => onEdit(t)}
						className="text-text-muted hover:text-primary"
					>
						<Pencil size={15} />
					</button>
				)}
			</div>
			<div className="flex items-center gap-2">
				<LevelBadge level={t.level}></LevelBadge>
				<StatusBadge status={t.status}></StatusBadge>
			</div>
			<div>
				<p className="flex items-center gap-2">
					<Phone size={13}></Phone>
					{t.phone}
				</p>
				<p className="flex items-center gap-2">
					<Mail size={13}></Mail>
					{t.email}
				</p>
				<p className="flex items-center gap-2">
					<Building2 size={13}></Building2>
					{t.branchNames.length > 0 ? t.branchNames.join(", ") : "Sin asignar"}
				</p>
			</div>
		</div>
	);
}

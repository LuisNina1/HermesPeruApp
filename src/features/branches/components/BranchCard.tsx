/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import { Cog, Pencil, Users } from "lucide-react";
import type { Branch } from "../types/branch.types";

interface BranchCardProps {
	branch: Branch;
	onEdit?: (branch: Branch) => void;
}

export function BranchCard({ branch, onEdit }: BranchCardProps) {
	return (
		<div className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="grid place-items-center w-11 h-11 rounded-lg bg-primary/15 text-primary font-bold text-sm">
						{branch.code}
					</div>
					<div>
						<h3>{branch.name}</h3>
					</div>
				</div>
				{onEdit && (
					<button
						onClick={() => onEdit(branch)}
						className=" text-text-muted hover:text-primary"
					>
						<Pencil size={15}></Pencil>
					</button>
				)}
			</div>

			<p className="text-sm text-text-muted">{branch.address}</p>

			<div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
				<div className="flex items-center gap-2">
					<Cog size={16} className="text-text-muted shrink-0"></Cog>
					<div>
						<p className="text-sm font-medium">
							{branch.machineCount} máquinas
						</p>
						<p className="text-xs text-text-muted">
							<span className="text-green-400">
								{branch.operationalCount} ok
							</span>
							{" · "}
							<span className="text-amber-400">
								{branch.issueCount} con problemas
							</span>
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Users size={16} className="text-text-muted shrink-0"></Users>
					<div>
						<p className="text-sm font-medium">
							{branch.technicianCount}{" "}
							{branch.technicianCount > 1 ? "técnicos" : "tècnico"}
						</p>
						<p className="text-xs text-text-muted">asignados</p>
					</div>
				</div>
			</div>
		</div>
	);
}

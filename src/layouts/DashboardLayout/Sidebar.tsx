import { Wrench } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
import { navItems } from "./navItems";

export function Sidebar() {
	const user = useAuthStore((s) => s.user);
	const visibleItems = navItems.filter(
		(item) => !item.roles || (user != null && item.roles.includes(user.role)),
	);

	return (
		<aside className="w-64 shrink-0 border-r border-border bg-surface flex flex-col">
			<div className="flex items-center gap-3 px-5 h-16 border-b border-border">
				<div className="grid place-items-center w-9 h-9 rounded-lg bg-primary">
					<Wrench size={18} className="text-white" />
				</div>
				<div>
					<p className="font-semibold leading-tight">Manteniento</p>
					<p className="text-xs text-text-muted">Control de Mantenimiento</p>
				</div>
			</div>

			<nav className="flex-1 px-3 py-4 space-y-1">
				{navItems.map(({ label, path, icon: Icon }) => (
					<NavLink
						key={path}
						to={path}
						end={path === "/"}
						className={({ isActive }) =>
							`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
								isActive
									? "bg-primary text-white"
									: "text-text-muted hover:bg-surface-hover hover:text-text"
							}`
						}
					>
						<Icon size={18} />
						{label}
					</NavLink>
				))}
			</nav>
		</aside>
	);
}

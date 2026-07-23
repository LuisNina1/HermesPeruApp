import {
	Building2,
	ClipboardList,
	Cog,
	LayoutDashboard,
	type LucideIcon,
	Package,
	Wrench,
} from "lucide-react";
import { ROUTES } from "@/app/router/routePaths";
import type { UserRole } from "@/features/auth";

export interface NavItem {
	label: string;
	path: string;
	icon: LucideIcon;
	roles?: UserRole[];
}

export const navItems: NavItem[] = [
	{ label: "Dashboard", path: ROUTES.dashboard, icon: LayoutDashboard },
	{ label: "Órdenes de Trabajo", path: ROUTES.workOrders, icon: ClipboardList },
	{ label: "Máquinas", path: ROUTES.machines, icon: Cog },
	{
		label: "Sucursales",
		path: ROUTES.branches,
		icon: Building2,
		roles: ["supervisor"],
	},
	{ label: "Mantenimientos", path: ROUTES.maintenance, icon: Wrench },
	{ label: "Repuestos", path: ROUTES.spareParts, icon: Package },
];

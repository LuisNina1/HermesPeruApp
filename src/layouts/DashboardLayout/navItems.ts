import {
	ClipboardList,
	Cog,
	LayoutDashboard,
	type LucideIcon,
	Package,
	Wrench,
} from "lucide-react";
import { ROUTES } from "@/app/router/routePaths";

export interface NavItem {
	label: string;
	path: string;
	icon: LucideIcon;
}

export const navItems: NavItem[] = [
	{ label: "Dashboard", path: ROUTES.dashboard, icon: LayoutDashboard },
	{ label: "Órdenes de Trabajo", path: ROUTES.workOrders, icon: ClipboardList },
	{ label: "Máquinas", path: ROUTES.machines, icon: Cog },
	{ label: "Mantenimientos", path: ROUTES.maintenance, icon: Wrench },
	{ label: "Repuestos", path: ROUTES.spareParts, icon: Package },
];

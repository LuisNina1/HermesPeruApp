import type { AuthUser } from "@/features/auth";
import type { WorkOrder } from "../types/workOrder.types";

// Ambos roles crean OTs (el técnico queda limitado a máquinas de su sucursal vía las opciones del form)
export function canCreateWorkOrder(user: AuthUser | null): boolean {
	return user?.role === "supervisor" || user?.role === "tecnico";
}

// Gestionar ESTA OT: supervisor cualquiera; técnico solo las de su sucursal
export function canManageWorkOrder(
	user: AuthUser | null,
	wo: WorkOrder,
): boolean {
	if (!user) return false;
	if (user.role === "supervisor") return true;
	return wo.branchId === user.branchId;
}

import type { AuthUser } from "@/features/auth";
import type { Machine } from "../types/machine.types";

export function canCreateMachine(user: AuthUser | null): boolean {
	return user?.role === "supervisor" || user?.role === "tecnico";
}

export function canEditMachine(
	user: AuthUser | null,
	machine: Machine,
): boolean {
	if (!user) return false;
	if (user.role === "supervisor") return true;
	return machine.branchId === user.branchId;
}

export function canAssingToAnyBranch(user: AuthUser | null): boolean {
	return user?.role === "supervisor";
}

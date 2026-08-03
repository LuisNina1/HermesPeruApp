import type { AuthUser } from "@/features/auth";

export function canManageTechnicians(user: AuthUser | null): boolean {
	return user?.role === "supervisor";
}

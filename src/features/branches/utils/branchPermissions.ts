import type { AuthUser } from "@/features/auth";

export function canManageBranches(user: AuthUser | null): boolean {
	return user?.role === "supervisor";
}

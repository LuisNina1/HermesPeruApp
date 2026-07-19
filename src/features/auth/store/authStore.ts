import { create } from "zustand";

export type UserRole = "supervisor" | "tecnico" | "admin";

export interface AuthUser {
	id: string;
	name: string;
	role: UserRole;
	branchId: string;
	branchName: string;
}

interface AuthState {
	user: AuthUser | null;
	setUsser: (user: AuthUser | null) => void;
}

const MOCK_USER: AuthUser = {
	id: "1",
	name: "Luis",
	role: "supervisor",
	branchId: "1",
	branchName: "Sucursal Arequipa",
};

export const useAuthStore = create<AuthState>((set) => ({
	user: MOCK_USER,
	setUsser: (user) => set({ user }),
}));

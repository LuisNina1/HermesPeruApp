export type TechnicianStatus = "activo" | "inactivo";
export type TechnicianLevel = 1 | 2 | 3;
export interface Technician {
	id: string;
	code: string;
	name: string;
	level: TechnicianLevel;
	phone: string;
	email: string;
	hireDate: string;
	status: TechnicianStatus;
	branchIds: string[];
	branchNames: string[];
}

export type TechnicianFormInput = Omit<Technician, "id" | "branchNames">;

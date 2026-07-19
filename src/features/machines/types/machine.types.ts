export type MachineStatus = "operativa" | "inoperativa" | "observaciones";

export interface Machine {
	id: string;
	code: string;
	model: string;
	brand: string;
	status: MachineStatus;
	branchId: string;
	branchName: string;
	location: string;
	lastMaintenanceDate: string | null;
}

export type CreateMachineInput = Omit<Machine, "id" | "lastMaintenanceDate">;

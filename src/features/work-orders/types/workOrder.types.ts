export type WorkOrderType = "correctivo" | "preventivo";
export type WorkOrderStatus = "abierta" | "en_proceso" | "completada";

export interface UsedPart {
	name: string;
	quantity: number;
}

export interface WorkOrder {
	id: string;
	code: string;
	type: WorkOrderType;
	status: WorkOrderStatus;
	machineId: string;
	machineCode: string;
	machineModel: string;
	branchId: string;
	branchName: string;
	technicianId: string;
	technicianName: string;
	description: string;
	openedAt: string;
	closedAt: string | null;
	usedParts: UsedPart[];
}

export interface CreateWorkOrderPayload {
	type: WorkOrderType;
	machineId: string;
	machineCode: string;
	machineModel: string;
	branchId: string;
	branchName: string;
	technicianId: string;
	technicianName: string;
	description: string;
	usedParts: UsedPart[];
}

import type {
	CreateWorkOrderPayload,
	WorkOrder,
	WorkOrderStatus,
} from "../types/workOrder.types";

const MOCK_WORK_ORDERS: WorkOrder[] = [
	{
		id: "w1",
		code: "OT-2026-0156",
		type: "correctivo",
		status: "en_proceso",
		machineId: "m1",
		machineCode: "AQP-CJS-001",
		machineModel: "JetScan MPS",
		branchId: "b1",
		branchName: "Sucursal Arequipa",
		technicianId: "t1",
		technicianName: "Luis Nina",
		description: "Falla en sensor de detección UV",
		openedAt: "2026-02-03",
		closedAt: null,
		usedParts: [],
	},
	{
		id: "w2",
		code: "OT-2026-0155",
		type: "preventivo",
		status: "completada",
		machineId: "m2",
		machineCode: "AQP-GLY-051",
		machineModel: "USF-51",
		branchId: "b1",
		branchName: "Sucursal Arequipa",
		technicianId: "t1",
		technicianName: "Luis Nina",
		description: "Mantenimiento programado mensual",
		openedAt: "2026-02-02",
		closedAt: "2026-02-02",
		usedParts: [{ name: "Filtro de polvo", quantity: 2 }],
	},
	{
		id: "w3",
		code: "OT-2026-0154",
		type: "preventivo",
		status: "completada",
		machineId: "m3",
		machineCode: "AQP-JFX-100",
		machineModel: "iFX i100",
		branchId: "b1",
		branchName: "Sucursal Arequipa",
		technicianId: "t1",
		technicianName: "Luis Nina",
		description: "Limpieza de sensores y calibración",
		openedAt: "2026-02-01",
		closedAt: "2026-02-01",
		usedParts: [],
	},
];

const today = () => new Date().toISOString().slice(0, 10);

function generateCode(): string {
	const year = new Date().getFullYear();
	const num = MOCK_WORK_ORDERS.length + 1;
	return `OT-${year}-${num.toString().padStart(4, "0")}`;
}

export async function getWorkOrders(): Promise<WorkOrder[]> {
	return [...MOCK_WORK_ORDERS];
}

export async function createWorkOrder(
	input: CreateWorkOrderPayload,
): Promise<WorkOrder> {
	const wo: WorkOrder = {
		...input,
		id: `w${MOCK_WORK_ORDERS.length + 1}`,
		code: generateCode(),
		status: "abierta",
		openedAt: today(),
		closedAt: null,
	};

	MOCK_WORK_ORDERS.unshift(wo);
	return wo;
}

export async function updateWorkOrder(
	id: string,
	input: CreateWorkOrderPayload & {
		status: WorkOrderStatus;
		closedAt: string | null;
	},
): Promise<WorkOrder> {
	const i = MOCK_WORK_ORDERS.findIndex((W) => W.id === id);
	if (i === -1) throw new Error("Work order not found");
	const updated: WorkOrder = { ...MOCK_WORK_ORDERS[i], ...input };
	MOCK_WORK_ORDERS[i] = updated;
	return updated;
}

import type { CreateMachineInput, Machine } from "../types/machine.types";

const MOCK_MACHINES: Machine[] = [
	{
		id: "m1",
		code: "AQP-CJS-001",
		model: "JetScan MPS",
		brand: "Cummins",
		status: "inoperativa",
		branchId: "b1",
		branchName: "Sucursal Arequipa",
		location: "Bóveda principal",
		lastMaintenanceDate: "2026-01-15",
	},
	{
		id: "m2",
		code: "AQP-GLY-051",
		model: "USF-51",
		brand: "Glory",
		status: "operativa",
		branchId: "b1",
		branchName: "Sucursal Arequipa",
		location: "Ventanilla 3",
		lastMaintenanceDate: "2026-02-02",
	},
	{
		id: "m3",
		code: "AQP-JFX-100",
		model: "iFX i100",
		brand: "JetScan",
		status: "operativa",
		branchId: "b1",
		branchName: "Sucursal Arequipa",
		location: "Ventanilla 1",
		lastMaintenanceDate: "2026-02-01",
	},
	{
		id: "m4",
		code: "AQP-KSN-500",
		model: "K-500F",
		brand: "Kisan",
		status: "operativa",
		branchId: "b1",
		branchName: "Sucursal Arequipa",
		location: "Área de conteo",
		lastMaintenanceDate: "2025-12-20",
	},
	{
		id: "m5",
		code: "AQP-DLR-900",
		model: "DLR 9000",
		brand: "De La Rue",
		status: "observaciones",
		branchId: "b1",
		branchName: "Sucursal Arequipa",
		location: "Bóveda principal",
		lastMaintenanceDate: "2026-01-30",
	},
];

export async function getMachines(): Promise<Machine[]> {
	return [...MOCK_MACHINES];
}

export async function getMachinesById(id: string): Promise<Machine | null> {
	const machine = MOCK_MACHINES.find((machine) => machine.id === id);
	if (!machine) return null;
	return machine;
}

export async function createMachine(
	input: CreateMachineInput,
): Promise<Machine> {
	const nueva: Machine = {
		...input,
		id: `m${MOCK_MACHINES.length + 1}`,
		lastMaintenanceDate: null,
	};
	MOCK_MACHINES.push(nueva);
	return nueva;
}

// TEMPORAL PARA PRUEBAS
//

export async function updateMachine(
	id: string,
	input: CreateMachineInput,
): Promise<Machine> {
	const index = MOCK_MACHINES.findIndex((m) => m.id === id);
	if (index === -1) throw new Error("No se encontró la máquina");
	const updated: Machine = { ...MOCK_MACHINES[index], ...input };
	MOCK_MACHINES[index] = updated;
	return updated;
}

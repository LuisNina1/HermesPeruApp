import type {
	Technician,
	TechnicianFormInput,
} from "../types/technician.types";

const MOCK_TECHNICIANS: Technician[] = [
	{
		id: "t1",
		code: "TEC-001",
		name: "Luis Nina",
		level: 3,
		phone: "959111222",
		email: "luis.nina@empresa.pe",
		hireDate: "2022-03-15",
		status: "activo",
		branchIds: ["b1"],
		branchNames: ["Sucursal Arequipa"],
	},
	{
		id: "t2",
		code: "TEC-002",
		name: "María Quispe",
		level: 2,
		phone: "959333444",
		email: "maria.quispe@empresa.pe",
		hireDate: "2023-06-01",
		status: "activo",
		branchIds: ["b2"],
		branchNames: ["Sucursal Lima"],
	},
	{
		id: "t3",
		code: "TEC-003",
		name: "Jorge Ramos",
		level: 3,
		phone: "959555666",
		email: "jorge.ramos@empresa.pe",
		hireDate: "2021-01-10",
		status: "activo",
		branchIds: ["b2"],
		branchNames: ["Sucursal Lima"],
	},
	{
		id: "t4",
		code: "TEC-004",
		name: "Ana Flores",
		level: 1,
		phone: "959777888",
		email: "ana.flores@empresa.pe",
		hireDate: "2024-09-20",
		status: "inactivo",
		branchIds: ["b2"],
		branchNames: ["Sucursal Lima"],
	},
	{
		id: "t5",
		code: "TEC-005",
		name: "Carlos Mamani",
		level: 2,
		phone: "959999000",
		email: "carlos.mamani@empresa.pe",
		hireDate: "2023-11-05",
		status: "activo",
		branchIds: ["b3"],
		branchNames: ["Sucursal Cusco"],
	},
];

export async function getTechnicians(): Promise<Technician[]> {
	return [...MOCK_TECHNICIANS];
}

export async function createTechnician(
	input: TechnicianFormInput,
): Promise<Technician> {
	const nuevo: Technician = {
		...input,
		id: `t${MOCK_TECHNICIANS.length + 1}`,
		branchNames: [],
	};
	MOCK_TECHNICIANS.push(nuevo);
	return nuevo;
}

export async function updateTechnician(
	id: string,
	input: TechnicianFormInput,
): Promise<Technician> {
	const index = MOCK_TECHNICIANS.findIndex((t) => t.id === id);
	if (index === -1) throw new Error(`No se encontro el id ${id}`);
	const updated: Technician = { ...MOCK_TECHNICIANS[index], ...input };
	MOCK_TECHNICIANS[index] = updated;
	return updated;
}

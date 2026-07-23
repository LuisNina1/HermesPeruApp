import type {
	Branch,
	BranchFormInput,
	BranchOption,
} from "../types/branch.types";

const MOCK_BRANCHES: Branch[] = [
	{
		id: "b1",
		code: "AQP",
		name: "Sucursal Arequipa",
		city: "Arequipa",
		address: "Calle Misti 306",
		machineCount: 5,
		operationalCount: 3,
		issueCount: 2,
		technicianCount: 1,
	},
	{
		id: "b2",
		code: "LIM",
		name: "Sucursal Lima",
		city: "Lima",
		address: "Av. Javier Prado 456",
		machineCount: 0,
		operationalCount: 0,
		issueCount: 0,
		technicianCount: 3,
	},
	{
		id: "b3",
		code: "CUS",
		name: "Sucursal Cusco",
		city: "Cusco",
		address: "Av. El Sol 789",
		machineCount: 0,
		operationalCount: 0,
		issueCount: 0,
		technicianCount: 1,
	},
];

export async function getBranches(): Promise<Branch[]> {
	return [...MOCK_BRANCHES];
}

export async function getBranchOptions(): Promise<BranchOption[]> {
	return MOCK_BRANCHES.map(({ id, name }) => ({ id, name }));
}

export async function createBranch(input: BranchFormInput): Promise<Branch> {
	const nueva: Branch = {
		...input,
		id: `b${MOCK_BRANCHES.length + 1}`,
		machineCount: 0,
		operationalCount: 0,
		issueCount: 0,
		technicianCount: 0,
	};
	MOCK_BRANCHES.push(nueva);
	return nueva;
}

export async function updateBranch(
	id: string,
	input: BranchFormInput,
): Promise<Branch> {
	const index = MOCK_BRANCHES.findIndex((branch) => branch.id === id);
	if (index === -1) throw new Error("Branch not found");
	const updated: Branch = { ...MOCK_BRANCHES[index], ...input };
	MOCK_BRANCHES[index] = updated;
	return updated;
}

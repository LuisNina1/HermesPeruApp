export interface Branch {
	id: string;
	code: string;
	name: string;
	city: string;
	address: string;

	machineCount: number;
	operationalCount: number;
	issueCount: number;
	technicianCount: number;
}

export type BranchFormInput = Pick<
	Branch,
	"code" | "name" | "city" | "address"
>;

export interface BranchOption {
	id: string;
	name: string;
}

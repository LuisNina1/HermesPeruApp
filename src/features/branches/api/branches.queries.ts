import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BranchFormInput } from "../types/branch.types";
import {
	createBranch,
	getBranches,
	getBranchOptions,
	updateBranch,
} from "./branches.api";

export const branchKeys = {
	all: ["branches"] as const,
	options: ["options"] as const,
};

export function useBranches() {
	return useQuery({
		queryKey: branchKeys.all,
		queryFn: getBranches,
	});
}

export function useBranchOptions() {
	return useQuery({
		queryKey: branchKeys.options,
		queryFn: getBranchOptions,
	});
}

export function useCreateBranch() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createBranch,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: branchKeys.all }),
	});
}

export function useUpdateBranch() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, input }: { id: string; input: BranchFormInput }) =>
			updateBranch(id, input),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: branchKeys.all }),
	});
}

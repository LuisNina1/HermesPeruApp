import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateMachineInput } from "../types/machine.types";
import {
	createMachine,
	getMachines,
	getMachinesById,
	updateMachine,
} from "./machines.api";

export const machineKeys = {
	all: ["machines"] as const,
	detail: (id: string) => ["machines", id] as const,
};

export function useMachines() {
	return useQuery({
		queryKey: machineKeys.all,
		queryFn: getMachines,
	});
}

export function useMachine(id: string) {
	return useQuery({
		queryKey: machineKeys.detail(id),
		queryFn: () => getMachinesById(id),
		enabled: !!id,
	});
}

export function useCreateMachine() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createMachine,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: machineKeys.all });
		},
	});
}

export function useUpdateMachine() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, input }: { id: string; input: CreateMachineInput }) =>
			updateMachine(id, input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: machineKeys.all });
		},
	});
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TechnicianFormInput } from "../types/technician.types";
import {
	createTechnician,
	getTechnicians,
	updateTechnician,
} from "./technicians.api";

export const techniciansKeys = {
	all: ["technicians"] as const,
};

export function useTechnicians() {
	return useQuery({
		queryKey: techniciansKeys.all,
		queryFn: getTechnicians,
	});
}

export function useCreateTechnician() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createTechnician,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: techniciansKeys.all }),
	});
}

export function useUpdateTechnician() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, input }: { id: string; input: TechnicianFormInput }) =>
			updateTechnician(id, input),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: techniciansKeys.all }),
	});
}

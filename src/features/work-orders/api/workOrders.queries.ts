import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	CreateWorkOrderPayload,
	WorkOrderStatus,
} from "../types/workOrder.types";
import {
	createWorkOrder,
	getWorkOrders,
	updateWorkOrder,
} from "./workOrders.api";

export const workOrdersKeys = { all: ["work-orders"] as const };

export function useWorkOrders() {
	return useQuery({
		queryKey: workOrdersKeys.all,
		queryFn: getWorkOrders,
	});
}

export function useCreateWorkOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createWorkOrder,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: workOrdersKeys.all }),
	});
}

export function useUpdateWorkOrder() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: string;
			input: CreateWorkOrderPayload & {
				status: WorkOrderStatus;
				closedAt: string | null;
			};
		}) => updateWorkOrder(id, input),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: workOrdersKeys.all }),
	});
}

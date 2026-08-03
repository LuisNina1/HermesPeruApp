import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { BranchesPage } from "@/pages/BranchesPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { MachinesPage } from "@/pages/MachinesPage";
import { TechniciansPage } from "@/pages/TechniciansPage";
import { WorkOrdersPage } from "@/pages/WorkOrderPage";
import { ROUTES } from "./routePaths";

export function AppRouter() {
	return (
		<Routes>
			<Route element={<DashboardLayout />}>
				<Route path={ROUTES.dashboard} element={<DashboardPage />} />
				<Route path={ROUTES.machines} element={<MachinesPage />} />
				<Route path={ROUTES.branches} element={<BranchesPage />} />
				<Route path={ROUTES.technicians} element={<TechniciansPage />} />
				<Route path={ROUTES.workOrders} element={<WorkOrdersPage />} />

				{/* Aquí irás sumando una ruta por feature */}
			</Route>
			<Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
		</Routes>
	);
}

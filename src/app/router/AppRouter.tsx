import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { ROUTES } from "./routePaths";

export function AppRouter() {
	return (
		<Routes>
			<Route element={<DashboardLayout />}>
				<Route path={ROUTES.dashboard} element={<DashboardPage />} />
				{/* Aquí irás sumando una ruta por feature */}
			</Route>
			<Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
		</Routes>
	);
}

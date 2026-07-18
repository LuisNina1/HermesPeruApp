import { Bell, Search, Settings } from "lucide-react";

export function Topbar() {
	return (
		<header className="h-16 shrink-0 border-b border-border bg-surface flex items-center gap-4 px-6">
			<div className="flex items-center gap-2 flex-1 max-w-md rounded-lg bg-bg border border-border px-3 py-2">
				<Search size={16} className="text-text-muted" />
				<input
					placeholder="Buscar OT, serie, modelo..."
					className="bg-transparent outline-none text-sm w-full placeholder:text-text-muted"
				/>
			</div>

			<div className="ml-auto flex items-center gap-4">
				<button className="text-text-muted hover:text-text">
					<Bell size={18} />
				</button>
				<button className="text-text-muted hover:text-text">
					<Settings size={18} />
				</button>
				<div className="flex items-center gap-2">
					<div className="text-right">
						<p className="text-sm font-medium leading-tight">Luis Nina</p>
						<p className="text-xs text-text-muted">Sucursal Arequipa</p>
					</div>
					<div className="grid place-items-center w-9 h-9 rounded-full bg-primary text-white text-xs font-semibold">
						LN
					</div>
				</div>
			</div>
		</header>
	);
}

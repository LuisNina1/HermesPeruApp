/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
			onClick={onClose}
		>
			<div
				className="w-full max-w-lg rounded-xl border border-border bg-surface shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center justify-between border-b border-border px-5 py-4">
					<h2 className="text-lg font-semibold">{title}</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-text-muted hover:text-text"
					>
						<X size={18} />
					</button>
				</div>
				<div className="p-5">{children}</div>
			</div>
		</div>
	);
}

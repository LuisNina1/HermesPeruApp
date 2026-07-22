/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
import { X } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
	// Se soluciono bug de modal con el mouse

	const pointerDownOverlay = useRef(false);

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
			onMouseDown={(e) => {
				pointerDownOverlay.current = e.target === e.currentTarget;
			}}
			onMouseUp={(e) => {
				if (pointerDownOverlay.current && e.target === e.currentTarget) {
					onClose();
				}
				pointerDownOverlay.current = false;
			}}
		>
			<div
				className="w-full max-w-lg rounded-xl border border-border bg-surface shadow-xl"
				onMouseDown={(e) => e.stopPropagation()}
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

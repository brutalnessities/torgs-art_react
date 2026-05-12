import "./dialog.sass";
export default function Dialog({ isOpen, onClose, children }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}): import("react").ReactPortal | null;
//# sourceMappingURL=dialog.d.ts.map
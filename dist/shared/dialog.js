import { jsx as _jsx } from "react/jsx-runtime";
import "./dialog.sass";
import { useEffect } from "react";
import { createPortal } from "react-dom";
export default function Dialog({ isOpen, onClose, children }) {
    useEffect(() => {
        function handleEsc(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden"; // prevent scroll
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot)
        return null;
    return createPortal(_jsx("div", { className: "overlay", onClick: onClose, children: _jsx("div", { className: "dialog", onClick: (e) => e.stopPropagation(), children: children }) }), modalRoot);
}
//# sourceMappingURL=dialog.js.map
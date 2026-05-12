import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.sass";
import Item from "./components/gallery/create/item";
import Gallery from "./components/gallery/gallery";
import { useState, useEffect } from "react";
import Login from "./components/login/login";
import { supabase } from "./utils/supaBase";
import Dialog from "./shared/dialog";
function App() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [page, setPage] = useState("gallery");
    const [user, setUser] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen);
    }
    function DropdownMenu() {
        return (_jsxs("div", { className: "dropdown-menu", children: [_jsx("button", { onClick: () => setPage("gallery"), children: "Gallery" }, "gallery"), user && (_jsx("button", { onClick: () => setIsDialogOpen(true), children: "Create" }, "create")), !user && (_jsx("button", { onClick: () => setPage("login"), children: "Login" }, "login"))] }));
    }
    return (_jsxs("div", { className: "App", children: [_jsxs("header", { children: [_jsxs("div", { className: "header-content", children: [_jsx("img", { src: "/artsy-logo.png", className: "logo", alt: "logo" }), _jsx("h3", { children: "Torgs Art" }), _jsx("img", { src: "/menu.svg", className: "menu", onClick: toggleDropdown, alt: "menu" })] }), isDropdownOpen && _jsx(DropdownMenu, {})] }), _jsxs("main", { children: [page === "gallery" && _jsx(Gallery, {}), !user && page === "login" && _jsx(Login, {}), _jsx(Dialog, { isOpen: isDialogOpen, onClose: () => setIsDialogOpen(false), children: _jsx(Item, { onClose: () => setIsDialogOpen(false) }) })] })] }));
}
export default App;
//# sourceMappingURL=App.js.map
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../gallery/create/item"; //for now just copy the item sass, but will likely need to be changed
import { supabase } from "../../utils/supaBase";
async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const input = Object.fromEntries(formData);
    await supabase.auth.signInWithPassword({
        email: `${input.username}`,
        password: `${input.password}`,
    });
}
export default function Login() {
    return (_jsxs("form", { className: "item-create", onSubmit: onSubmit, children: [_jsx("input", { type: "text", name: "username", placeholder: "Username", required: true }), _jsx("input", { type: "password", name: "password", placeholder: "Password", required: true }), _jsx("button", { type: "submit", children: "Login" })] }));
}
//# sourceMappingURL=login.js.map
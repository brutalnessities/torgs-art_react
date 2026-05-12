import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./item.sass";
import "styles/form.sass";
import { createItem } from "../../../services/gallery";
import { uploadImage } from "../../../services/images";
import { useState } from "react";
async function onSubmit(event, callback) {
    event.preventDefault();
    // disable the submit button to prevent multiple submissions
    event.target.querySelector('button[type="submit"]').disabled = true;
    const formData = new FormData(event.target);
    const input = Object.fromEntries(formData);
    // // first upload the image, then create the item with the returned URL
    const imageFile = formData.get("imageFile");
    if (imageFile instanceof File) {
        const result = await uploadImage(imageFile);
        if (!result) {
            window.alert("Image upload failed");
            return;
        }
        const { data, error } = result;
        if (error) {
            window.alert("Image upload failed");
            return console.error(error);
        }
        if (data && data.path) {
            await createItem({ ...input, imageUrl: data.path });
        }
    }
    // close the dialog after submission;
    callback();
}
export default function Item({ onClose }) {
    const [preview, setPreview] = useState(null);
    function submit(event) {
        onSubmit(event, () => {
            setPreview(null);
            onClose();
        });
    }
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file)
            return;
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };
    return (_jsxs("dialog", { className: "item-create-dialog", open: true, children: [preview && (_jsx("div", { className: "image-preview", children: _jsx("img", { src: preview, alt: "Preview" }) })), _jsxs("form", { className: "item-create", onSubmit: submit, children: [_jsx("input", { type: "text", name: "title", placeholder: "Title" }), _jsxs("section", { className: "row", children: [_jsx("input", { type: "number", name: "year", placeholder: "Year", min: "2000", required: true }), _jsx("input", { type: "text", name: "medium", placeholder: "Medium", required: true })] }), _jsxs("section", { className: "row", children: [_jsx("input", { type: "number", name: "height", placeholder: "Height", required: true }), _jsx("input", { type: "number", name: "width", placeholder: "Width", required: true }), _jsxs("select", { name: "metric", defaultValue: "in", required: true, children: [_jsx("option", { value: "in", children: "in" }), _jsx("option", { value: "ft", children: "ft" })] })] }), _jsx("input", { type: "text", name: "location", placeholder: "Location" }), _jsx("input", { type: "text", name: "description", placeholder: "Description" }), _jsx("input", { type: "file", name: "imageFile", placeholder: "Image File", required: true, onChange: handleChange, style: { alignContent: "space-evenly" } }), _jsx("button", { type: "submit", children: "Create" })] })] }));
}
//# sourceMappingURL=item.js.map
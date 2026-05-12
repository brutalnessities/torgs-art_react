import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./gallery.sass";
import "./museum.sass";
import { useEffect, useState, useRef } from "react";
import { GET_ITEMS } from "../../services/gallery";
export default function Gallery() {
    const [virtualX, setVirtualX] = useState(0);
    const speed = .001;
    const [data, setData] = useState([]);
    const containerRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    function isMobile() {
        const out = () => {
            switch (true) {
                // test if pointer is coarse (touchscreen)
                case window.matchMedia("(pointer: coarse)").matches:
                    return true;
                case /Android/i.test(navigator.userAgent):
                    return true;
                case /webOS/i.test(navigator.userAgent):
                    return true;
                case /iPhone/i.test(navigator.userAgent):
                    return true;
                case /iPad/i.test(navigator.userAgent):
                    return true;
                case /iPod/i.test(navigator.userAgent):
                    return true;
                case /BlackBerry/i.test(navigator.userAgent):
                    return true;
                case /Windows Phone/i.test(navigator.userAgent):
                    return true;
                default:
                    return false;
            }
        };
        return out();
    }
    //all arrow keys
    window.addEventListener("keydown", (e) => {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
            e.preventDefault();
            const delta = e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1;
            setVirtualX((prev) => prev + delta * 50); // adjust scroll speed as needed
            requestAnimationFrame(animate);
        }
    }, { passive: false });
    window.addEventListener("wheel", (e) => {
        e.preventDefault();
        setVirtualX((prev) => prev + (e.deltaX || e.deltaY) * speed);
        requestAnimationFrame(animate);
    }, { passive: false });
    function animate() {
        const loopWidth = containerRef.current.scrollWidth / 3;
        setVirtualX((prev) => prev % loopWidth);
        containerRef.current.style.transformBehavior = "smooth";
        containerRef.current.style.transform = `translateX(${virtualX - loopWidth}px)`;
    }
    // scroll on wheel
    useEffect(() => {
        if (isMobile())
            return;
        console.log("setting up scroll");
        const parent = containerRef.current.parentElement;
        const wrapper = containerRef.current;
        if (hasStarted || !parent || data.length === 0)
            return;
        setHasStarted(true);
        const scrollAmount = wrapper.scrollWidth / 3;
        wrapper.style.transform = `translateX(${-scrollAmount}px)`;
        setVirtualX((prev) => prev - scrollAmount);
    }, [containerRef, data, virtualX, hasStarted]);
    // load items on mount
    useEffect(() => {
        setItems();
    }, []);
    function makeItems(data) {
        if (!data || data.length === 0)
            return _jsx("p", { children: "No items found." });
        activeItem === null && setActiveItem(0);
        return data.map((one, index) => {
            const { photo_url } = one?.item_images?.[0] ?? {};
            return (_jsx("div", { className: `item-${index} card ${index === 0 ? "active" : ""}`, children: _jsx("img", { className: "inner-card", src: photo_url, alt: one.title, onClick: () => {
                        setActiveItem(index);
                        // add active class to clicked item and remove from others
                        const items = document.querySelectorAll("#gallery > div");
                        items.forEach((item, i) => {
                            if (i % data.length === index % data.length) {
                                item.classList.add("active");
                            }
                            else {
                                item.classList.remove("active");
                            }
                        });
                    } }) }, index));
        });
    }
    async function setItems() {
        setData(await GET_ITEMS());
    }
    const items = makeItems(data);
    return (_jsxs("div", { id: "museum", children: [_jsxs("section", { id: "gallery", ref: containerRef, children: [items, items, items] }), _jsx("section", { id: "display", children: activeItem !== null && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "image-container", children: [_jsx("img", { src: data[activeItem]?.item_images?.[0]?.photo_url, alt: data[activeItem]?.title }), _jsx("div", { className: "bg", style: {
                                        backgroundImage: `url(${data[activeItem]?.item_images?.[0]?.photo_url})`,
                                    } })] }), _jsxs("div", { className: "info", children: [_jsx("h2", { children: _jsx("i", { children: data[activeItem]?.title ?? "Untitled" }) }), _jsxs("p", { children: [data[activeItem]?.height, " x ", data[activeItem]?.width, " ", data[activeItem]?.metric] }), _jsx("p", { children: data[activeItem]?.medium }), _jsx("p", { children: data[activeItem]?.location }), _jsx("p", { children: data[activeItem]?.item_images?.[0]?.description })] })] })) })] }));
}
//# sourceMappingURL=gallery.js.map
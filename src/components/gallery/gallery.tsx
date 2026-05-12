import "./gallery.sass";
import "./museum.sass";
import { useEffect, useState, useRef } from "react";
import { GET_ITEMS } from "../../services/gallery";

export default function Gallery() {
  const [virtualX, setVirtualX] = useState<number>(0);
  const speed = .001;
  const [data, setData] = useState<any[]>([]);
  const containerRef = useRef<any>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);

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
  window.addEventListener(
    "keydown",
    (e) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        const delta = e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1;
        setVirtualX((prev) => prev + delta * 50); // adjust scroll speed as needed
        requestAnimationFrame(animate);
      }
    },
    { passive: false },
  );

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      setVirtualX((prev) => prev + (e.deltaX || e.deltaY) * speed);
      requestAnimationFrame(animate);
    },
    { passive: false },
  );

  function animate() {
    const loopWidth = containerRef.current.scrollWidth / 3;
    setVirtualX((prev) => prev % loopWidth);
    containerRef.current.style.transformBehavior = "smooth";
    containerRef.current.style.transform = `translateX(${virtualX - loopWidth}px)`;
  }
  
  // scroll on wheel
  useEffect(() => {
    if (isMobile()) return;
    console.log("setting up scroll");
    const parent = containerRef.current.parentElement;
    const wrapper = containerRef.current;
    if (hasStarted || !parent || data.length === 0) return;
    setHasStarted(true);
    const scrollAmount = wrapper.scrollWidth / 3;
    wrapper.style.transform = `translateX(${-scrollAmount}px)`;
    setVirtualX((prev) => prev - scrollAmount);
  }, [containerRef, data, virtualX, hasStarted]);

  // load items on mount
  useEffect(() => {
    setItems();
  }, []);

  function makeItems(data: any[]) {
    if (!data || data.length === 0) return <p>No items found.</p>;
    activeItem === null && setActiveItem(0);
    return data.map((one, index) => {
      const { photo_url } = one?.item_images?.[0] ?? {};
      return (
        <div
          key={index}
          className={`item-${index} card ${index === 0 ? "active" : ""}`}
        >
          <img
            className="inner-card"
            src={photo_url}
            alt={one.title}
            onClick={() => {
              setActiveItem(index);
              // add active class to clicked item and remove from others
              const items = document.querySelectorAll("#gallery > div");
              items.forEach((item, i) => {
                if (i % data.length === index % data.length) {
                  item.classList.add("active");
                } else {
                  item.classList.remove("active");
                }
              });
            }}
          />
        </div>
      );
    });
  }

  async function setItems() {
    setData(await GET_ITEMS());
  }

  const items = makeItems(data);

  return (
    <div id="museum">
      <section id="gallery" ref={containerRef}>
        {items}
        {items}
        {items}
      </section>
      <section id="display">
        {activeItem !== null && (
          <>
            <div className="image-container">
              <img
                src={data[activeItem]?.item_images?.[0]?.photo_url}
                alt={data[activeItem]?.title}
              />
              <div
                className="bg"
                style={{
                  backgroundImage: `url(${data[activeItem]?.item_images?.[0]?.photo_url})`,
                }}
              ></div>
            </div>
            <div className="info">
              <h2>
                <i>{data[activeItem]?.title ?? "Untitled"}</i>
              </h2>
              <p>
                {data[activeItem]?.height} x {data[activeItem]?.width}{" "}
                {data[activeItem]?.metric}
              </p>
              <p>{data[activeItem]?.medium}</p>
              <p>{data[activeItem]?.location}</p>
              <p>{data[activeItem]?.item_images?.[0]?.description}</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

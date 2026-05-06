// import "./gallery.sass";
import "./museum.sass";
import { useEffect, useState, useRef, use } from "react";
import { getItems } from "services/gallery";

export default function Gallery() {
  const [data, setData] = useState([]);
  const containerRef = useRef();
  const [hasStarted, setHasStarted] = useState(false);

  let startX = 0;
  let virtualX = 0;
  const speed = .5;

  window.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  window.addEventListener("touchmove", (e) => {
    const delta = startX - e.touches[0].clientX;
    virtualX += delta;
    startX = e.touches[0].clientX;
  });

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      virtualX += (e.deltaX || e.deltaY) * speed;
      requestAnimationFrame(animate);
    },
    { passive: false },
  );

  // scroll on wheel
  useEffect(() => {
    setupScroll();
  }, [containerRef, data]);

  function setupScroll() {
    const parent = containerRef.current.parentElement;
    const wrapper = containerRef.current;
    if (hasStarted || !parent || data.length === 0) return;
    setHasStarted(true);
    const scrollAmount = wrapper.scrollWidth / 3;
    wrapper.style.transform = `translateX(${-scrollAmount}px)`;
    virtualX -= scrollAmount;
  }

  function animate() {
    const loopWidth = containerRef.current.scrollWidth / 3;
    virtualX = virtualX % loopWidth;
    containerRef.current.style.transformBehavior = "smooth";
    containerRef.current.style.transform = `translateX(${virtualX - loopWidth}px)`;
  }

  // load items on mount
  useEffect(() => {
    setItems();
  }, []);

  function makeItems(data, dupe = false) {
    if ((!data || data.length === 0) && !dupe) return <p>No items found.</p>;

    return data.map((one, index) => {
      const isPortrait = one.height > one.width;
      const { description, photo_url } = one.item_images?.[0] ?? {};
      return (
        <div
          key={index}
          className={`item-${index} holo ${isPortrait ? "portrait" : "landscape"} ${dupe ? "dupe" : ""}`}
        >
          <h2>
            <i>
              {one.id}
              {one.title ?? "Untitled"}
            </i>
          </h2>
          <p>
            {one.height} x {one.width} {one.metric}
          </p>
          <p>{one.medium}</p>
          <p>{one.location}</p>
          <img
            src={photo_url}
            alt={one.title}
            onClick={() =>
              document
                .querySelector(`.item-${index}`)
                .classList.toggle("expanded")
            }
          />
          <p>{description}</p>
        </div>
      );
    });
  }

  async function setItems() {
    setData(await getItems());
  }

  const items = makeItems(data);

  return (
    <section id="gallery" ref={containerRef}>
      {items}
      {items}
      {items}
    </section>
  );
}

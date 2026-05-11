// import "./gallery.sass";
import "./museum.sass";
import { useEffect, useState, useRef, use, act } from "react";
import { getItems } from "services/gallery";

export default function Gallery() {
  const [data, setData] = useState([]);
  const containerRef = useRef();
  const [hasStarted, setHasStarted] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  let startX = 0;
  let virtualX = 0;
  const speed = 0.5;

  window.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  window.addEventListener("touchmove", (e) => {
    const delta = startX - e.touches[0].clientX;
    virtualX += delta;
    startX = e.touches[0].clientX;
  });

  window.addEventListener("arrow", (val) => {
    virtualX += val;
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

  function makeItems(data) {
    if (!data || data.length === 0) return <p>No items found.</p>;

    return data.map((one, index) => {
      const { photo_url } = one.item_images?.[0] ?? {};
      return (
        <div
          key={index}
          className={`item-${index} ${index === 0 ? "active" : ""}`}
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
    setData(await getItems().then((res) => {
      setActiveItem(0);
      return res}).catch((err) => console.error(err)));
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
                src={data[activeItem].item_images?.[0]?.photo_url}
                alt={data[activeItem].title}
              />
              <div
                className="bg"
                style={{
                  backgroundImage: `url(${data[activeItem].item_images?.[0]?.photo_url})`,
                }}
              ></div>
            </div>
            <div className="info">
              <h2>
                <i>{data[activeItem].title ?? "Untitled"}</i>
              </h2>
              <p>
                {data[activeItem].height} x {data[activeItem].width}{" "}
                {data[activeItem].metric}
              </p>
              <p>{data[activeItem].medium}</p>
              <p>{data[activeItem].location}</p>
              <p>{data[activeItem].item_images?.[0]?.description}</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

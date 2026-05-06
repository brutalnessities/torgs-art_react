// import "./gallery.sass";
import "./museum.sass";
import { useEffect, useState, useRef, use } from "react";
import { getItems } from "services/gallery";

export default function Gallery() {
  const [data, setData] = useState([]);
  const containerRef = useRef();
  const [hasStarted, setHasStarted] = useState(false);

  function setupScroll() {
    const parent = containerRef.current.parentElement;
    const wrapper = containerRef.current;
    console.log({hasStarted, el: parent, dataLength: data.length});
    if (hasStarted || !parent || data.length === 0) return;
    setHasStarted(true);
    console.log("starting scroll");
    parent.addEventListener("scroll", () => {
      console.log(parent.scrollLeft)
      // if scroll position is at the start or end, jump to the opposite end
      if (parent.scrollLeft === 0) {
        // parent.scrollTo(parent.scrollWidth / 2, {behavior: "auto"});
        requestAnimationFrame(() => {
          parent.scrollTo((parent.scrollWidth / 2) + 1, {behavior: "auto"});
        });
      } else if (parent.scrollLeft >= wrapper.scrollWidth - parent.clientWidth) {
        // parent.scrollTo((parent.scrollWidth / 2) - parent.clientWidth, {behavior: "auto"});
        requestAnimationFrame(() => {
          parent.scrollTo((parent.scrollWidth / 2) - parent.clientWidth - 1, {behavior: "auto"});
        });
      }
    });
  }

  // scroll on wheel
  useEffect(() => {
    setupScroll();
  }, [containerRef, data]);

  // load items on mount
  useEffect(() => {
    setItems();
  }, []);

  function makeItems(data, dupe = false) {
    if ((!data || data.length === 0) && !dupe) return <p>No items found.</p>;

    return data.map((one, index) => {
      if (index > 3) return null; // testing
      const isPortrait = one.height > one.width;
      const { description, photo_url } = one.item_images?.[0] ?? {};
      return (
        <div
          key={index}
          className={`item-${index} holo ${isPortrait ? "portrait" : "landscape"} ${dupe ? "dupe" : ""}`}
        >
          {/* <div className="content"> */}
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
          {/* </div> */}
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
      {/* {items} */}
    </section>
  );
}

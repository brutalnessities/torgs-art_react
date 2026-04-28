import "./gallery.css";
import { useEffect, useState } from "react";
import { getItems } from "services/gallery";

export default function Gallery() {
  useEffect(() => {
    loadTodos();
  }, []);

  const [data, setData] = useState([]);

  function makeItems(data) {
    if (!data || data.length === 0) return <p>No items found.</p>;

    return data.map((one, index) => {
      const { description, photo_url } = one.item_images?.[0] ?? {};
      return (
        <div key={index} className={`item-${index} holo`}>
          <div className="content">
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
        </div>
      );
    });
  }

  async function loadTodos() {
    setData(await getItems());
  }

  return <section id="gallery">{makeItems(data)}</section>;
}

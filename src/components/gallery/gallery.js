import "./gallery.css";
import { useEffect, useState } from "react";
import { getItems } from "../../services/gallery";

export default function Gallery() {
  useEffect(() => {
    loadTodos();
  }, []);

  const [data, setData] = useState([]);

  function makeItems(data) {
    return data.map((one) => {
      const { description, photo_url } = one.item_images[0];
      return (
        <div key={one.id} className={`item-${one.id}`}>
          <h2>
            <i>
              {one.id}
              {one.title ?? "Untitled"}
            </i>
          </h2>
          <p>
            {one.height} x {one.width} {one.metrics}
          </p>
          <p>{one.medium}</p>
          <p>{one.location}</p>
          <img
            src={photo_url}
            alt={one.title}
            onClick={() =>
              document
                .querySelector(`.item-${one.id}`)
                .classList.toggle("expanded")
            }
          />
          <p>{description}</p>
        </div>
      );
    });
  }

  async function loadTodos() {
    const { data: fetchedData, error } = await getItems();
    if (error) return console.error(error);
    setData(fetchedData);
  }

  return <section id="gallery">{makeItems(data)}</section>;
}

import "./item.css";
import { createItem } from "../../../services/gallery";

async function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const input = Object.fromEntries(formData);
  await createItem(input);
}

export default function Item() {
  return (
    <form className="item-create" onSubmit={onSubmit}>
      <input type="text" name="title" placeholder="Title" min="2000" required />
      <input type="number" name="year" placeholder="Year" required />
      <input type="text" name="medium" placeholder="Medium" required />
      <input type="number" name="height" placeholder="Height" required />
      <input type="number" name="width" placeholder="Width" required />
      <select name="metric" placeholder="Metric">
        <option value="in">in</option>
        <option value="ft">ft</option>
      </select>
      <input type="text" name="location" placeholder="Location" />
      <input type="text" name="description" placeholder="Description" />
      <input type="text" name="imageUrl" placeholder="Image URL" />
      {/* <input type="file" name="imageFile" placeholder="Image File" /> */}
      <button type="submit">Create</button>
    </form>
  );
}

import "./item.sass";
import "@styles/form.sass";
import { createItem } from "@services/gallery";
import { uploadImage } from "@services/images";
import { useState } from "react";

async function onSubmit(event: any, callback: () => void) {
  event.preventDefault();

  // disable the submit button to prevent multiple submissions
  event.target.querySelector('button[type="submit"]').disabled = true;

  const formData = new FormData(event.target);
  const input = Object.fromEntries(formData) as Record<string, FormDataEntryValue>;

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

export default function Item({ onClose }: { onClose: () => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  function submit(event: any) {
    onSubmit(event, () => {
      setPreview(null);
      onClose();
    });
  }

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  return (
    <dialog className="item-create-dialog" open>
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}
      <form className="item-create" onSubmit={submit}>
        <input type="text" name="title" placeholder="Title" />
        <section className="row">
          <input
            type="number"
            name="year"
            placeholder="Year"
            min="2000"
            required
          />
          <input type="text" name="medium" placeholder="Medium" required />
        </section>
        <section className="row">
          <input type="number" name="height" placeholder="Height" required />
          <input type="number" name="width" placeholder="Width" required />
          <select name="metric" defaultValue="in" required>
            <option value="in">in</option>
            <option value="ft">ft</option>
          </select>
        </section>
        <input type="text" name="location" placeholder="Location" />
        <input type="text" name="description" placeholder="Description" />
        <input
          type="file"
          name="imageFile"
          placeholder="Image File"
          required
          onChange={handleChange}
          style={{ alignContent: "space-evenly" }}
        />
        <button type="submit">Create</button>
      </form>
    </dialog>
  );
}

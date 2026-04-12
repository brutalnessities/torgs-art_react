import { supabase } from "../utils/supaBase";
const ITEMS_TABLE = "items";
const ITEM_IMAGES_TABLE = "item_images";

// GET all items
export async function getItems() {
  return await supabase
    .from(ITEMS_TABLE)
    .select(
      `
      title,
      order,
      year,
      medium,
      height,
      width,
      metric,
      location,
      item_images (
        photo_url,
        description
      )
    `,
    )
    .order("order", { ascending: true })
    .order("id", { ascending: false });
}

// INSERT item
export async function createItem(data) {
  const { data: item, error: itemError } = await supabase
    .from(ITEMS_TABLE)
    .insert([
      {
        title: data.title,
        year: data.year,
        medium: data.medium,
        height: data.height,
        width: data.width,
        metric: data.metric,
        location: data.location,
      },
    ])
    .select()
    .single();

  if (itemError) return console.error(itemError);
  if (!data.imageUrl || !data.description) return { res: item, error: null };

  const { error: imageError } = await supabase.from(ITEM_IMAGES_TABLE).insert([
    {
      item_id: item.id,
      photo_url: data.imageUrl,
      description: data.description,
    },
  ]);

  if (imageError) return console.error(imageError);
  return { res: item, error: null };
}

// DELETE item
export async function deleteItem(id) {
  return await supabase.from(ITEMS_TABLE).delete().eq("id", id);
}

// EDIT item
export async function updateItem(id, title) {
  return await supabase.from(ITEMS_TABLE).update({ title }).eq("id", id);
}

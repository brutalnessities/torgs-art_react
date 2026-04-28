import imageCompression from "browser-image-compression";
import { supabase } from "utils/supaBase";

export async function uploadImage(file) {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920, // optional resize
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const fileExt = compressedFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const res = await supabase.storage
      .from("images/art")
      .upload(filePath, compressedFile);

    if (res.error) throw res.error;

    return res;
  } catch (err) {
    console.error(err);
  }
}

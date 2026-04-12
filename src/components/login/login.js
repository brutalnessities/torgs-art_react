import "../gallery/create/item"; //for now just copy the item css, but will likely need to be changed
import { supabase } from "../../utils/supaBase";

async function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const input = Object.fromEntries(formData);

  await supabase.auth.signInWithPassword({
    email: input.username,
    password: input.password,
  });
}

export default function Login() {
  return (
    <form className="item-create" onSubmit={onSubmit}>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

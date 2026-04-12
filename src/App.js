import "./App.css";
import Item from "./components/gallery/create/item";
import Gallery from "./components/gallery/gallery";
import { useState, useEffect } from "react";
import Login from "./components/login/login";
import { supabase } from "./utils/supaBase";

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [page, setPage] = useState("gallery");
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function DropdownMenu() {
    return (
      <div className="dropdown-menu">
        <button key="gallery" onClick={() => setPage("gallery")}>
          Gallery
        </button>
        {user && (
          <button key="create" onClick={() => setPage("create")}>
            Create
          </button>
        )}
        {!user && (
          <button key="login" onClick={() => setPage("login")}>
            Login
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <img src="/artsy-logo.png" className="logo" alt="logo" />
          <h3>Torgs Art</h3>
          <img
            src="/menu.svg"
            className="menu"
            onClick={toggleDropdown}
            alt="menu"
          />
        </div>
        {isDropdownOpen && <DropdownMenu />}
      </header>
      <main>
        {page === "gallery" && <Gallery />}
        {user && page === "create" && <Item />}
        {!user && page === "login" && <Login />}
      </main>
    </div>
  );
}

export default App;

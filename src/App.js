import "./App.css";
import Item from "./components/gallery/create/item";
import Gallery from "./components/gallery/gallery";
import { useState, useEffect } from "react";
import Login from "./components/login/login";
import { supabase } from "./utils/supaBase";
import Dialog from "./shared/dialog";

function App() {
  console.log('app')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [page, setPage] = useState("gallery");
  const [user, setUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    console.log('useeffect')
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
          <button key="create" onClick={() => setIsDialogOpen(true)}>
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
        {!user && page === "login" && <Login />}
        <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <Item onClose={() => setIsDialogOpen(false)} />
        </Dialog>
      </main>
    </div>
  );
}

export default App;

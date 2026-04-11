import "./App.css";
import Gallery from "./components/gallary";
import { useState } from "react";

const dropdownItems = [
  { name: "Home", link: "/" },
  { name: "Gallery", link: "/gallery" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

function DropdownMenu() {
  return (
    <div className="dropdown-menu">
      {dropdownItems.map((item) => (
        <div>
          <a key={item.name} href={item.link} className="dropdown-item">
            {item.name}
          </a>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <img src="/artsy-logo.png" className="logo" alt="logo" />
          <h3>Torgs Art</h3>
          <img src="/menu.svg" className="menu" onClick={toggleDropdown} />
        </div>
        {isDropdownOpen && <DropdownMenu />}
      </header>
      <main>
        <Gallery />
      </main>
    </div>
  );
}

export default App;

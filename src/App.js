import "./App.css";
import Item from "./components/gallery/create/item";
import Gallery from "./components/gallery/gallery";
import { useState } from "react";
import Login from "./components/login/login";

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [page, setPage] = useState(<Gallery />);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const dropdownItems = [
    { name: "Gallery", link: "javascript:void(0)", action: <Gallery /> },
    { name: "Create", link: "javascript:void(0)", action: <Item /> },
    { name: "Login", link: "javascript:void(0)", action: <Login /> },
  ];

  function DropdownMenu({ items }) {
    return (
      <div className="dropdown-menu">
        {items.map((item) => (
          <div key={item.name} onClick={() => setPage(item.action)}>
            <a href={item.link} className="dropdown-item">{item.name}</a>
          </div>
        ))}
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
        {isDropdownOpen && <DropdownMenu items={dropdownItems} />}
      </header>
      <main>{page}</main>
    </div>
  );
}

export default App;

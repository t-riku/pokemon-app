import React from "react";
import "./Navbar.css";
import pokemon_logo from "../../assets/pokemon_logo2.png";

const Navbar = () => {
  return (
    <nav>
      <img src={pokemon_logo} alt="pokemon_logo" />
      {/* <h1>ポケモン図鑑</h1> */}
    </nav>
  );
};

export default Navbar;

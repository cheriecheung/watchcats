import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <span>&reg; 2020</span>
    </footer>
  );
}

export default Footer;

import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircleFill, JournalText } from "react-bootstrap-icons";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <nav className="menu-bar">
      <h2 onClick={() => navigate("/")}>
        <JournalText />
      </h2>
      <h2 onClick={() => navigate("/new-address")}>
        <PlusCircleFill />
      </h2>
    </nav>
  );
};

export default Menu;

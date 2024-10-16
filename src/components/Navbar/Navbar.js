import React from "react";
import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { Nav } from "react-bootstrap";

export default function Navbar() {
    return (
      <Nav className="NavbarItems">
        <h1 className="Navbar-logo">Loop+</h1>
        <div className="menu-icon"></div>
        <ul>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.Title}
                </a>
              </li>
            );
          })}
        </ul>
      </Nav>
    );
  }
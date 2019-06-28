import React, { Component } from "react";
import { Link, scroller } from "react-scroll";
import "./Navbar.css";

export default class Navbar extends Component {
  scrollTo3 = () => {
    scroller.scrollTo("section3", {
      duration: 1500,
      delay: 100,
      smooth: true,
      containerId: "containerElement",
      offset: 50 // Scrolls to element + 50 pixels down the page
    });
  };

  render() {
    return (
      <nav className="nav" id="navbar" style={{ position: "fixed" }}>
        <div className="nav-content">
          <ul className="nav-items">
            <li className="nav-item">
              <Link
                activeClass="active"
                to="section1"
                containerId="containerElement"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Video
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClass="active"
                to="section2"
                containerId="containerElement"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Memo
              </Link>
            </li>
            <li className="nav-item">
              <Link
                activeClass="active"
                to="section3"
                containerId="containerElement"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Album
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

import React from "react";
import classes from "./DashBoard.module.scss";
import Navbar from "./Navbar/Navbar";
import FormVideo from "./Formulaires/FormulaireVideo";
import FormMemo from "./Formulaires/FormulaireMemo";
import FormAlbum from "./Formulaires/FormulaireAlbum";

const DashBoard = () => {
  return (
    <div
      tabIndex="0"
      className={classes.container}
      id="containerElement"
      // onKeyDown={handleKeyDown}
    >
      <Navbar />
      <div className="element" id="containerElement">
        <FormVideo id="section1" />
        <FormMemo id="section2" />
        <FormAlbum id="section3" />
      </div>
    </div>
  );
};

export default DashBoard;

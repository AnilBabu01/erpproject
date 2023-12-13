import React from "react";
import Styles from "./Infocard.module.css";
function Infocard({ item }) {
  return (
    <>
      <div className={Styles.maininfo}>
        <p>{item?.Notestext}</p>
      </div>
    </>
  );
}

export default Infocard;

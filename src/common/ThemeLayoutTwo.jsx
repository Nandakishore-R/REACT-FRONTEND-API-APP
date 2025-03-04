import React from "react";
import LeftPanel from "./LeftPanel";
import Footer from "./Footer";
import Header from "./Header";

function ThemeLayoutTwo({ children }) {
  return (
    <>

      <div className="main-main-panel ps-container ps-theme-default"
        style={{
          left: '9px',
          width: 'calc(100vw - 85* 100vw / 1920)',
          float: 'right',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'}}>
      {children}
    </div >
    </>
  );
}

export default ThemeLayoutTwo;

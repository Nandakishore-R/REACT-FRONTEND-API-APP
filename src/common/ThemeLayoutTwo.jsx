import React from "react";
import LeftPanel from "./LeftPanel";
import Footer from "./Footer";
import Header from "./Header";

function ThemeLayoutTwo({ children }) {
  return (
    <>
      <LeftPanel />
      <div className="main-main-panel ps-container ps-theme-default">
          {children}
      </div>
    </>
  );
}

export default ThemeLayoutTwo;

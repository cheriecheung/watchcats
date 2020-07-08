import React from "react";
import { useTranslation } from "react-i18next";
import Map from "./Map";
import Search from "./Search";
import ResultDisplay from "./ResultDisplay";

function FindSitter() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Search />
      <div style={{ display: "flex" }}>
        <ResultDisplay />
        {/* <Map /> */}
        <div style={{ width: "100%", background: "#E0FFFF" }}></div>
      </div>
    </div>
  );
}

export default FindSitter;

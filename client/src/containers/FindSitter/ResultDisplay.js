import React from "react";
import { useTranslation } from "react-i18next";

function Result() {
  const { t, i18n } = useTranslation();

  return <div style={{ height: "100vh", width: "100vw" }}>Search result</div>;
}

export default Result;

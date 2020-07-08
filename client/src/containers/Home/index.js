import React from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

function Home() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <h1>{t("home.i_am")}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingLeft: "10vw",
          paddingRight: " 10vw",
          fontSize: 40,
        }}
      >
        <Link
          to="/find"
          style={{
            flex: 1,
            background: "#a0dfcf",
            color: "#fff",
            marginRight: 50,
            padding: 40,
            textDecoration: "none",
          }}
        >
          <p>{t("home.owner_finds_sitter")}</p>
        </Link>
        <Link
          to="/find"
          style={{
            flex: 1,
            background: "#a0dfcf",
            color: "#fff",
            padding: 40,
            textDecoration: "none",
          }}
        >
          <p>{t("home.sitter_finds_owner")}</p>
        </Link>
      </div>
    </>
  );
}

export default Home;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { useEffect } from "react";

function Search() {
  const { t, i18n } = useTranslation();
  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (openStartDate) {
      setOpenEndDate(false);
    }
  }, [openStartDate]);

  useEffect(() => {
    if (openEndDate) {
      setOpenStartDate(false);
    }
  }, [openEndDate]);

  const pickerFooter = (type) => {
    return (
      <button
        style={{
          background: "transparent",
          border: "none",
          float: "left",
          position: "absolute",
        }}
        onClick={() => {
          if (type === "startDate") {
            setStartDate("");
            setOpenStartDate(false);
          } else {
            setEndDate("");
            setOpenEndDate(false);
          }
        }}
      >
        CLEAR
      </button>
    );
  };

  return (
    <div
      style={{
        height: 100,
        background: "#F8F8F8",
        borderTop: "1px solid #a0dfcf",
        borderBottom: "1px solid #a0dfcf",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: -10,
          width: 130,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button
            style={{
              background: "#a0dfcf",
              border: "none",
              padding: 10,
              position: "absolute",
              outline: "none",
              width: 100,
            }}
            onClick={() => setOpenStartDate(!openStartDate)}
          >
            {startDate !== "" ? startDate : "Start date"}
          </button>
          <DatePicker
            style={{ width: 0, zIndex: -1 }}
            open={openStartDate}
            renderExtraFooter={() => pickerFooter("startDate")}
            format="DD-MM-YY"
            onChange={(date, dateString) => {
              setStartDate(dateString);
              setOpenStartDate(false);
            }}
          />
        </div>

        <div>
          <button
            style={{
              background: "#a0dfcf",
              border: "none",
              padding: 10,
              position: "absolute",
              outline: "none",
              width: 100,
            }}
            onClick={() => setOpenEndDate(!openEndDate)}
          >
            {endDate !== "" ? endDate : "End date"}
          </button>
          <DatePicker
            style={{ width: 0, zIndex: -1 }}
            open={openEndDate}
            renderExtraFooter={() => pickerFooter("endDate")}
            format="DD-MM-YY"
            onChange={(date, dateString) => {
              setEndDate(dateString);
              setOpenEndDate(false);
            }}
          />
        </div>
      </div>

      <button
        style={{
          background: "#a0dfcf",
          border: "none",
          padding: 10,
          outline: "none",
        }}
      >
        About my cat(s)
      </button>

      <button
        style={{
          background: "#a0dfcf",
          border: "none",
          padding: 10,
          outline: "none",
        }}
      >
        Requirement
      </button>

      <input
        type="text"
        placeholder="Where would you like to search?"
        style={{ outline: "none", padding: 10, width: 200 }}
      />
    </div>
  );
}

export default Search;

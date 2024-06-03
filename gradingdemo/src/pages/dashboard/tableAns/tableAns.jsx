import { Card } from "@material-tailwind/react";
import React from "react";
import "./pagination.scss";
import { EachQuestion } from "./eachQuestion";

const TableComponent = ({ data }) => {
  return (
    <div
      style={{
        width: "80%",
      }}
    >
      <div className="exam-container">
        <div className="question-display">
          <EachQuestion head={data} />;
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

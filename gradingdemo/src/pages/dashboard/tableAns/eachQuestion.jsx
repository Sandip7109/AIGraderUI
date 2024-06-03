import React, { useState } from "react";

import { Card } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import "./tableAns.scss";
import Evalution from "./evalution";

export const EachQuestion = ({ head }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [specialText, setSpecialText] = useState(null);

  const handleMouseEnter = (id, text) => {
    setHoveredId(id);
    setSpecialText(text);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setSpecialText(null);
  };

  const { answer, obtained_marks, marks, question, rubrics } = head;

  const parts =
    specialText && answer.split(new RegExp(`(${specialText})`, "gi"));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "auto",
      }}
    >
      <Card className="card-1">
        <table className="table1">
          <thead className="thead1">
            <tr>
              <th colSpan={3} style={{padding:"10px"}}>
                <h4> Q. {question}</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="ans-code">
                <h5>
                  {specialText
                    ? parts.map((part, index) =>
                        part.toLowerCase() === specialText.toLowerCase() ? (
                          <span
                            key={index}
                            className=" card eval-card ans-highlight"
                          >
                            {part}
                          </span>
                        ) : (
                          <span key={index}>{part}</span>
                        )
                      )
                    : answer}
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table2">
          <tbody>
            <tr style={{ height: "70px" }}>
              <th colSpan={2} className="rubrics-th1">
                Rubrics
              </th>
            </tr>
          </tbody>
        </table>
        <div className="table2">
          <div className="rubrics-cell-tr">
            {rubrics.map((each) => {
              return (
                <div
                  className={`card eval-card ${
                    hoveredId === each.id ? "rubric-highlight" : ""
                  }`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    border: hoveredId === each.id ? "2px solid green" : "",
                  }}
                  key={each.id}
                  onMouseEnter={() =>
                    handleMouseEnter(each?.id, each?.highlightedText)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="rubrics-cell">{each.key}</div>

                  <div className="rubrics-cell-icon">
                    {each?.marks <= 0 ? (
                      <FontAwesomeIcon
                        icon={faExclamation}
                        size="2xl"
                        style={{ color: "red" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCheck}
                        size="2xl"
                        style={{ color: "#43a047" }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <br />
      </Card>
      <Card className="card-2">
        <Evalution
          obtainedMarks={obtained_marks}
          rubrics={rubrics}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
        />
      </Card>
    </div>
  );
};

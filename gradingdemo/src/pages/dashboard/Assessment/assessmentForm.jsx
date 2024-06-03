import React, { useState } from "react";

import { input, Button, Textarea, Typography } from "@material-tailwind/react";
import axios from "axios";
import "./assessment.scss";
import TableComponent from "../tableAns/tableAns";
import Spinner from "./spinner";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "@mui/material";

function generateUniqueId() {
  return uuidv4();
}
const AssessmentFormPage = () => {
  const [formData, setFormData] = useState({
    question: "",
    total_marks: "",
    answer: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState("");
  const [dynamicInputs, setDynamicInputs] = useState([
    { id: generateUniqueId(), rubrics_text: "", rubric_mark: 0 },
  ]);
  const [openModal, setOpenModal] = useState(false);
  let rubricsCheck;
  for (let i = 0; i < dynamicInputs.length; i++) {
    rubricsCheck =
      dynamicInputs[i].rubrics_text.trim() === "" ||
      dynamicInputs[i].rubric_mark === "";
  }
  let sum = dynamicInputs.reduce((total, item) => {
    const mark = parseFloat(item.rubric_mark);
    return !isNaN(mark) ? total + mark : total;
  }, 0);
  sum = parseInt(sum);

  const isFormIncomplete =
    formData.total_marks.trim() === "" ||
    formData.question.trim() === "" ||
    formData.answer.trim() === "";
  const marksCheck = parseInt(formData.total_marks) === sum;
  const totalCheck = rubricsCheck || isFormIncomplete || !marksCheck;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDynamicInputChange = (index, event) => {
    const max_mark = parseInt(formData.total_marks);
    const newInputs = [...dynamicInputs];
    newInputs[index][event.target.name] = event.target.value;
    if (max_mark < sum + 1) {
      newInputs[index][event.target.name] = "";
      setDynamicInputs(newInputs);
      setOpenModal(true);
    } else {
      setDynamicInputs(newInputs);
      setOpenModal(false);
    }
  };
  const addDynamicInput = () => {
    setDynamicInputs([
      ...dynamicInputs,
      { id: generateUniqueId(), rubrics_text: "", rubric_mark: 0 },
    ]);
  };

  const handleRemoveRow = (index) => {
    let newRows = dynamicInputs.filter((item) => item.id !== index);
    setDynamicInputs(newRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalCheck) {
      return;
    }
    setIsLoading(true);

    const formPayload = structuredClone(formData);
    let rubricsText = "";
    for (let i = 0; i < dynamicInputs.length; i++) {
      let a = dynamicInputs[i].rubrics_text;
      let b = dynamicInputs[i].rubric_mark;
      rubricsText = rubricsText + `${a}: ${b} marks; `;
    }

    let payload = {
      question: formPayload.question,
      total_marks: formPayload.total_marks,
      answer: formPayload.answer,
      rubrics: rubricsText && rubricsText,
    };
    try {
      const response = await axios.post(
        "http://3.110.31.189:5000/evaluate",
        payload
      );
      if (response.status === 200) {
        if (typeof response.data === "object") {
          setResultData(response?.data);
        } else {
          setError("Please check data");
        }
      }
    } catch (error) {
      console.error("There was an error with the API call", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="parent-div">
      <div>
        <form className="form-ass">
          <div className="text-center">
            <Typography
              variant="h2"
              style={{ color: "#1b1b5e" }}
              className="animated-text"
            >
              {" "}
              Assessment
            </Typography>
          </div>
          <div className="div-input-parent">
            <div className="div-input-1">
              <Typography
                variant="h5"
                style={{ color: "#1b1b5e" }}
                className="mb-3 font-medium"
              >
                Question
              </Typography>
              <Textarea
                size="lg"
                style={{ color: "#1b1b5e", fontSize: "18px" }}
                fullWidth
                name="question"
                value={formData.question}
                onChange={handleChange}
                onFocus={(e) => (e.target.style.border = "2px solid black")}
                onBlur={(e) => (e.target.style.border = "2px solid #ccc")}
                placeholder="Enter a text"
              />{" "}
            </div>{" "}
            <div className="div-input-2">
              <Typography
                variant="h5"
                style={{ color: "#1b1b5e" }}
                className="mb-3 font-medium"
              >
                Marks
              </Typography>
              <input
                size="lg"
                style={{
                  color: "#1b1b5e",
                  fontSize: "18px",
                  height: "100px",
                  width: "70px",
                }}
                fullWidth
                type="number"
                name="total_marks"
                value={formData.total_marks}
                onChange={handleChange}
                placeholder="0"
              />{" "}
            </div>
          </div>
          <div className="div-input">
            <Typography
              variant="h5"
              style={{ color: "#1b1b5e" }}
              className="mb-3 font-medium"
            >
              Answer
            </Typography>
            <Textarea
              style={{ color: "#1b1b5e", fontSize: "18px" }}
              className="input-field"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              size="regular"
              outline={true}
              placeholder="Give your answer"
            />
          </div>
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "10px",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                style={{ color: "#1b1b5e", width: "80%" }}
              >
                Rubrics
              </Typography>
              <Typography
                variant="h5"
                style={{ color: "#1b1b5e", marginRight: "55px" }}
              >
                marks
              </Typography>
            </div>
            {dynamicInputs.map((input, index) => (
              <div
                key={input.id}
                style={{
                  marginBottom: "10px",
                  marginLeft: "10px",
                  width: "100%",
                }}
                className="div-input-parent-rubric"
              >
                <div className="div-input-dyn-1">
                  <input
                    size="lg"
                    style={{ color: "#1b1b5e", fontSize: "18px", width: "" }}
                    fullWidth
                    type="text"
                    name="rubrics_text"
                    value={input.rubrics_text}
                    onChange={(e) => handleDynamicInputChange(index, e)}
                    placeholder="Enter the rubrics"
                  />{" "}
                </div>{" "}
                <div
                  style={{
                    width: "8%",
                  }}
                >
                  <input
                    size="lg"
                    style={{
                      color: "#1b1b5e",
                      fontSize: "18px",
                      width: "100%",
                    }}
                    type="number"
                    min={0}
                    name="rubric_mark"
                    value={input.rubric_mark}
                    onChange={(e) => handleDynamicInputChange(index, e)}
                    placeholder="0"
                  />{" "}
                </div>
                <div className="parent-button">
                  <button
                    onClick={addDynamicInput}
                    className="add-btn"
                    type="button"
                  >
                    <strong> + </strong>
                  </button>
                  {dynamicInputs.length > 1 && (
                    <button
                      onClick={() => handleRemoveRow(input.id)}
                      className="remove-rubric-btn"
                    >
                      <strong> x </strong>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button
            disabled={totalCheck}
            className={totalCheck ? "button-ass-disabled" : "button-ass"}
            onClick={handleSubmit}
          >
            Assessment
          </Button>
        </form>
      </div>
      <div
        style={{
          marginTop: "30px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <h2 style={{ color: "red" }}>{error}</h2>
        ) : (
          resultData && <TableComponent data={resultData} />
        )}
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="modal-box"
      >
        <div
          style={{
            backgroundColor: "white",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            borderRadius: "5px",
            zIndex: "999",
          }}
        >
          <div style={{ display: "flex", backgroundColor: "#110478" }}>
            <span
              style={{
                marginLeft: "auto",
                color: "white",
                cursor: "pointer",
                padding: "10px",
              }}
              onClick={() => setOpenModal(false)}
            >
              <strong>X</strong>
            </span>{" "}
          </div>
          <h4 style={{ padding: "20px", color: "black" }}>
            Please enter a valid Marks, It should be always lessthan or equal to
            the Maximum Marks
          </h4>
        </div>
      </Modal>
    </div>
  );
};

export default AssessmentFormPage;

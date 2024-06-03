import "./evalution.scss";
function Evalution({ rubrics, hoveredId, obtainedMarks }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3 className="eval-heading">Evaluation</h3>
      <div className="evalution">
        {rubrics.map((item, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "20px",
              border: item.marks <= 0 ? "2px solid red" : " 2px solid green",
              borderRadius: "15px",
            }}
            key={index}
            className={`card eval-card ${
              hoveredId === item.id ? "highlight" : ""
            }`}
          >
            <div className="eval-text">
              <h4>{item.evaluation} </h4>
            </div>
            <div
              className="mark"
              style={{
                textAlign: "center",
                border: item.marks <= 0 ? "2px solid red" : " 2px solid green",
                backgroundColor: item?.marks <= 0 ? "red" : "green",
              }}
            >
              <h4>{item.marks}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="total-marks">
        <h3>
          {" "}
          <b>Total Marks :</b> <b>{obtainedMarks} </b>
        </h3>
      </div>
    </div>
  );
}

export default Evalution;

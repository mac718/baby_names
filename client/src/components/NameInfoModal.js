import { useState, useEffect } from "react";

const NameInfoModal = ({ name }) => {
  const [nameRecord, setNameRecord] = useState("");
  const fetchName = () => {
    fetch(`http://localhost:3001/api/v1/names/${name}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setNameRecord(json.name))
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchName(), []);
  return (
    <div
      className="modal fade"
      id={name}
      tabIndex="-1"
      aria-labelledby={name}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={name}>
              {nameRecord.name}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="fs-1 fw-bold">{name}</div>
            <div>Meaning:</div>
            <div>
              gender: <span className="fw-bold">{nameRecord.gender}</span>
            </div>
            <div>Origin:</div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameInfoModal;

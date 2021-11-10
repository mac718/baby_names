import { useState } from "react";

const SendLinkCodeModal = ({ getLinkedUsers }) => {
  const [code, setCode] = useState();
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users/confirm-link", {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(() => getLinkedUsers())
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleModalClose = () => {
    setSuccessMessage(false);
    setError("");
  };
  return (
    <div
      className="modal fade"
      id="enterLinkCodeModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={"enterLinkCodeModalLabel"}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="enterLinkCodeModal"></h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleModalClose}
            ></button>
          </div>
          <div className="modal-body bg-light">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Enter link code from email</label>
              <div className="d-flex">
                <input
                  className="form-control"
                  type="text"
                  id="code"
                  onChange={handleCodeChange}
                />
                <button className="btn btn-success ms-2">
                  Enter link code!
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            {successMessage && (
              <div className="text-success text-center fw-bold w-100">
                Link code sent!
              </div>
            )}
            {error && (
              <div className="text-danger text-center fw-bold w-100">
                {error}
              </div>
            )}
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendLinkCodeModal;

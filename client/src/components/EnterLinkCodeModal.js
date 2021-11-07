import { useState } from "react";

const SendLinkCodeModal = () => {
  const [code, setCode] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users/confirm-link", {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  return (
    <div
      className="modal fade"
      id="enterLinkCodeModal"
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

export default SendLinkCodeModal;

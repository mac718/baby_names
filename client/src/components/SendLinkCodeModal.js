import { useState, useEffect } from "react";

const SendLinkCodeModal = () => {
  const [email, setEmail] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users/link", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div
      className="modal fade"
      id="sendLinkCodeModal"
      tabIndex="-1"
      aria-labelledby={"sendLinkCodeModalLabel"}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="sendLinkCodeModal"></h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Enter recipient email</label>
              <input
                className="form-control"
                type="email"
                id="email"
                onChange={handleEmailChange}
              />
              <button className="btn btn-success">Send link code!</button>
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

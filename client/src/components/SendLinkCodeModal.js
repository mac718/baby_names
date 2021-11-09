import { useState, useEffect } from "react";

const SendLinkCodeModal = () => {
  const [email, setEmail] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/users/request-link", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status !== 200) {
          alert(res.error);
        } else {
          return res.json();
        }
      })
      .then((json) => {
        fetch("http://localhost:3001/api/v1/emails", {
          method: "POST",
          body: JSON.stringify({ email, code: json.code, sender: json.sender }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
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
          <div className="modal-body bg-secondary">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Enter recipient email</label>
              <div className="d-flex">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  onChange={handleEmailChange}
                />
                <button className="btn btn-success ms-2">
                  Send link code!
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

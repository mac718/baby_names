import { useState, useEffect } from "react";

const SendLinkCodeModal = () => {
  const [email, setEmail] = useState();
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      "https://rocky-temple-34078.herokuapp.com/api/v1/users/request-link",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.msg) {
          setError(json.msg);
        } else {
          fetch("api/v1/emails", {
            method: "POST",
            body: JSON.stringify({
              email,
              code: json.linkCode,
              sender: json.sender,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
            .then((res) => {
              if (res.status === 200) {
                setSuccessMessage(true);
              } else {
                return res.json();
              }
            })
            .then((json) => {
              if (json.msg) {
                setError(json.msg);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleModalClose = () => {
    setSuccessMessage(false);
    setError("");
  };
  return (
    <div
      className="modal fade"
      id="sendLinkCodeModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
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
              onClick={handleModalClose}
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

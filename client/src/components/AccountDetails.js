import { useState, useEffect } from "react";
import EditEmail from "./EditEmail";
import EditFirstName from "./EditFirstName";
import EditLastName from "./EditLastName";
import EditPassword from "./EditPassword";

const AccountDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");

  const getCurrentUser = () => {
    fetch("http://localhost:3001/api/v1/users/getUser", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setFirstName(json.firstName);
        setLastName(json.lastName);
        setEmail(json.email);
        setPassword(json.password);
        setPic(json.pic);
        console.log(json.pic);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="container">
      <div className="fs-1 text-center mt-5 mb-5">Account Details</div>
      <ul className="list-group-flush w-50 m-auto">
        <li className="list-group-item">
          <EditFirstName
            currentFirstName={firstName}
            getCurrentUser={getCurrentUser}
          />
        </li>
        <li className="list-group-item">
          <EditLastName
            currentLastName={lastName}
            getCurrentUser={getCurrentUser}
          />
        </li>
        <li className="list-group-item">
          <EditEmail currentEmail={email} getCurrentUser={getCurrentUser} />
        </li>
        <li className="list-group-item ">
          <div className="fw-bold">Profile Photo</div>
          <div className="d-flex justify-content-between">
            <form
              className="form-control w-75 h-50"
              enctype="multipart/form-data"
              onSubmit={(e) => {
                e.preventDefault();
                const files = e.target.firstChild.files;
                let formData = new FormData();
                formData.append("photo", files[0]);
                fetch("http://localhost:3001/api/v1/users/upload", {
                  method: "POST",
                  credentials: "include",
                  body: formData,
                })
                  .then((res) => res.json())
                  .then((json) => console.log(json))
                  .catch((err) => console.log(err));
              }}
            >
              <input className="form-control" type="file" name="photo" />
              <div className="text-center">
                <button className="btn btn-info mt-2 w-25" type="submit">
                  upload
                </button>
              </div>
            </form>

            <img
              src={pic}
              style={{ width: "5rem", height: "5rem" }}
              className="rounded"
            />
          </div>
        </li>
        <li className="list-group-item">
          <EditPassword getCurrentUser={getCurrentUser} />
        </li>
      </ul>
    </div>
  );
};

export default AccountDetails;

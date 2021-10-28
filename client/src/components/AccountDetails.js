import { useState, useEffect } from "react";

const AccountDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
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
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <div className="fs-1 text-center">Account Details</div>
      <div className="container w-50">
        <div>{firstName}</div>
        <div>{lastName}</div>
        <div>{email}</div>
        <div>{password}</div>
      </div>
    </div>
  );
};

export default AccountDetails;

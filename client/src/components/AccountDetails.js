import { useState, useEffect } from "react";

const AccountDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("http://localhost/api/v1/users/getUser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setFirstName(json.firstName);
        setLastName(json.lastName);
        setEmail(json.email);
        setPassword(json.password);
      });
  }, []);
  return (
    <div className="container">
      <div className="fs-1 text-center">Account Details</div>
      <div className="container w-50">
        <div>First Name</div>
        <div>Last Name</div>
        <div>Email</div>
        <div>Password</div>
      </div>
    </div>
  );
};

export default AccountDetails;

import { useState } from "react";

const LinkEmailForm = () => {
  const [email, setEmail] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/emails", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };
  return (
    <form>
      <input
        type="email"
        onChange={(e) => {
          let value = e.target.value;
          setEmail(value);
          console.log(email);
        }}
      />
      <buton onClick={handleSubmit}>submit</buton>
    </form>
  );
};

export default LinkEmailForm;

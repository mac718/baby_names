import { Redirect } from "react-router";
import { useState, useEffect } from "react";

export function withAuth(ComponentToProtect) {
  return function () {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    useEffect(() => {
      fetch("http://localhost:3001/api/v1/users/checkToken", {
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
          } else {
            return res.json();
          }
        })
        .then((json) => {
          if (json) {
            setErrMessage(json.msg);
            setLoading(false);
            setRedirect(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setErrMessage("Please log in.");
          setLoading(false);
          setRedirect(true);
        });
    }, []);
    if (loading) {
      return null;
    }
    if (redirect) {
      return (
        <Redirect to={{ pathname: "/login", state: { error: errMessage } }} />
      );
    }
    return <ComponentToProtect />;
  };
}

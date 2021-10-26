import { Redirect } from "react-router";
import { useState, useEffect } from "react";

export function withAuth(ComponentToProtect) {
  return function () {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      fetch("/checkToken")
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          setRedirect(true);
        });
    });
    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/sign-up" />;
    }
    return <ComponentToProtect />;
  };
}

import React, { useEffect, useState } from "react";

const Ratings = () => {
  const [ratings, setRatings] = useState();
  useEffect(() => {
    fetch("http://localhost:3001/getRatings", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setRatings(json);
        console.log(json);
      })
      .catch((err) => alert(err));
  }, []);

  let ones = ratings.filter((rating) => rating[1] === 5);
  let sevens = ratings.filter((rating) => rating[1] === 5);
  let sevens = ratings.filter((rating) => rating[1] === 5);
  let sevens = ratings.filter((rating) => rating[1] === 5);
  let sevens = ratings.filter((rating) => rating[1] === 5);
  let sevens = ratings.filter((rating) => rating[1] === 5);
  let sevens = ratings.filter((rating) => rating[1] === 5);
  let sevens = ratings.filter((rating) => rating[1] === 5);
  let sevens = ratings.filter((rating) => rating[1] === 5);
  let sevens = ratings.filter((rating) => rating[1] === 5);
  let sevens = ratings.filter((rating) => rating[1] === 5);
  return (
    <div className="container">
      <div className="container border-solid-black"></div>
    </div>
  );
};

export default Ratings;

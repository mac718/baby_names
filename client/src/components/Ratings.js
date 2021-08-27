import React, { useEffect, useState } from "react";

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/getRatings", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.setState({ ratings: json.groupDivs });
        console.log(json.groupDivs);
      })
      .catch((err) => alert(err));
  }

  render() {
    let groupDivs = this.state.ratings.map((group) => {
      let names = group.map((name) => <li>{name}</li>);
      return <ul>{names}</ul>;
    });
    return (
      <div className="container">
        <div className="container border border-dark h-10">{groupDivs}</div>
      </div>
    );
  }
}

export default Ratings;

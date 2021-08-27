import React from "react";

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
    let groupDivs = this.state.ratings.map((group, idx) => {
      let names = group.map((name) => <li>{name}</li>);
      return (
        <div className="container border border-dark rounded-pill mt-2 h-10">
          <p className="fs-2 text-center fw-light">{idx + 1}</p>
          <ul>{names}</ul>
        </div>
      );
    });
    console.log(groupDivs);
    return (
      <div className="container">
        <div className="container mt-2">{groupDivs}</div>
      </div>
    );
  }
}

export default Ratings;

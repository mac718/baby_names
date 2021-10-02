import React from "react";
import RadioButtons from "./RadioButtons";

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
      hidden: true,
      currentButtonsDivId: null,
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
        console.log(json.groupDivs);
        this.setState({ ratings: json.groupDivs });
        console.log(json.groupDivs);
      })
      .catch((err) => alert(err));
  }

  render() {
    let groupDivs = this.state.ratings.map((group, idx) => {
      let names = group.map((name) => (
        <li
          className="list-group-item d-flex justify-content-between"
          key={name}
        >
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <div className="col">{name}</div>
              <div className="col">
                <button
                  className="btn btn-primary btn-sm float-end"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      ...this.state,
                      hidden: !this.state.hidden,
                      currentButtonsDivId: this.state.currentButtonsDivId
                        ? null
                        : name,
                    });
                  }}
                >
                  Edit Rating
                </button>
                <div
                  hidden={
                    this.state.currentButtonsDivId === name ? false : true
                  }
                  id={name}
                >
                  <RadioButtons name={name} />
                </div>
              </div>
            </div>
          </div>
        </li>
      ));
      return (
        <div
          className="container border border-dark rounded mt-3 h-10"
          key={idx / 10}
        >
          <div className="fs-2 text-center fw-light">
            <div
              className="border border-dark rounded-circle m-auto mt-2"
              style={{ width: "70px", backgroundColor: "lightBlue" }}
            >
              {idx + 1}
            </div>
          </div>
          <ul className="text-center fs-4 list-group list-group-flush">
            {names}
          </ul>
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

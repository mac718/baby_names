import { useState } from "react";

const Filters = ({ fetchFn }) => {
  console.log(fetchFn);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedOrigin, setSelectedOrigin] = useState("All");

  const handleGenderChange = (e) => {
    let value = e.target.innerHTML;
    console.log(value);
    setSelectedGender(value);
    fetchFn(value, selectedOrigin);
  };
  const handleOriginChange = (e) => {
    let value = e.target.innerHTML;
    setSelectedOrigin(value);
    fetchFn(selectedGender, value);
  };

  return (
    <form className="d-flex flex-row m-3 justify-content-center">
      <div className="dropdown m-2">
        <a
          className="btn btn-outline-secondary dropdown-toggle"
          href="#"
          role="button"
          id="gender"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter Gender
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a
              className="dropdown-item active"
              href="#"
              onClick={handleGenderChange}
            >
              All
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleGenderChange}>
              Male
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleGenderChange}>
              Female
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleGenderChange}>
              Neutral
            </a>
          </li>
        </ul>
        <div className="text-center">{selectedGender}</div>
      </div>
      <div className="dropdown m-2">
        <a
          className="btn btn-outline-secondary dropdown-toggle"
          href="#"
          role="button"
          id="gender"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          value={selectedGender}
        >
          Filter Origin
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a
              className="dropdown-item active"
              href="#"
              onClick={handleOriginChange}
            >
              All
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleOriginChange}>
              USA
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleOriginChange}>
              Europe
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleOriginChange}>
              Africa
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#" onClick={handleOriginChange}>
              Asia
            </a>
          </li>
        </ul>
        <div className="text-center">{selectedOrigin}</div>
      </div>
      <div></div>
    </form>
  );
};

export default Filters;

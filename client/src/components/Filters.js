import { useState } from "react";

const Filters = () => {
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedOrigin, setSelectedOrigin] = useState("all");

  const handleGenderChange = (e) => {
    let value = e.target.innerHTML;
    console.log(value);
    setSelectedGender(value);
  };
  const handleOriginChange = (e) => {
    let value = e.target.innerHTML;
    console.log(value);
    setSelectedOrigin(value);
  };
  return (
    <form className="d-flex flex-row mt-3">
      <div className="dropdown m-2">
        <a
          className="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          id="gender"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          value={selectedGender}
        >
          Filter Gender
        </a>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
            <a
              className="dropdown-item active"
              value="all"
              href="#"
              onClick={handleGenderChange}
            >
              All
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              value="Male"
              href="#"
              onClick={handleGenderChange}
            >
              Male
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              value="Female"
              href="#"
              onClick={handleGenderChange}
            >
              Female
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              value="Neutral"
              href="#"
              onClick={handleGenderChange}
            >
              Neutral
            </a>
          </li>
        </ul>
        <div>{selectedGender}</div>
      </div>
      <div className="dropdown m-2">
        <a
          className="btn btn-secondary dropdown-toggle"
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
              value="all"
              href="#"
              onClick={handleOriginChange}
            >
              All
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              value="Male"
              href="#"
              onClick={handleOriginChange}
            >
              Male
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              value="Female"
              href="#"
              onClick={handleOriginChange}
            >
              Europe
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              value="Neutral"
              href="#"
              onClick={handleOriginChange}
            >
              Africa
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              value="Neutral"
              href="#"
              onClick={handleOriginChange}
            >
              Asia
            </a>
          </li>
        </ul>
        <div>{selectedOrigin}</div>
      </div>
    </form>
  );
};

export default Filters;

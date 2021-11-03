import { useState } from "react";

const Filters = () => {
  const [selectedGender, setSelectedGender] = useState("all");
  const handleChange = (e) => {
    let value = e.target.value;
    setSelectedGender(value);
  };
  return (
    <div className="dropdown">
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

      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        onChange={handleChange}
      >
        <li>
          <a className="dropdown-item active" href="#">
            All
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Male
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Female
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Neutral
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Filters;

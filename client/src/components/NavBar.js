const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Baby Names
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                Rank Names
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/ratings">
                Your Ratings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

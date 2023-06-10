import './Navbar.css';

import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{position: "fixed", width: "100%"}}>
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          PDF Management System
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/upload">
                Upload PDF
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/">
                View My PDFs
              </a>
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div class="btn-group">
            <button type="button" data-bs-toggle="dropdown">
                <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
            </button>
            <ul class="dropdown-menu dropdown-menu-lg-end">
                <li><button class="dropdown-item" type="button">Profile</button></li>
                <li><button class="dropdown-item" type="button">Account Settings</button></li>
                <li><button class="dropdown-item" type="button">Log Out</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

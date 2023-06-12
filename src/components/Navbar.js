import './Navbar.css';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useState } from 'react';

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const [profileName, setProfileName] = useState("");
  
  const auth = getAuth();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user)=>{
    if(user && user.displayName){
      setProfileName(user.displayName);
    }
    if(user){
      setUser(user);
    }
    else{
        console.log("User is not signed in");
    }
  });

  const goToLogin = () =>{
    navigate('/login');
  }

  const goToSignUp = () =>{
    navigate('/signup');
  }

  const handleLogOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(null);
      navigate('/login');
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{position: "fixed", width: "100%", zIndex: "1"}}>
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
              {user &&
                <a class="nav-link active" href="/upload">
                  Upload PDF
                </a>
              }
              {!user &&
                <a class="nav-link disabled" href="/upload">
                  Upload PDF
                </a>
              }
            </li>
            <li class="nav-item">
              {user &&
                <a class="nav-link active" href="/">
                  View My PDFs
                </a>
              }
              {!user &&
                <a class="nav-link disabled" href="/">
                  View My PDFs
                </a>
              }
            </li>
          </ul>
          {user &&
            <div class="btn-group">
              <button type="button" data-bs-toggle="dropdown">
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{profileName.substring(0, 1)}</Avatar>
              </button>
              <ul class="dropdown-menu dropdown-menu-lg-end">
                  <li><button class="dropdown-item" type="button">Profile</button></li>
                  <li><button class="dropdown-item" type="button">Account Settings</button></li>
                  <li><button class="dropdown-item" type="button" onClick={handleLogOut}>Log Out</button></li>
              </ul>
            </div>
          }
          {!user &&
            <div class="btn-group">
              <button type="button" data-bs-toggle="dropdown">
                <Avatar src="/broken-image.jpg" />
              </button>
              <ul class="dropdown-menu dropdown-menu-lg-end">
                  <li><button class="dropdown-item" type="button" onClick={goToLogin}>Login</button></li>
                  <li><button class="dropdown-item" type="button" onClick={goToSignUp}>Sign Up</button></li>
              </ul>
            </div>
          }
          
        </div>
      </div>
    </nav>
  );
};

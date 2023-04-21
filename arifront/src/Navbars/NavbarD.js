import "../assets/css/Nav.css";
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../services/UserContext";
import { Stomp } from "@stomp/stompjs";
import { faHome, faEllipsisV, faBars,faList,faUser,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SockJS from "sockjs-client";

import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const NavbarD = ({user}) => {

  const { currentUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };


  const handleLogout = () => {
    // mostrar alerta de confirmación
    toast.info(
      <div>
        ¿Estás seguro de que quieres cerrar sesión?
        <div className="text-right mt-2">
          <button
            className="btn btn-danger mr-2"
            onClick={() => {
              AuthService.logout();
              window.location.reload();
            }}
          >
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              toast.dismiss();
            }}
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };
  return (
    <nav>
      <button style={{backgroundColor:'#338530'}} className="menu-button-" onClick={handleMenuToggle}>
        <FontAwesomeIcon icon={faList} />
      </button>
      <ul className={`menu ${isMenuOpen ? "menu-open" : ""}`}>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/do', { replace: true, state: { user: user } });
            }}
            style={{color: "#ffffff",}}>
            <FontAwesomeIcon icon={faHome} style={{color: "#ffffff",}} />
          Home
          </a>
        </li>
        <br></br>
        <li>
          <a  
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/InfoDoc', { replace: true, state: { user: user } });
            }}    style={{color: "#ffffff",}}
          >
            <FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} />
            InfoP
          </a>
        </li>
        <br></br>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} style={{color: "#ffffff",}} />
          </a>
        </li>
        <br></br>
        <li>ARID</li>
      </ul>
    </nav>
  );
};

export default NavbarD;

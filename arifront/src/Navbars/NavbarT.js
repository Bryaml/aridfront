
import '../assets/css/Nav.css';
import AuthService from "../services/AuthService";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList, faBars, faTimes,faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../services/UserContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const NavbarT = (props) => {
  const user = props.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
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
       <button style={{backgroundColor:'#338530'}} className="menu-button-black" onClick={handleMenuToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
      <li>
          <a style={{color: "#ffffff",}}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/tec', { replace: true, state: { user: user } });
            }}
          >
            <FontAwesomeIcon icon={faHome}style={{color: "#ffffff",}} />
            
            Home
          </a>
        </li>
<br></br>
        <li>
          <a style={{color: "#ffffff",}}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/InfoDtec', { replace: true, state: { user: user } });
            }}
          >
             <FontAwesomeIcon icon={faUser}style={{color: "#ffffff",}}/>
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

      </ul>
    </nav>
  );
};

export default NavbarT;

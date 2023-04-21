import { useState } from "react";
import '../assets/css/Nav.css';
import AuthService from "../services/AuthService";
import { useLocation, useNavigate } from 'react-router-dom';
import { faHome, faBars,faUsers, faChartBar, faTimes,faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from 'react-toastify';
const NavbarA = ({user, handleShowUserModal, handleShowAulaLabModal }) => {
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
             <button style={{backgroundColor:'#338530'}} className="menu-button-black" onClick={handleMenuToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    <ul className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
      <li>
        <a style={{color: "#ffffff",}}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/ad', { replace: true, state: { user: user } });
          }}
        >
          <FontAwesomeIcon style={{color: "#ffffff",}}icon={faHome} />
        Home
        </a>
      </li>
      <br></br>
      <li>
        <a style={{color: "#ffffff",}}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/tables', { replace: true, state: { user: user } });
          }}
        >
          <FontAwesomeIcon style={{color: "#ffffff",}} icon={faUsers} />
        Users
        </a>
      </li>
      <br></br>
      <li>
        <a style={{color: "#ffffff",}}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/informes', { replace: true, state: { user: user } });
          }}
        >
          <FontAwesomeIcon style={{color: "#ffffff",}} icon={faChartBar} />
         Informes
        </a>
      </li>
      <br></br>
      <li>
        <a style={{color: "#ffffff",}}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/InfoD', { replace: true, state: { user: user } });
          }}
        >
          <FontAwesomeIcon style={{color: "#ffffff",}} icon={faUser} />
       InfoP
        </a>
      </li>
      <br></br>
      <li style={{ float: 'left' }}>
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
      {/* ... */}
    </ul>
  </nav>
  );
};

export default NavbarA;

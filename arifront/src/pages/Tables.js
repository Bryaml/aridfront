import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import NavbarA from '../Navbars/NavbarA';
import {  faTrash , faEdit,faChalkboardTeacher, faHardHat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditUserModal = ({ user, showModal, onClose, onSubmit }) => {
  const [username, setUsername] = useState(user.username);
  const [apellidos, setApellidos] = useState(user.apellidos);
  const [email, setEmail] = useState(user.email);
  const [roles, setRoles] = useState(user.roles);
  const [telefono, setTelefono] = useState(user.telefono);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      id: user.id,
      username,
      apellidos,
      email,
      roles,
      telefono,
    };
    onSubmit(updatedUser);
    onClose();
  };

  return (
    <div className={`modal ${showModal ? "d-block" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modificar Usuario</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellidos"
                  value={apellidos}
                  onChange={(event) => setApellidos(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="roles">Roles</label>
                <input
                  type="text"
                  className="form-control"
                  id="roles"
                  value={roles}
                  onChange={(event) => setRoles(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefono"
                  value={telefono}
                  onChange={(event) => setTelefono(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Guardar Cambios
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ user, onDelete, onUpdate }) => {
  const handleDelete = () => {
    onDelete(user.id);
  };

  const handleUpdate = () => {
    onUpdate(user);
  };
  return (
    <tr key={user.id}>
      <td>{user.username}</td>
      <td>{user.apellidos}</td>
      <td>{user.email}</td>
      <td>{user.roles}</td>
      <td>{user.telefono}</td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash } />
        </button>
      </td>
      <td>
        <button className="btn btn-warning" onClick={handleUpdate}>
        <FontAwesomeIcon icon={faEdit} />
        </button>
      </td>
    </tr>
  );
};
const FilterableTable = ({ users, onDelete, onUpdate }) => {
  const [filterText, setFilterText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const lowerCaseFilterText = filterText.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerCaseFilterText) ||
        user.apellidos.toLowerCase().includes(lowerCaseFilterText)
    );
    setFilteredUsers(filtered);
  }, [filterText, users]);

  return (
    <>
      <div className="form-group">
       
        <input
          type="text"
          className="form-control"
          id="filter"
          value={filterText}
          onChange={(event) => setFilterText(event.target.value)}
          placeholder="Buscar por nombre de usuario o apellido"
        />
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Username</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Teléfono</th>
            <th>Eliminar</th>
            <th>Modificar</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const Tables = () => {
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("docentes");
  const location = useLocation();
  const user = location.state.user;
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8080/api/${userType}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }

    fetchData();
  }, [userType]);

  const handleButtonClick = (type) => {
    setUserType(type);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/${userType}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  
  return (
    <>
      <NavbarA user={user} />
      <br></br>
      <div className="container">
        <div className="d-flex justify-content-between mt-3 mb-3">
          <button
            style={{ paddingLeft: "10px", width: "40%" }}
            onClick={() => handleButtonClick("docentes")}
            className="btn btn-primary"
          >
           <FontAwesomeIcon icon={faChalkboardTeacher } />
          </button>
          <button
            style={{ paddingLeft: "10px", width: "40%" }}
            onClick={() => handleButtonClick("tecnicos")}
            className="btn btn-primary"
          >
        <FontAwesomeIcon icon={faHardHat } />
          </button>
        </div>
        <FilterableTable users={users} onDelete={handleDelete} onUpdate={handleUpdate} />
        {
          showModal && (
            <EditUserModal
              user={selectedUser}
              showModal={showModal}
              onClose={() => setShowModal(false)}
              onSubmit={(updatedUser) => {
                // Actualizar el usuario en la lista de usuarios
                const updatedUsers = users.map((user) =>
                  user.id === updatedUser.id ? updatedUser : user
                );
                setUsers(updatedUsers);
                setShowModal(false);
              }}
            />
          )
        }
      </div>
    </>
  );
};
export default Tables;

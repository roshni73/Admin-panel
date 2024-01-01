import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

interface NavbarProps {
  title: string;
}

const Navbar = ({ title }: NavbarProps) => {
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const [showPagesDropdown, setShowPagesDropdown] = useState(false);

  const toggleAdminDropdown = () => {
    setShowAdminDropdown(!showAdminDropdown);
  };

  const toggleUsersDropdown = () => {
    setShowUsersDropdown(!showUsersDropdown);
  };

  const togglePagesDropdown = () => {
    setShowPagesDropdown(!showPagesDropdown);
  };

  return (
    <div className="navbar">
      <h2>{title}</h2>
      <div className="navbar-links">
        <NavLink to="/Dashboard">Dashboard</NavLink>

        <div className="dropdown-wrapper">
          <NavLink to="/Admin" onClick={toggleAdminDropdown}>Admin
          </NavLink>
          {showAdminDropdown && (
            <div className="dropdown-content">
            </div>
          )}
        </div>
        <div className="dropdown-wrapper">
          <NavLink to="/Users" onClick={toggleUsersDropdown}>
            Users
          </NavLink>
          {showUsersDropdown && (
            <div className="dropdown-content">
              <NavLink to="/AddUsers">Add Users</NavLink>
              <NavLink to="/Users">User List</NavLink>
            </div>
          )}
        </div>
        <div className="dropdown-wrapper">
          <NavLink to="/Pages" onClick={togglePagesDropdown}>
            Pages
          </NavLink>
          {showPagesDropdown && (
            <div className="dropdown-content">
              <NavLink to="/Pages/About">About</NavLink>
              <NavLink to="/Pages/Contact">Contact</NavLink>
            </div>
          )}
        </div>
        <NavLink to="/Carts">Carts</NavLink>
        <NavLink to="/Posts">Posts</NavLink>
        <NavLink to="/Todos">Todos</NavLink>
      </div>
    </div>
  );
};

export default Navbar;

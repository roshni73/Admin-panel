import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

interface NavbarProps {
  title: string;
}

const Navbar = ({ title }: NavbarProps) => {
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);

  const toggleAdminDropdown = () => {
    setShowAdminDropdown(!showAdminDropdown);
  };

  const toggleUsersDropdown = () => {
    setShowUsersDropdown(!showUsersDropdown);
  };

  return (
    <div className="navbar">
      <h2>{title}</h2><br></br>
      <div className="navbar-links">
        <NavLink to="/Users"> Dashboard</NavLink>

        <div className="dropdown-wrapper">
          <NavLink to="/Admin" onClick={toggleAdminDropdown}>Admin
          </NavLink>
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
        <NavLink to="/Carts">Carts</NavLink>
        <NavLink to="/Posts">Posts</NavLink>
        <NavLink to="/Todos">Todos</NavLink>
      </div>
    </div>
  );
};

export default Navbar;

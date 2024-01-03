import { MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';
import Button from '#components/Button';
import { useCallback, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import Container from "#components/Container";
import { UserInterface } from "#interfaces/UserInterface";
import {
  getAllLocalUsers,
  deleteLocalUser,
  getLocalUserById
} from "#utils/LocalUser";

import "./index.css";

function Users() {

  const navigate = useNavigate();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      const url = "https://dummyjson.com/users";
      const params = {
        limit: 20,
        select: "firstName,lastName,maidenName,age,gender,email,phone",
      };

      try {
        const res = await axios.get(url, { params });
        const localUsers = getAllLocalUsers();

        const filteredUsers = res.data.users.filter(
          (resUser: UserInterface) => !localUsers.some(localUser => localUser.id === resUser.id)
        );
        setUsers([...filteredUsers, ...localUsers].sort((a, b) =>  b.id- a.id));

      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const viewUser = useCallback((id: number) => {
    navigate(`/user/${id}`);
  }, [navigate]);

  const deleteUser = useCallback(async (id: number) => {
    try {
      if (id > 100 || getLocalUserById(id)) {
        deleteLocalUser(id)
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      } else {
        const response = await axios.delete(`https://dummyjson.com/users/${id}`);
        if (response.status === 200) {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        }
      }
    } catch (error: any) {
      console.error('Error deleting user:', error);
    }
  }, []);

  const editUser = useCallback((id: number) => {
    navigate(`/AddUsers/${id}`);
  }, [navigate]);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentItems = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container>
      <Link to="/AddUsers"></Link>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : errorMessage ? (
        <div className="error">{errorMessage}</div>
      ) : (
        <>
          <select className='select-pagination' value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Maiden Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.length > 0 ? (
                  currentItems.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.maidenName}</td>
                      <td>{user.age}</td>
                      <td>{user.gender}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Button  onClick={() => viewUser(user.id)} icon={<MdRemoveRedEye />} />
                        <Button onClick={() => deleteUser(user.id)} icon={<MdDelete />} />
                        <Button  onClick={() => editUser(user.id)} icon={<MdEdit />} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>No records found</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </>
      )}
      <div>
        
        <Button label="Previous" onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))} />
        <Button label="Next" onClick={() => setCurrentPage((old) => Math.min(old + 1, totalPages))} />
      </div>
        
    </Container>
  );
}
export default Users;

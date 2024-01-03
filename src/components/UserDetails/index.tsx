import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "#components/Button";

import Container from "#components/Container";
import { getLocalUserById } from "#utils/LocalUser";
import { UserInterface } from "#interfaces/UserInterface";

import "./index.css";

function UserDetails() {

  const navigate = useNavigate();

  const [user, setUser] = useState<UserInterface | null>(null);
  const [found, setFound] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();
  const idNumeric = Number(id);

  const fetchUser = useCallback(async () => {
    if (idNumeric > 100 || getLocalUserById(idNumeric)) {
      const user: UserInterface | null = getLocalUserById(idNumeric);
      if (user === null) {
        setFound(false);
      }
      setUser(user);
    } else {
      fetch(`https://dummyjson.com/users/${id}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.error('Error:', error));
    }
  }, [idNumeric, id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!user) {
    return <Container>
      <div className="single-usr-dtls">
        <div className="title">
          <h2>{found ? "Loading ..." : "User not found"}</h2>
        </div>
      </div>
    </Container>
  }

  return (
    <Container>
      <Link to="/users"></Link>
      <div className="single-usr-dtls">
        <div className="nav-users">
          <Button label="Posts" navigate={navigate} user={user} />
          <Button label="Todos" navigate={navigate} user={user} />
          <Button label="Carts" navigate={navigate} user={user} />
          <Button label="X" onClick={() => window.history.back()} />
         
        </div>
        <div className="title">
          <h2>User Details:</h2><br />
        </div>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Maiden Name: {user.maidenName}</p>
        <p>Age: {user.age}</p>
        <p>Gender: {user.gender}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
    </Container>
  );
}
export default UserDetails;

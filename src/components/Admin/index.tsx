import Container from '#components/Container';
import { AdminInterface } from '#interfaces/UserInterface';
import './index.css';



const admins: AdminInterface[] = [
  { firstName: 'Roshani', lastName: 'Poudel', email: 'roshani@gmail.com', phone: '123-456-7890' },
  { firstName: 'Usukta', lastName: 'Parajuli', email: 'usukta@gmail.com', phone: '123-456-7890' },
  { firstName: 'Ujwal', lastName: 'Dhakal', email: 'ujwal@gmail.com', phone: '123-456-7890' },
  { firstName: 'Feerica', lastName: 'Tuladhar', email: 'feerica@gmail.com', phone: '123-456-7890' },
];

function Admin() {
  return (
    <Container>
      <div className="admin-list">
        <h2> Admin-List</h2><br></br>

        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.email}>
                <td>{admin.firstName}</td>
                <td>{admin.lastName}</td>
                <td>{admin.email}</td>
                <td>{admin.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Admin;
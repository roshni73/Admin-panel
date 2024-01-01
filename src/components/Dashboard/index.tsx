
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Container from '#components/Container';
import './index.css';

const users = [
  { firstName: 'John', lastName: 'Doe', phoneNumber: '123-456-7890' },
  { firstName: 'Jane', lastName: 'Doe', phoneNumber: '234-567-8901' },
  { firstName: 'Jim', lastName: 'Smith', phoneNumber: '345-678-9012' },
  
];

const data = [
  {name: 'User1', uniqueVisitors: 400, pageViews: 240, timeSpent: 20},
  {name: 'User2', uniqueVisitors: 30, pageViews: 138, timeSpent: 221},

];
const posts = [
    { title: 'Post 1', content: 'This is the content for Post 1.' },
    { title: 'Post 2', content: 'This is the content for Post 2.' },
    { title: 'Post 3', content: 'This is the content for Post 3.' },
    
  ]

function Dashboard() {
  return (
    <Container>
      <div className="content">
        <div className="user-list">
          <h2>User List</h2>
          <button onClick={() => console.log('Add new user')}>Add New User</button>
          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="chart">
          <h2>User Data</h2>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uniqueVisitors" fill="#8884d8" />
            <Bar dataKey="pageViews" fill="#82ca9d" />
            <Bar dataKey="timeSpent" fill="#ffc658" />
          </BarChart>
        </div>
        <div className="posts">
          <h2>Posts</h2>
          {posts.map((post, index) => (
            <div key={index}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
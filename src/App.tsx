import AddUsers from '#components/AddUsers';
import SingleUser from '#components/UserDetails';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from 'react-router-dom';

import Admin from '#components/Admin';
import Users from '#components/UserList';
import Carts from '#components/Carts';
import Posts from '#components/Posts';
import Todos from '#components/Todos';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Users />} />
      <Route path="Dashboard" element={<Users />} />
      <Route path="Admin" element={<Admin />} />
      <Route path="Users" element={<Users />} />
      <Route path="/user/:id" element={<SingleUser />} />
      <Route path="AddUsers/:id?" element={<AddUsers />} />
      <Route path="Users/AddUsers" element={<AddUsers />} />
      <Route path="Carts/:id?" element={<Carts />} />
      <Route path="Posts/:id?" element={<Posts />} />
      <Route path="Todos/:id?" element={<Todos />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App;

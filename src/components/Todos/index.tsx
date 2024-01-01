import Container from '#components/Container';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { TodoInterface } from '#interfaces/TodoInterface';

import './index.css';


function Todos() {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const { id } = useParams<{ id: string }>();


  const fetchTodos = async () => {
    if (id && Number(id) > 100) {
      return;
    }
    const url = id ? `https://dummyjson.com/users/${id}/todos` : 'https://dummyjson.com/todos';
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.todos) {
      setTodos(data.todos);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container>
      <div className='to-do'>
        <h1> Todos</h1>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <div key={index}>
              <h2>{todo.todo}</h2>
              <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
            </div>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </div>
    </Container>
  );
}

export default Todos;
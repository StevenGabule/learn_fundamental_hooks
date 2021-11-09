import { useState } from 'react';

function generateVoteCount() {
  return Math.floor(Math.random() * 50 + 15);
}

const TODOS = [
  {
    id: generateVoteCount(),
    name: 'Do some cleaning',
    completed: false,
  },
  {
    id: generateVoteCount(),
    name: 'Do this cleaning',
    completed: false,
  },
];

function Todos() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState(TODOS);

  function handleAddTodo() {
    const addTodo = { name: newTodo, id: Date.now(), completed: false };
    setTodos([...todos, addTodo]);
  }

  return (
    <div>
      <h3>Todos</h3>
      <p>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </p>
      <ul>
        {/* {todos && todos.map((todo, i) => <li key={todo.id}>{todo.name}</li>)} */}
      </ul>
    </div>
  );
}

export default Todos;

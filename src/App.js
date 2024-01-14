import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', compeleted: false });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/todos/displayTodo');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const addTodo = async () => {
    try {
      await axios.post('http://localhost:3001/api/todos/addTodo', newTodo);
      // After adding a new todo, fetch the updated list of todos
      fetchTodos();
      // Reset the newTodo state
      setNewTodo({ title: '', description: '', compeleted: false });
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {

      // Send the updated todo to the server
      await axios.put(`http://localhost:3001/api/todos/updateTodo/${id}`, updatedTodo);

      // After updating a todo, fetch the updated list of todos
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/todos/deleteTodo/${id}`);
      // After deleting a todo, fetch the updated list of todos
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  return (
    <div id='todoEntry'>
      <h1>Todo App</h1>
      <div style={{ width: '50%', textAlign: 'left' }}>
        <h2>Add Todo</h2>
        <label>
          Title:
          <input type="text" name="title" value={newTodo.title} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={newTodo.description} onChange={handleInputChange} />
        </label>
        <br />
        <button onClick={addTodo}>Add Todo</button>
      </div>


      
      <div id='todoTable' style={{ width: '50%', textAlign: 'left' }}>
        <h2>Todo List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos && todos.map((todo) => (
              <tr key={todo._id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.compeleted ? 'true' : 'false'}</td>
                <td>
                  <button onClick={() => updateTodo(todo._id)}>
                    Task completed
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteTodo(todo._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );  
}

export default App;

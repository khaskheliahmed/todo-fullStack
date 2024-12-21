import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState(null);

  
  useEffect(() => {
    async function getData() {
      const response = await axios.get('http://localhost:1500/todo');
      console.log(response.data);
      setTodo(response.data.todos);
    }

    getData();
  }, []);

  // Add todo
  const addTodo = async (event) => {
    event.preventDefault();
    console.log(input);

    const response = await axios.post('http://localhost:1500/todo', {
      title: input,
    });

    console.log(response);
    setTodo([...todo, response.data.todo]);
    setInput(''); 
  };

  // Edit todo
  const editTodo = async (id) => {
    const updated = prompt('Enter updated value');
    if (!updated) return;

    const response = await axios.put(`http://localhost:1500/todo/${id}`, {
      title: updated,
    });
    console.log(response);

    // Update the local state
    setTodo((prevTodos) =>
      prevTodos.map((item) => (item.id === id ? { ...item, title: updated } : item))
    );
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:1500/todo/${id}`);
      console.log(response);

      const remainingTodos = todo.filter((item) => item.id !== id);
      setTodo(remainingTodos);
    } catch (error) {
      console.error('Error deleting the todo:', error);
      alert('Failed to delete the todo. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">Todo App</h1>

      {/* Form to Add Todo */}
      <form
        onSubmit={addTodo}
        className="flex w-full max-w-md gap-2 mb-5"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Enter your todo"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Todo
        </button>
      </form>

      
      <ul className="w-full max-w-md bg-white rounded-md shadow-md">
        {todo ? (
          todo.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-4 border-b last:border-none"
            >
              <span className="text-gray-700">{item.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => editTodo(item.id)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <h1 className="text-gray-500 text-center py-5">Loading...</h1>
        )}
      </ul>
    </div>
  );
};

export default App;

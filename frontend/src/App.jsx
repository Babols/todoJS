import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ description: "" });

  const getTodos = async () => {
    const response = await fetch("http://localhost:5000/todos", {
      method: "GET", // *GET, POST, PUT, DELETE
    });

    const data = await response.json();
    setTodos(data.result);
    console.warn("data", data);
  };

  const postTodos = () => {
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then(() => {
        getTodos();
        setTodo({ description: "" });
      })
      .catch(() => {
        // setErrorState
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      // .then((res) => {
      //   console.warn("res: in delete", res);
      // });
      .then(() => {
        getTodos();
      });
  };

  const updateTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      getTodos();
    });
  };

  const handleTask = (e) => {
    setTodo({ description: e.target.value });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={todo.description}
          onChange={(e) => handleTask(e)}
        />
        <button type="button" onClick={postTodos}>
          Add todo
        </button>
      </div>
      {todos.map((task) => (
        <div key={task.id}>
          {task.description}
          <button type="button" onClick={() => deleteTodo(task.id)}>
            X
          </button>
          <button type="button" onClick={() => updateTodo(task.id)}>
            Update
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;

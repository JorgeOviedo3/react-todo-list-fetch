import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const loadTodos = async () => {
    const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jorgeoviedo3");
    if (!response.ok) {
      alert("Algo ha pasado al cargar los todos");
      return;
    }
    const body = await response.json();
    setTodos(body);
  };

  const sendTodos = async (data) => {
    const sending = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jorgeoviedo3", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!sending.ok) {
      alert("Ha ocurrido un error al enviar los todos");
      return;
    }
    loadTodos();
  };

  const clearTodos = async () => {
    const clearing = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jorgeoviedo3", {
      method: "DELETE",
    });
    if (!clearing.ok) {
      alert("ha ocurrido un error al borrar");
      return;
    }
    createUser();
    alert("Se han borrado los datos correctamente");
  };

  const createUser = async () => {
    const creating = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jorgeoviedo3", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!creating.ok) {
      alert("ha ocurrido un error al crear el nuevo user");
      return;
    }
    sendTodos([{ label: "sample", done: true }]);
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13 && inputValue !== "") {
      const todoObject = { label: inputValue, done: false };
      const data = [...todos, todoObject];
      setTodos(data);
      sendTodos(data);
      setInputValue("");
    }
  };

  const handleDelete = (id) => {
    const data = todos.map((el, index) => {
      if (id === index) {
        el.done = true;
      }
      return el;
    });
    setTodos(data);
    sendTodos(data);
  };

  function itemsLeft() {
    const tempArr = todos.filter((element) => {
      return element.done == false;
    });
    return tempArr.length;
  }

  useEffect(loadTodos, []);

  return (
    <div>
      <h1 className="header">Todos App</h1>
      <div className="container" id="main">
        <input
          id="todoinput"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeypress}
          value={inputValue}
          placeholder="What needs to be done?"
        />
        <hr></hr>

        {todos.map((todo, id) => {
          if (todo.done === true) return;
          return (
            <div key={id}>
              <div className="task">
                {todo.label}
                <span
                  className="delete-btn"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  ✕
                </span>
              </div>
              <hr></hr>
            </div>
          );
        })}
        <div id="footer">
          <p className="bottom-text">
            {itemsLeft() == 0 ? "No tasks, add a new task" : itemsLeft() + " tasks left"}
          </p>
          <span onClick={clearTodos} className="btn btn-danger">
            Clear All
          </span>
        </div>
      </div>
    </div>
  );
};

export default Todo;

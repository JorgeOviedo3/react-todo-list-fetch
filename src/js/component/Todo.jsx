import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeypress = (e) => {
    if (e.keyCode === 13 && inputValue !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (id) => {
    setTodos(
      todos.filter((el, index) => {
        return index !== id;
      })
    );
  };

  return (
    <div>
      <h1 className="header">Todos App</h1>
      <div className="container" id="main">
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeypress}
          value={inputValue}
          placeholder="What needs to be done?"
        />
        <hr></hr>

        {todos.map((todo, id) => {
          return (
            <div key={id}>
              <div className="task">
                {todo}
                <span
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

        {todos.length === 0 ? (
          <div className="task notasks">No tasks, add a task</div>
        ) : (
          <></>
        )}

        <p>
          {todos.length} {todos.length === 1 ? "todo" : "todos"} left
        </p>
      </div>
      <div className="palito1"></div>
      <div className="palito2"></div>
    </div>
  );
};

export default Todo;

import { useState, useEffect } from "react";
import Todo from "./components/todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState(0);
  const [todo, setTodo] = useState({ id: null, text: "", done: false });
  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/todos");
      if (res.status === 200 && res.statusText === "OK") {
        const data = await res.json();
        setTodos(data);
        setDone(data.filter((todo) => todo.done === true).length);
      }
    } catch (ex) {}
  };
  const handleAdd = async () => {
    if (todo.text === "") return;
    todos.length !== 0
      ? (todo.id = todos[todos.length - 1].id + 1)
      : (todo.id = 1);
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: { "content-type": "application/json; charset=UTF-8" },
    });
    if (res.status === 201 && res.statusText === "Created") {
      setTodo({ id: null, text: "", done: false });
      getTodos();
    }
  };
  const handleDelete = async (todo) => {
    await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json; charset=UTF-8" },
    });
    getTodos();
  };
  const handleChange = (e) => {
    let data = todo;
    data[e.target.name] = e.target.value;
    setTodo({ ...data });
  };
  const handleClearDoneTodos = async () => {
    let doneIds = [];
    todos.forEach((el) => {
      if (el.done) doneIds.push(el.id);
    });
    for (var i = 0; i < doneIds.length; i++) {
      await fetch(`http://localhost:3000/todos/${doneIds[i]}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });
    }
    getTodos();
  };
  const handleCheckBoxChange = async (todo) => {
    todo.done ? (todo.done = false) : (todo.done = true);
    await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PATCH",
      body: JSON.stringify(todo),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="container">
      <div className="header">
        <input
          type="text"
          name="text"
          id="text"
          value={todo.text}
          onChange={handleChange}
          placeholder="Task name:"
          autoComplete="off"
        />
        <button className="btn-add" onClick={handleAdd}>
          ADD TODO
        </button>
      </div>
      <div className="body">
        <div className="info clearfix">
          <span className="to-left">
            {done}/{todos.length}
          </span>
          <button
            className="btn-clear-done-todo to-right"
            onClick={handleClearDoneTodos}
          >
            X CLEAR DONE TODOS
          </button>
        </div>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleCheckBoxChange={handleCheckBoxChange}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

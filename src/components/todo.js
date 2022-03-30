const Todo = ({ todo, handleCheckBoxChange, handleDelete }) => {
  return (
    <div className="row todo clearfix">
      <label className="container to-left">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => handleCheckBoxChange(todo)}
        />
        <span className="text">{todo.text}</span>
        <span className="checkmark"></span>
      </label>
      <button
        className="btn-delete to-right"
        onClick={() => handleDelete(todo)}
      >
        X
      </button>
    </div>
  );
};

export default Todo;

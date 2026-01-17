import React from 'react'

function Todo({ id, complete, title, toggleDone, removeTodo }) {
  return (
    <div className="todo">
      <div className="todo-row">
        <div className="todo-left">
          <input
            type="checkbox"
            checked={complete}
            onChange={() => toggleDone(id)}
          />
        </div>

        <div className="todo-center">
          <p className={complete ? "completed" : ""}>{title}</p>
        </div>

        <div className="todo-right">
          <button onClick={() => removeTodo(id)}>✖</button>
        </div>
      </div>
    </div>
  )
}

export default Todo

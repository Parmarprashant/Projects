import React from 'react'
import Todo from './Todo.jsx'

function Todos({ todos, toggleDone, removeTodo }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p style={{ textAlign: "center" }}>No todos to display</p>
      ) : (
        todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            toggleDone={toggleDone}
            removeTodo={removeTodo}
          />
        ))
      )}
    </div>
  )
}

export default Todos

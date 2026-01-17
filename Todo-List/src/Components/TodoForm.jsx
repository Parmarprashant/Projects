import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { toast } from 'react-toastify'

function TodoForm({ addTodo, Completted }) {
  const [title, setTitle] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
   
    if (title.trim().length === 0) {
      toast.info("please fill input", {
        autoClose: 2000,
      })
      return
    }
    const newTodo = {
      title,
      complete: false,
      id: uuid()
    }
    addTodo(newTodo)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter todo..."
      />
      <button type="submit">Add</button>

      <ul className="dropdown">
        <li id="sort-by">
          Sort By
          <ul className="dropdown-menu">
            <li onClick={() => Completted("completed")}>Completed</li>
            <li onClick={() => Completted("incompleted")}>Incompleted</li>
            <li onClick={() => Completted("all")}>All</li>
          </ul>
        </li>
      </ul>
    </form>
  )
}

export default TodoForm

import './App.css'
import { useState } from 'react'
import Todoform from './Components/TodoForm.jsx'
import { ToastContainer } from "react-toastify"
import Todos from './Components/Todos.jsx'

function App() {
  const [todos, setTodos] = useState([
    {id: 1, title: "Football", complete: false},
    {id: 2, title: "Cricket", complete: false},
    {id: 3, title: "Bgmi, Free Fire and All", complete: false}

  ])
  const [filter, setFilter] = useState("all")
  

  function addTodo(newTodo) {
    setTodos(prevState => [...prevState, newTodo])
    console.log(newTodo);
  }

  function ToggleCompleted(id) {
    setTodos(prevState =>
      prevState.map(todo =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }

  function removeTodo(id){
    setTodos(prevState => prevState.filter(todo => todo.id !== id))
  }

  function Completted(status) {
    if (status === "completed") setFilter("completed")
    else if (status === "incompleted") setFilter("incompleted")
    else setFilter("all")
  }

 const filteredTodos = todos.filter(todo => {
  if (filter === "completed") return todo.complete
  if (filter === "incompleted") return !todo.complete
  return true 
})
  return (
    <>
    <ToastContainer/>
    <div className="app">
     
      <h1 className="main">Todo-List</h1>
      <Todoform addTodo={addTodo} Completted={Completted} />
      
      <Todos
        todos={filteredTodos}
        toggleDone={ToggleCompleted}
        removeTodo={removeTodo}
      />
    </div>
    </>
  )
}

export default App

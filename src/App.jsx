import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiSaveUp2 } from "react-icons/ci";

function App() {
  const [title, setTitle] = useState("")
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  const saveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      if (todos.length !== 0) {
        setTodos(todos);
      }
    }
  }, []);

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleEdit = (id) => {
    let t = todos.find(i => i.id === id);
    setTitle(t.title);
    setTodo(t.todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveTols();
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveTols();
  }

  const handleAdd = () => {
    if (title && todo) {
      setTodos([...todos, { id: uuidv4(), title, todo, isCompleted: false }]);
      setTitle("");
      setTodo("");
      saveTols();
    }
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeTodo = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (id) => {
    let newTodos = todos.map(item => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item;
    });
    setTodos(newTodos);
    saveTols();
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto w-[90%] my-5 rounded-xl p-6 bg-blue-100 min-h-[80vh]">
        <div className="addtodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>

          <div className="flex flex-col items-start">

          <input onChange={handleChangeTitle} type="text" className='w-1/2 rounded-xl px-5 my-4' placeholder="Title" value={title} />
          <input onChange={handleChangeTodo} type="text" className='w-1/2 rounded-xl px-5 my-4' placeholder="Description" value={todo} />
          <button onClick={handleAdd} disabled={title.length < 3 || todo.length < 3} className='bg-blue-600 disabled:bg-blue-800 hover:bg-blue-900 p-3 py-1 font-bold text-sm text-white rounded-md m-6'>
            <CiSaveUp2 />
          </button>
          </div>


        </div>
        <input className='my-2' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show finished
        <h2 className='font-bold text-lg'>Your Todos</h2>
        <div className="todos text-wrap">
          {todos.length === 0 && <div className='m-5'>No Todos To Display</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
              <div className='flex gap-5 text-wrap'>
                <input onChange={() => handleCheckbox(item.id)} type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className='flex flex-col'>
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.title}
                  </div>
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={() => handleEdit(item.id)} className='bg-blue-600 hover:bg-blue-900 p-3 py-1 font-bold text-sm text-white rounded-md m-1'>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(item.id)} className='bg-blue-600 hover:bg-blue-900 p-3 py-1 font-bold text-sm text-white rounded-md m-1'>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App

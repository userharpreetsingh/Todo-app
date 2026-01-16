import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    axios.get('/api/todos').then(res => setTodos(res.data))
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    const res = await axios.post('/api/todos', { text: newTodo, completed: false })
    setTodos(prev => [...prev, res.data])
    setNewTodo('')
  }

  const toggleComplete = (id) => {
    const todo = todos.find(t => t._id === id)
    setTodos(prev => prev.map(t => t._id === id ? { ...t, completed: !t.completed } : t))
    axios.patch(`/api/todos/${id}`, { completed: !todo.completed })
  }

  const deleteTodo = async (id) => {
    setTodos(prev => prev.filter(t => t._id !== id))
    await axios.delete(`/api/todos/${id}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">My Todo List</h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 border px-3 py-2 rounded"
          />
          <button className="bg-blue-500 text-white px-4 rounded">Add</button>
        </form>

        {todos.map(todo => (
          <div key={todo._id} className="flex items-center justify-between border rounded p-2 mb-2">
            <div className="flex items-center gap-2 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id)}
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
              </span>
            </div>

            <button
              onClick={() => deleteTodo(todo._id)}
              className="bg-red-500 text-white px-2 rounded ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

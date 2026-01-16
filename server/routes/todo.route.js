import express from "express"
import Todo from "../model/todo.model.js"

const router = express.Router()

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add new todo
router.post("/", async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ message: "Text is required" })

    const todo = new Todo({ text, completed: false })
    const newTodo = await todo.save()
    res.status(201).json(newTodo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update todo (edit text or toggle completed)
router.patch("/:id", async (req, res) => {
  try {
    const { text, completed } = req.body
    const todo = await Todo.findById(req.params.id)
    if (!todo) return res.status(404).json({ message: "Todo not found" })

    if (text !== undefined) todo.text = text
    if (completed !== undefined) todo.completed = completed

    const updatedTodo = await todo.save()
    res.status(200).json(updatedTodo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if (!todo) return res.status(404).json({ message: "Todo not found" })

    res.status(200).json({ message: "Todo deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())

let todos = []

app.get("/todos", (req, res) => {
    res.json(todos);
})
app.post("/todos", (req, res) => {
    const text = req.body.text;
    const newTodo = {
        id: todos.length + 1,
        text
    }
    todos.push(newTodo)
    res.status(201).send(newTodo)
})

app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        return res.status(404).send("Todo Not Found");
    }
    res.json(todo);
})

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length
    todos = todos.filter(todo => todo.id !== id)
    if (todos.length == initialLength) {
        return res.status(404).send("Todo not found");
    }
    res.json({ message: "Todo Deleted Successfully" })
})
app.patch("todos/:id,", (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length
    const currItem = todos.filter(item => item.id === id)

})
app.listen(8000)

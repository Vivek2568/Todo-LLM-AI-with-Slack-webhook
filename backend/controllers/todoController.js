
const { getTodosFromDB, addTodoToDB, deleteTodoFromDB } = require("../services/firebaseService");

exports.getTodos = async (req, res) => {
    try {
        const todos = await getTodosFromDB();
        // console.log(todos);
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addTodo = async (req, res) => {
    try {
        const todo = req.body;
        //  console.log(todo);
        const id = await addTodoToDB(todo);
        res.json({ id, ...todo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        await deleteTodoFromDB(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

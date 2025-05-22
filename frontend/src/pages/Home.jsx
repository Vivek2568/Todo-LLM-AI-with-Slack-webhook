
import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState("");

    const fetchTodos = async () => {
        const res = await axios.get("http://localhost:5000/todos");
        setTodos(res.data);
    };

    const addTodo = async (text) => {
        // console.log("text", text);
        const res = await axios.post("http://localhost:5000/todos", { text });
        setTodos([...todos, res.data]);
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const summarize = async () => {
        try {
            const res = await axios.post("http://localhost:5000/summarize");
            setMessage(res.data.message);
        } catch (e) {
            setMessage("Failed to send to Slack.");
        }
    };

    useEffect(() => { fetchTodos(); }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Todo Summary Assistant</h1>
            <TodoForm onAdd={addTodo} />
            <ul>{todos.map(todo => <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />)}</ul>
            <button onClick={summarize} className="bg-green-500 text-white px-4 py-2 mt-4">Summarize & Send to Slack</button>
            <p className="mt-2">{message}</p>
        </div>
    );
}

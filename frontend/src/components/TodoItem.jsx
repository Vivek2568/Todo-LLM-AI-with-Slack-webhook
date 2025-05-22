
import React from "react";

export default function TodoItem({ todo, onDelete }) {
    return (
        <li className="border p-2 flex justify-between">
            {todo.text}
            <button onClick={() => onDelete(todo.id)} className="text-red-500">Delete</button>
        </li>
    );
}

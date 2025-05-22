
import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
    const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input value={text} onChange={e => setText(e.target.value)} className="border p-2 mr-2" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>
        </form>
    );
}

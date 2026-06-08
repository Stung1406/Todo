import React, { useState } from 'react';

function TodoForm({ onAdd }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = inputValue.trim();
        if (!text) return;
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        onAdd(newTodo);
        setInputValue(''); // Clear input sau khi thêm
    }

    return (
        <>
        <form id="todoForm" onSubmit={handleSubmit} className="mb-3">
            <div className="input-group">
                <input
                    type="text"
                    id="todoInput"
                    className="form-control"
                    placeholder="Nhập công việc..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Thêm
                </button>
            </div>
        </form>
        </>
    )
}

export default TodoForm
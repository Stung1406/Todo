import React, { useState } from 'react';
import EditTodoModal from './EditTodoModal';

function TodoItem({todo, onDelete, onUpdate}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>{todo.text}</span>
                <div className="d-flex gap-1">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setShowModal(true)}
                    >Sửa</button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(todo.id)}
                    >Xóa</button>
                </div>
            </li>

            {/* Popup form sửa — chỉ render khi showModal = true */}
            {showModal && (
                <EditTodoModal
                    todo={todo}
                    onSave={onUpdate}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    )
}

export default TodoItem
import React, { useState } from 'react';

function EditTodoModal({ todo, onSave, onClose }) {
    const [editText, setEditText] = useState(todo.text);

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = editText.trim();
        if (!text) return;
        onSave(todo.id, text);
        onClose();
    }

    return (
        // Backdrop tối phía sau
        <div
            className="modal d-block"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose} // click bên ngoài thì đóng
        >
            {/* Ngăn click bên trong truyền ra backdrop */}
            <div
                className="modal-dialog modal-dialog-centered"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Sửa công việc</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Escape' && onClose()}
                                //autoFocus
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >Hủy</button>
                            <button type="submit" className="btn btn-primary">
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTodoModal

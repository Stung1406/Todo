import React from 'react';
import TodoItem from './TodoItem';

function TodoList({todos, onDelete, onEdit}) {
    return (
        <>
            <ul id="todoList" className="list-group">
            {
              todos.map(todo => (
                <TodoItem key={todo.id} todo={todo}
                onDelete={onDelete} onEdit={onEdit}/>
              ))
            }  
            </ul>
        </>
    )
}
export default TodoList
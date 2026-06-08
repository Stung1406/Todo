import React from 'react';

function TodoStat({ todos }) {   
    const count = todos.length;
    return (
        <div className="alert alert-info py-2 mb-3">
          Tổng số công việc:
          <strong id="todoCount" className="ms-1">{count}</strong>
        </div>
    )
}

export default TodoStat 
import { useState } from 'react'
import './App.css'
import TodoList from './components/TopoList'
import TodoStat from './components/TodoStat'
import TodoForm from './components/TodoForm'
import data from './data.json'

function App() {
  const [todos, setTodos] = useState(data.todos)

  //a -> setA(b) a được định nghĩa bằng b thoogn qua hàm setA
  const handleAdd = (newTodo) =>{ //Nhận vào đối tượng mới
    setTodos([...todos,newTodo]); 
    //mở tộng thằng mảng todo 
    // và thêm thằng mới vào cuối mảng, 
    // tạo ra một mảng mới và gán lại cho todos
  }

 const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
    // bộ lọc lấy ra 1 1 prev được lọc từ 1 filter 
    
  }

  const handleUpdate = (id, newText) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Todo App</h4>
              </div>

              <div className="card-body">
                <TodoForm onAdd={handleAdd} />
                <TodoStat todos={todos} />
                <TodoList todos={todos} onDelete={handleDelete} onUpdate={handleUpdate}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import TodoList from './components/TopoList'
import TodoStat from './components/TodoStat'
import TodoForm from './components/TodoForm'
import data from './data.json'

function App() {
  const [todos, setTodos] = useState(data.todos)
  //không được modifyl trực tiếp 


  function validateform(){
    
  }
  //a -> setA(b) a được định nghĩa bằng b thoogn qua hàm setA
  const handleAdd = (newTodo) =>{ //Nhận vào đối tượng mới
    validateform();
    setTodos([...todos,newTodo]); 
    //mở tộng thằng mảng todos 
    // và thêm thằng mới vào cuối mảng, 
    // tạo ra một mảng mới và gán lại cho todos
  }


  //Áp dụng=)) chứ không phải sửa có sửa phải sửa tất
 const handleDelete = (id) => {
    setTodos(prev => prev.filter(todos => todos.id !== id))
    // bộ lọc lấy ra 1 1 prev được lọc từ 1 filter 
    // chuẩn bị sẵn
  }

  const handleEdit = (id, newText) => {
    setTodos(prev => prev.map(todos =>
      todos.id === id ? { ...todos, text: newText } : todos
    ))
  }

  return (
    <>
      <div className="container min-vh-100 d-flex align-items-center">
        <div className="row justify-content-center w-100">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Todo App</h4>
              </div>

              <div className="card-body">
                <TodoForm onAdd={handleAdd} />
                <TodoStat todos={todos} />
                <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

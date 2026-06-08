chia commponent

Nguyên tắc chia commponent

- chia theo chức năng
- nhìn thành phần lặp lại bắt buộc chia component

App jsx
TodoForm.jsx
TodoStat.jsx
TodoList.jsx
Todo_Item.jsx

Viewed TodoForm.jsx:1-28

## Flow truyền Props & Re-render trong Todo App

---

tư duy chia components
edit nên làm sau cùng
lưu ý về validate
sửa truy vấn dữ liệu ra hiển trị giống form thêm nhưng hiển thị dữ liệu rỗng ra
trả lời jsx là gì
cú pháp chuyển từ html sang cấu trúc REACT
phân biệt props và state

props: truyền từ cha xuống con
state: data gắn liền với component trong ngữ cảnh kết hợp với useState
và phải có render có điều kiện cấu trúc if else trong jsx
Composition: chia giao diện thành các component nhỏ và cách kết hợp lại

cái này là tìm hiểu :cơ chế react căn cứ vào url gọi ra components tương ứng => bắt url định tuyến => gọi ra component tương ứng

## 🏗️ Cấu trúc cây component

```
App.jsx  ← nơi duy nhất giữ state: todos[]
 ├── <TodoForm   onAdd={handleAdd} />
 ├── <TodoStat   todos={todos} />
 └── <TodoList   todos={todos}  onDelete={handleDelete}  onEdit={handleEdit} />
      └── <TodoItem  todo={item}  onDelete  onEdit />  (lặp cho mỗi item)
           └── <EditTodoModal  todo  onSave  onClose />  (chỉ khi showModal=true)
```

---

## 🟢 THÊM — Flow từ đầu đến cuối

```
App định nghĩa handleAdd  →  truyền xuống TodoForm qua prop onAdd
                                        ↓
                              User gõ text vào <input>
                              setInputValue cập nhật state nội bộ
                                        ↓
                              User nhấn "Thêm" → form submit
                              handleSubmit tạo newTodo object
                              gọi onAdd(newTodo)  ← prop nhận từ App
                                        ↓
App nhận lệnh  →  handleAdd(newTodo)
               →  setTodos([...todos, newTodo])   ← STATE THAY ĐỔI
                                        ↓
              React phát hiện todos[] đổi → RE-RENDER toàn bộ
                  ├── TodoForm   (onAdd prop không đổi, skip)
                  ├── TodoStat   nhận todos mới → hiện số mới ✅
                  └── TodoList   nhận todos mới → render thêm TodoItem mới ✅
```

**Props đi theo hướng:**

```
App  ──(onAdd)──►  TodoForm
App  ◄──(gọi callback)──  TodoForm
App  ──(todos mới)──►  TodoStat / TodoList  (sau re-render)
```

---

## 🔴 XÓA — Flow từ đầu đến cuối

```
App định nghĩa handleDelete  →  truyền xuống TodoList qua prop onDelete
TodoList nhận onDelete  →  truyền tiếp xuống từng TodoItem qua prop onDelete
                                        ↓
                              User nhấn "Xóa" ở TodoItem
                              onClick={() => onDelete(todo.id)}
                              gọi onDelete(id)  ← prop từ TodoList
                                        ↓
TodoList chuyển tiếp  →  onDelete(id)  ← prop từ App
                                        ↓
App nhận lệnh  →  handleDelete(id)
               →  setTodos(prev => prev.filter(t => t.id !== id))
                                        ↓
              React RE-RENDER
                  ├── TodoStat   nhận todos mới → số giảm ✅
                  └── TodoList   nhận todos mới → item biến mất ✅
```

**Props đi theo hướng (2 tầng):**

```
App ──(onDelete)──► TodoList ──(onDelete)──► TodoItem
App ◄──(gọi callback với id)────────────────── TodoItem
```

---

## 🔵 SỬA — Flow từ đầu đến cuối

```
App định nghĩa handleEdit  →  truyền xuống TodoList → TodoItem qua prop onEdit
                                        ↓
                              User nhấn "Sửa" ở TodoItem
                              setShowModal(true)  ← state nội bộ TodoItem
                                        ↓
                              EditTodoModal xuất hiện
                              (state editText = todo.text ban đầu)
                              User chỉnh text → setEditText cập nhật
                                        ↓
                              User nhấn "Lưu"
                              handleSubmit gọi onSave(todo.id, text)
                              → onSave là prop onEdit từ TodoItem
                              → TodoItem nhận từ TodoList
                              → TodoList nhận từ App
                                        ↓
App nhận lệnh  →  handleEdit(id, newText)
               →  setTodos(prev => prev.map(t =>
                    t.id === id ? {...t, text: newText} : t
                  ))
                                        ↓
              React RE-RENDER
                  └── TodoList → TodoItem đúng id hiển thị text mới ✅
                              → EditTodoModal đóng (showModal=false) ✅
```

**Props đi theo hướng (3 tầng):**

```
App ──(onEdit)──► TodoList ──(onEdit as onEdit)──► TodoItem ──(onEdit as onSave)──► EditTodoModal
App ◄──(gọi callback với id + newText)──────────────────────────────────────────────────── EditTodoModal
```

---

## 📌 Nguyên tắc cốt lõi

| Khái niệm                       | Giải thích                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------- |
| **Props chỉ đi xuống**          | `App → TodoList → TodoItem → EditTodoModal`                                     |
| **Sự kiện đi lên qua callback** | Con gọi hàm cha truyền xuống                                                    |
| **`setTodos` chỉ ở App**        | Chỉ nơi giữ state mới được thay đổi state                                       |
| **Sau `setTodos` → Re-render**  | React tự động render lại toàn bộ cây dùng `todos`                               |
| **State nội bộ**                | `showModal` ở TodoItem, `editText` ở EditTodoModal — chỉ ảnh hưởng component đó |

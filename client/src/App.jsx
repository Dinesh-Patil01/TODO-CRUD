import { useEffect, useState } from "react";
import Todo from "./Todo";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { FaRegSadTear } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';



function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

 
  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch("/api/todos");
        if (!res.ok) throw new Error("Failed to fetch todos");
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    getTodos();
  }, []);

 
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (content.length > 3) {
      if (editingTodoId) {
        // Update existing todo
        const res = await fetch(`/api/todos/${editingTodoId}`, {
          method: "PATCH",
          body: JSON.stringify({ todo: content }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const updatedTodo = await res.json();
          console.log("Updated Todo:", updatedTodo);

          
          setTodos((currentTodos) =>
            currentTodos.map((todo) =>
              todo._id === editingTodoId
                ? { ...todo, todo: updatedTodo.todo }
                : todo
            )
          );

          toast.success("Todo updated successfully!"); 
        } else {
          toast.error("Failed to update todo."); 
        }
        setEditingTodoId(null); 
      } else {
      
        const res = await fetch("/api/todos", {
          method: "POST",
          body: JSON.stringify({ todo: content }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const newTodo = await res.json();
          setTodos([...todos, newTodo]);
          toast.success("Todo created successfully!"); 
        } else {
          toast.error("Failed to create todo."); 
        }
      }
      setContent(""); 
    }
  };


  const startEditingTodo = (todoId, existingContent) => {
    setEditingTodoId(todoId);
    setContent(existingContent);
  };

  
  const cancelEditing = () => {
    setEditingTodoId(null);
    setContent("");
  };

  <ToastContainer 
  position="top-right"
  autoClose={1000} 
  hideProgressBar
  newestOnTop
  closeButton
  rtl={false}
/>


  return (
    <main className="container">
      <div>
 <h1 className="title">
        Tasky
  <AiOutlineCheckCircle className="icon_title" /> 
</h1>
      </div>
     


      <form className="form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new todo..."
          className="form_input"
          required
        />
        <div>
          <button
            className={`button ${editingTodoId ? "button-update" : "button-create"}`}
            type="submit"
          >
            {editingTodoId ? "Update Todo" : "Create Todo"}
          </button>
          {editingTodoId && (
            <button className="button button-cancel" type="button" onClick={cancelEditing}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="todos">
        {todos.length === 0 ? (
          <div className="no-todos">
          <FaRegSadTear size={50} /> 
          <p>No todos available yet. Add your first task!</p>
        </div>
        ) : (
          todos.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              setTodos={setTodos}
              startEditingTodo={startEditingTodo}
            />
          ))
        )}
      </div>
      <ToastContainer /> 
    </main>
  );
}

export default App;

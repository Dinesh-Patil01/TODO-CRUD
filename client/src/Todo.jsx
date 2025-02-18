import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Todo = (props) => {
    const { todo, setTodos, startEditingTodo } = props;

    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status };
                    }
                    return currentTodo;
                });
            });
            toast.success('Todo status updated!'); 
        } else {
            toast.error('Failed to update todo status.');
        }
    };

    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: 'DELETE',
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
            });
            toast.success('Todo deleted successfully!'); 
        } else {
            toast.error('Failed to delete todo.');
        }
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
        <>
            <div className="todo">
                <p>{todo.todo}</p>
                <div className='mutations'>
                    <button className="todo_status"
                        onClick={() => updateTodo(todo._id, todo.status)}>
                        {(todo.status) ? "☑" : "☐"}
                    </button>
                    <button
                        className="todo_edit"
                        onClick={() => startEditingTodo(todo._id, todo.todo)}
                    >
                        ✒️
                    </button>
                    <button className='todo_delete'
                        onClick={() => deleteTodo(todo._id)}>
                        🗑️
                    </button>
                </div>
            </div>
            <ToastContainer /> 
        </>
    );
};

export default Todo;

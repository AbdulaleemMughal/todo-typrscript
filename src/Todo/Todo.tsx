import "./Todo.scss";
import { RiDeleteBin6Line, RiSave3Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { TodoInterface } from "./Todo.interface";

export const Todo = () => {
  const [inputText, setInputText] = useState<string>("");
  const [todo, setTodo] = useState<TodoInterface[]>([]);
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState<string>("");

  // Adding Todo List Function
  const handleTodo = () => {
    if (!inputText) return alert("Enter some todo");
    const newTodo: TodoInterface = {
      id: todo.length + 1,
      title: inputText,
    };
    setTodo((prev) => [...prev, newTodo]);
    setInputText("");

    console.log(todo);
  };

  // Deleting Todo List Function
  const handleDelete = (id: number) => {
    const a = confirm("Do you really want to delete the todo");
    if(a) {
      setTodo(todo.filter((t) => t.id!== id));
    }
  };

  // Editing Todo List Function
  const handleEdit = (id: number, title: string) => {
    setEditedTodoId(id);
    setEditedTodoTitle(title);
  }

  // Saving the Edited Todo
  const handleSave = (id: number) => {
    const updatedTodo = todo.map((t) =>
      t.id === id ? {...t, title: editedTodoTitle } : t
    );
    setTodo(updatedTodo);
    setEditedTodoId(null);
  };

  return (
    <>
      <h1>TODO APP</h1>
      <div className="todo">
        <div className="todo-input">
          <input
            type="text"
            placeholder="Enter Todo"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={handleTodo}>Add</button>
        </div>
        <div className="todo-output">
          {todo.map((t, index) => (
            <div className="todo-output-list" key={t.id}>
              {editedTodoId === t.id ? (
                <>
                  <input
                    type="text"
                    value={editedTodoTitle}
                    onChange={(e) => setEditedTodoTitle(e.target.value)}
                  />
                  <button onClick={() => handleSave(t.id)} className="todo-output-list-save">
                    <RiSave3Line />
                  </button>
                </>
              ) : (
                <>
                  <span>{index + 1} - {t.title}</span>
                  <div className="todo-output-list-button">
                    <button
                      className="todo-output-list-button-edit"
                      onClick={() => handleEdit(t.id, t.title)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="todo-output-list-button-delete"
                      onClick={() => handleDelete(t.id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

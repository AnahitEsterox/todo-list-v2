import React, { useState } from "react";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [recycleBin, setRecycleBin] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newTodo !== "") {
            setTodos([...todos, newTodo]);
            setNewTodo("");
        }

    };

    const handleDelete = (index) => {
        const deletedTodo = todos[index];
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        setRecycleBin([...recycleBin, deletedTodo]);
    };

    const handleClearRecycleBin = (index) => {
        const newRecycleBin = ([...recycleBin, ]);
        newRecycleBin.splice(index, 1)
        setRecycleBin(newRecycleBin)
    };

    const handleUndo = (index) => {
        const undoItem = recycleBin[index]
        const refreshTodos = [...todos, undoItem]
        setTodos(refreshTodos)
        recycleBin.splice(index,1)
        setRecycleBin(recycleBin)
    }

    return (
        <div className="todo-wrapper">
            <div className="todo">
                <h1 className="head">To-Do List</h1>
                <form onSubmit= {handleSubmit}>
                    <input
                        className="todo-add-input"
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter a new to-do item"
                    />
                    <button className="todo-add-btn" type="submit">Add</button>
                </form>
                <ul>
                    {todos.map((todo, index) => (
                        <li
                            className="todo-item"
                            key={index}>
                            {todo}
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <div className="recycle-container">
                    <h2>Recycle Bin</h2>
                    {recycleBin.length > 0 ? (
                        <div className="recycle-block">
                            <ul>
                                {recycleBin.map((todo, index) => (
                                    <li className="deleted-item" key={index}>{todo}
                                        <div className='buttons-side'>
                                            <button onClick={() => handleClearRecycleBin(index)}>Delete</button>
                                            <button onClick={() => handleUndo(index)}>Undo</button>
                                        </div>

                                    </li>

                                ))}
                            </ul>
                            <button onClick={handleClearRecycleBin}>Clear</button>
                        </div>
                    ) : (
                        <p>The recycle bin is empty.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodoList;

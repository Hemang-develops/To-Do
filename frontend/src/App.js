import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import Login from "./components/Login";

const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };

  const editToggle = () => {
    setEditModal(!editModal);
  };

  const loginToggle = () => {
    setLoginModal(!loginModal);
  };

  const handleSubmit = (item) => {
    editToggle();

    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then(() => refreshList());
    } else {
      axios
        .post("/api/todos/", item)
        .then(() => refreshList());
    }
  };

  const handleDelete = (item) => {
    axios
      .delete(`/api/todos/${item.id}/`)
      .then(() => refreshList());
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false };

    setActiveItem(item);
    setEditModal(!editModal);
  };

  const editItem = (item) => {
    setActiveItem(item);
    setEditModal(!editModal);
  };

  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => displayCompleted(true)}
          className={viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => displayCompleted(false)}
          className={viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <div class="border border-gray-200 p-4 my-2">
        <li
          key={item.id}
          className="flex justify-between items-center py-2 px-4 border-t border-gray-200 bg-white"
        >
          <span
            className={`todo-title mr-5 ${viewCompleted ? "completed-todo" : ""}`}
            title={item.description}
          >
            {item.title}
          </span>
          <span className="ml-auto">
            <button
              className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => editItem(item)}
            >
              Edit
            </button>
            <button
              className="bg-danger hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(item)}
            >
              Delete
            </button>
          </span>
        </li>

      </div>
    ));
  };

  return (
    <main className="container mx-auto">
      <h1 className="text-black text-uppercase text-center my-4">To-do app</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 sm:w-full mx-auto p-0">
          <div className="bg-white border rounded-lg shadow-md p-3">
            <div className="mb-4">
              <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3" onClick={createItem}>
                Add task
              </button>
              <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={loginToggle}>
                Log In
              </button>
            </div>
            {renderTabList()}
            <ul className="pl-0 divide-y divide-gray-200 list-unstyled">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {editModal ? (
        <Modal
          activeItem={activeItem}
          toggle={editToggle}
          onSave={handleSubmit}
        />
      ) : null}
      {loginModal ? (
        <Login
          activeItem={activeItem}
          toggle={loginToggle}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  );
};

export default App;
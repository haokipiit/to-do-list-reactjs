import { useState, useEffect } from "react";
import "./App.css";

//import Form.js
import Form from "./components/Form";
// imprt TodoList.js
import TodoList from "./components/TodoList";

function App() {
  // working with inputs
  const [inputText, setInputText] = useState("");
  // so after you pass the set function, we can now use the inputText state anywhere we want the update to show.

  // another state for todo
  const [todos, setTodos] = useState([]);

  // filter different categories
  const [status, setStatus] = useState("all");

  const [filteredTodos, setFilteredTodos] = useState([]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;

      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };

  // USE-EFFECT
  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]); // this use-effect function will run every time there is a change in the todo state

  //Local storage
  const saveLocalTodos = () => {
    // add todos to the local memory
    localStorage.setItem("todos", JSON.stringify(todos)); 
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>To Do List</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      {/* to get the changes made in the form component, we pass down the function that will get the changes made and update the app */}
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;

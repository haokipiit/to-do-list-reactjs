import React from "react";

const Form = ({inputText, setInputText, todos, setTodos, setStatus}) => {

  // input handler
  const inputTextHandler = (e) => {
    //console.log(e.target.value); // get the value of typed text
    setInputText(e.target.value);
  }

  // submitting input
  const submitInputHandler = (e) => {
    e.preventDefault(); // to prevent the page from reloading after submission
    setTodos([
      ...todos, {text: inputText, completed: false, id: Math.random()*1000}
      // we are creating a new object with text = the input text and id with some random numbers
    ]);

    // after submitting we want to clear the input box
    setInputText("");
  }

  const statusHandler = (e) => {
    // console.log(e.target.value);
    setStatus(e.target.value);
  }

  return (
    <form>
      <input onChange={inputTextHandler} type="text" className="todo-input" value={inputText}/>
      {/* value is needed if we want to clear the input box after submission */}
      <button onClick={submitInputHandler} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
}

export default Form;
import './App.css';
import { useState } from "react";
import Button from './Components/Button';

function App() {
  const [btn, setBtn] = useState("ADD")
  const [task, setTask] = useState("");
  const [id, setId] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storageTask = JSON.parse(localStorage.getItem("tasks"));
    return storageTask ?? [];
  });

  function handleAdd(id) {
    if (btn === "ADD") {
      if (task !== "") {
      setTasks(prev => {
            const newTasks = [task, ...prev];
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            
            return newTasks;
          });
      } else {
        alert("Please enter your task!!!")
      }
      
    } 
    else {
      console.log("Day la ID: " + id);
      let getTask = JSON.parse(localStorage.getItem("tasks"));
      setTasks(prev => {
          getTask[id] = task;
          localStorage.setItem("tasks", JSON.stringify(getTask));

        return getTask;
      });
      
      setBtn("ADD")
      
    }
    setTask("");
  }

  function handleDel(index) {
    setTasks(prev => {
      setId("");
      setBtn("ADD");
      setTask("");
      const getNewTasks = tasks.filter((task, i) => i !== index);
      localStorage.setItem("tasks", JSON.stringify(getNewTasks));
      return getNewTasks;
    })
  }

    function handleEdit(getTask, getIndex) {
      setBtn("Save")
      setTask(getTask);
      setId(getIndex)
  }


  function handleBtn(i) {
    if (i == null || i == undefined) {
      return btn;
    } else {
      return setBtn("Save")
    }
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        className='inputTask'
        value={task} 
        type="text"
        placeholder='Enter your task...'
        onChange={e => setTask(e.target.value)}
      />
      
      <Button 
        onClick={() => handleAdd(id)}
        title={handleBtn(null)}
      />
      <ul className='tasksBlock'>
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              <span>{task}</span>
              <div>
                <button 
                  className='delBtn'
                  onClick={() => handleDel(index)}
                >Delete</button>
                <button
                  className='editBtn'
                  onClick={() => handleEdit(task, index)}
                >Edit</button>
              </div>
            </li>
            
          );
        })}
      </ul>
    </div>
  );
}

export default App;

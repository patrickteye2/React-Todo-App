import React,{useEffect, useState} from 'react';
import './App.css';
import {MdDeleteForever} from 'react-icons/md'
import {BsFillCheckCircleFill} from 'react-icons/bs'

function App() {
  const[isCompleteScreen, setIsCompleteScreen] = useState(false)
  const[allTodos, setAllToDos] = useState([]);
  const[newTitle, setNewTitle] = useState();
  const[newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo =() =>{
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodo = [...allTodos];
    updatedTodo.push(newTodoItem)
    setAllToDos(updatedTodo);
    localStorage.setItem('todolist', JSON.stringify(updatedTodo))
 
  }

  const handleDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllToDos(reducedTodo);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yy = now.getFullYear();
    let hr = now.getHours();
    let mn = now.getMinutes();
    let s  = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yy + ' at ' + hr + ':' + mn + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompleted = [...completedTodos];
    updatedCompleted.push(filteredItem);
    setCompletedTodos(updatedCompleted); 
    handleDelete(index);
    localStorage.setItem('completed', JSON.stringify(updatedCompleted));
  };

  const handleDeleteCompleted = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('completed', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(() =>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompleted = JSON.parse(localStorage.getItem('completed'));
    if(savedTodo){
      setAllToDos(savedTodo);
    }

    if(savedCompleted){
      setCompletedTodos(savedCompleted);
    }
  },[])
  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} type='text' placeholder='What is the task?'></input>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={e=>setNewDescription(e.target.value)} placeholder='What is the task?'></input>
          </div>
          <div className='todo-input-item'>
            <button type='button' className='primaryBtn' onClick={handleAddTodo} >Add</button>
           </div>
        </div>

        <div className='btn-area' >
            <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)} >Todo</button>
            <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button> 
        </div>
        <div className='todo-list' >
        { isCompleteScreen===false && allTodos.map((item, index) => {
          return(
            <div className='todo-list-item' key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>
            <div>
            <MdDeleteForever className='icon' onClick={() => handleDelete(index)} title='Delete?' />
            <BsFillCheckCircleFill className='check-icon' onClick={() => handleComplete(index)} title='Complete?' />
            </div>
           
          </div>
          )
        })}

        { isCompleteScreen===true && completedTodos.map((item, index) => {
          return(
            <div className='todo-list-item' key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed on: {item.completedOn}</small></p>
            </div>
            <div>
            <MdDeleteForever className='icon' onClick={() => handleDeleteCompleted(index)} title='Delete?' />
           </div>
           
          </div>
          )
        })}

        </div>
      </div>
    </div>
  );
}

export default App;

import React, {useEffect, useState} from 'react';
import './App.css';

import axios from 'axios';
import Todo from './components/Todo';
import Add from './components/Add';

export default function App() {
  const[tasks, setTasks] = useState([])

  useEffect (() => {
    getData()
  },[])
  
  const getData = () =>{
    //should bring data using axios
    // from backend (GET / tasks)
    axios
        .get('http://localhost:5000/tasks')
        .then((response) => {
         // console.log('RESPONSE: ', response);
          console.log('DATA: ', response.data);
          setTasks(response.data);
        })
        .catch((err) => {
          console.log('ERR: ', err);
        });
  };

 const postNewTodo = (body) => {
 // console.log('APP func postNewTodo from APP');
 //{"title":"task 5","isCompleted": true}
  axios
  .post('http://localhost:5000/tasks',body)
  .then((response) => {
   // console.log('RESPONSE: ', response);
    console.log('DATA: ', response.data);
    //setTasks(response.data);
    getData()
    //change react hooks state using spread operator
  })
  .catch((err) => {
    console.log('ERR: ', err);
  });
 }

  const mapOverTasks = tasks.map((taskObj, i) => ( 
    <Todo key={i} task={taskObj}/>
    ));

  return (
    <div className="App">
      <p>App</p>
      {/* when click on this button
      should call function bring Data */}
      <button onClick={getData}>GET TASKS</button>
      <Add createFunc={postNewTodo}/>
      {mapOverTasks}
    </div>
  );
}


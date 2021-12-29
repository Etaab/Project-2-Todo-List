import React, {useEffect, useState} from 'react';
import './App.css';

import axios from 'axios';
import { Routes, Route, Link } from "react-router-dom";

import Todo from './components/Todo';
import Add from './components/Add';
import Register from './components/Register'
import Login from './components/Login';

export default function App() {
  const[tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  
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
 };

const deleteTodo = (id) => {
  axios
  .delete(`http://localhost:5000/tasks/${id}`)
  //     ('http://localhost:5000/tasks/${id}')
  .then((response) => {
   // console.log('RESPONSE: ', response);
    console.log('DATA: ', response.data);
    getData()
    //change react hooks state using spread operator
  })
  .catch((err) => {
    console.log('ERR: ', err);
  });
}; 

const toggleTodo = (id, newStatus) => {
  axios
  .put(`http://localhost:5000/tasks/${id}/${newStatus}`)
  .then((response) => {
   // console.log('RESPONSE: ', response);
    console.log('DATA: ', response.data);
    getData()
    //change react hooks state using spread operator
  })
  .catch((err) => {
    console.log('ERR: ', err);
  });
};

const deleteTasks = () => {
  axios
  .delete(`http://localhost:5000/tasks/`)
  //.....(`http://localhost:5000/tasks/$)
  .then((response) => {
   // console.log('RESPONSE: ', response);
    console.log('DATA: ', response.data);
    getData()
    //change react hooks state using spread operator
  })
  .catch((err) => {
    console.log('ERR: ', err);
  });
};

const filterData = (status) => {
  //should bring data using axios
  // from backend (GET / tasks)
  axios
      .get(`http://localhost:5000/filter?isCompleted=${status}`)
      .then((response) => {
       // console.log('RESPONSE: ', response);
        console.log('DATA: ', response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log('ERR: ', err);
      });
};

const logoutFunc = () => {
  setIsLoggedIn(false)
  setUsername("")
} ;
  const mapOverTasks = tasks.map((taskObj, i) => ( 
    <Todo 
    key={taskObj._id}
    task={taskObj}
    deleteTodo={deleteTasks} 
    toggleTodo={toggleTodo}
    />
    ));
  return (
    <div className="App">
    
      <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <span class="navbar-text">
    أهداف اليوم
    </span>
  </div>
</nav>
      <br/>
      <p className="btn btn-outline-light"
      >Name:{username}</p>
  
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">القائمة </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link to='/home' className="nav-link active">Home</Link>
        </li>
        <li class="nav-item">
          <Link to='/login' className="nav-link">Login</Link>
        </li>
        <li class="nav-item">
          <Link to='/register' class="nav-link">Register</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<br/>
    
<Routes>
  <Route path="/home"
   element={
    <div className='Home'>
      {/* click on button should  bring all Data */}
      <br />
      <button id='t1'
       onClick={deleteTasks}
       className="btn btn-outline-light"
       >
        حذف كل المهام
      </button>

      <button id='t1'
       onClick={() => {
        filterData(true)
       }}
       className="btn btn-outline-light"
      >
        المهام المنتهية
      </button>

      <button id='t1'
      onClick={() => {
        filterData(false)
        }}
        className="btn btn-outline-light" 
      >
        المهام الغير منتهية 
      </button>

      <button id='t1'
       onClick={getData}
       className="btn btn-outline-light"
       >
         كل المهام
      </button>

      <Add createFunc={postNewTodo}/>
      {mapOverTasks}
      </div>
      }
 />
  <Route 
  path="login" 
  element={
  <Login 
  setIsLoggedIn={setIsLoggedIn}
  setUsername={setUsername}/>} />
  
  <Route path="register" element={<Register />} />
</Routes>
<br/>
<button
 onClick={logoutFunc} 
 className="btn btn-outline-light">
  Logout
</button>
      
    </div> 
  );
}
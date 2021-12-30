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
    
<nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
    <span className=" navbar-text" id='t1' >
    أهداف اليوم
    </span>
  </div>
</nav>
      <br/>
      
  
<nav className=" navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className=" navbar-brand" href="#" id='t1'>القائمة </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
      >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to='/home' className="nav-link active">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/login' className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/register' className="nav-link">
            Register
          </Link>
        </li>
        <button
          onClick={logoutFunc} 
          className="m-1 btn btn-outline-light" id='t1'>
          Logout
        </button>  
        <button
          id='t1'
          type="button"
          className="m-1 btn btn-outline-light"
          data-bs-toggle="popover"
          title="Todo List"
          data-bs-content="Welcome to Todo List Web Application"
        >
          {username ? "Welcome " + username : "Please Login"}{" "}
        </button>
      </ul>
    </div>
  </div>
</nav>
<br/>
    
<Routes>
  <Route path="/home"
   element={
    <div className='Home'>
      <div className='Home mb-3'>
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
       className=" m-1 btn btn-outline-light"
      >
        المهام المنتهية
      </button>

      <button id='t1'
      onClick={() => {
        filterData(false)
        }}
        className="m-1 btn btn-outline-light" 
      >
        المهام الغير منتهية 
      </button>

      <button id='t1'
       onClick={getData}
       className=" m-1 btn btn-outline-light"
       >
         كل المهام
      </button>
      </div>

      <Add createFunc={postNewTodo}/>
      <div className="list-group">
      {mapOverTasks}
      </div>
    </div>
      }
 />
  <Route 
  path="/login" 
  element={
  <Login 
  setIsLoggedIn={setIsLoggedIn}
  setUsername={setUsername}/>} />
  
  <Route path="register" element={<Register />} />
</Routes>
<br/>

      
    </div> 
  );
}
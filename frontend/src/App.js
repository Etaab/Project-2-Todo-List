import React, {useEffect, useState} from 'react';
import './App.css';

import axios from 'axios';
import Todo from './components/Todo';
import Add from './components/Add';
import Register from './components/Register'
import Login from './components/Login';

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
      <b id='t2'>أهداف اليوم</b>
      {/*<Add createFunc={postNewTodo}/>*/}
      {/* click on button should  bring all Data */}
      <br />
      <button id='t1'
       onClick={() => {
        filterData(true)
       }}
      >
        المهام المنتهية
      </button>
      <button id='t1'
      onClick={() => {
        filterData(false)
        }}
      >
        المهام الغير منتهية 
      </button>

      <button id='t1' onClick={getData}>كل المهام </button>
     {/* {mapOverTasks}*/}
      <button id='t1' onClick={deleteTasks}>حذف كل المهام </button>
      <Register/>
      <Login/>

    </div>
  );
}
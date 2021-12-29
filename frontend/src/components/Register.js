import React, {useState} from 'react';
import axios from 'axios';
import  { Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

 const registerFunc = (e) => {
  e.preventDefault();
  console.log('reg');
  const newUser = {
      //ES6
      email,
      //"email" : "email value in the state"
      password,
      username,
  };
  axios
   .post(`http://localhost:5000/users/register`, newUser)
   .then((response) => {
       console.log('Data: ',response.data);
   })
   .catch((err) => {
       console.log('ERR: ', err);
   })
 };

    return (
        <div className='Register'>
            <form action=''>
            <label htmlFor="email" id='t1' className="m-1 btn btn-outline-light">Email</label>
            <input
             type="email"
             placeholder='Write email here ...' 
             className="m-1 btn btn-light"
             onChange={(e) => {
                setEmail(e.target.value);
            }}
             value = {email}
            />
            <br/>
            <br/>
            <label htmlFor="password" id='t1' className="m-1 btn btn-outline-light">Password</label>
            <input
             type="password" 
             placeholder='Write password here ...'
             className="m-1 btn btn-light"
             onChange={(e) => {
                setPassword(e.target.value);
            }}
            value = {password}
            />
            <br/>
            <label htmlFor="username" id='t1' className=" m-1 btn btn-outline-light">Username</label>
            <input
             type="text"
             placeholder='Write username here ...'
             className="m-1 btn btn-light" 
             onChange={(e) => {
                setUsername(e.target.value);
            }}
            value = {username}
            />
            <br/>
            <input type="submit" value="Register" id='t1' onClick={registerFunc} className="m-1 btn btn-outline-light" />
            <br/>
            <Link to='/Login' className="m-1 btn btn-outline-light" id='t1' >Have An Account?</Link>
            </form>
        </div>
    )
}

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
            <label htmlFor="email" className="btn btn-outline-light">Email</label><p> </p>
            <input
             type="email"
             placeholder='Write email here ...' 
             className="btn btn-light"
             onChange={(e) => {
                setEmail(e.target.value);
            }}
             value = {email}
            />
            <br/>
            <br/>
            <label htmlFor="password" className="btn btn-outline-light">Password</label><p> </p>
            <input
             type="password" 
             placeholder='Write password here ...'
             className="btn btn-light"
             onChange={(e) => {
                setPassword(e.target.value);
            }}
            value = {password}
            />
            <br/>
            <br/>
            <label htmlFor="username" className="btn btn-outline-light">Username</label><p> </p>
            <input
             type="text"
             placeholder='Write username here ...'
             className="btn btn-light" 
             onChange={(e) => {
                setUsername(e.target.value);
            }}
            value = {username}
            />
            <br/>
            <input type="submit" value="Register" onClick={registerFunc} className="btn btn-outline-light" />
            <br/>
            <br/>
            <Link to='/Login' className="btn btn-outline-light">Have An Account?</Link>
            </form>
        </div>
    )
}

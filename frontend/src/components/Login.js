import React, {useState} from 'react';
import axios from 'axios';
import  { Link } from 'react-router-dom';

export default function Login(props) {
    const [email, setEmail] = useState('Et_1@hotmail.com');
    const [password, setPassword] = useState('1234');

    const loginFunc = (e) => {
        e.preventDefault();
    const userInfo = {
            //"email":email
            email,
            password,
    };
      axios
      .post(`http://localhost:5000/users/login`, userInfo)
      .then((response) => {
          console.log("DATA: ", response.data);
          props.setIsLoggedIn(true);
          props.setUsername(response.data.username);
      })
      .catch((err) => {
          console.log("ERR: ", err);
      });

    };

    return (
        
        <div className='text-center'>
            <form action=''>
                <label htmlFor="" id='t1' className=" m-1 btn btn-outline-light">Email:</label>
                <input
                 onChange={(e) => {
                    setEmail(e.target.value)
                }}
                value = {email}
                type="text"
                placeholder = 'Write email here ....'
                className="m-1 btn btn-light"
                />
                <br />
                <label htmlFor="" id='t1' className="m-1 btn btn-outline-light">Password:</label>

                <input 
                 onChange={(e) => {
                    setPassword(e.target.value)
                }}
                value = {password}
                type="password"
                placeholder='Write password here ....'
                className="m-1 btn btn-light"
                />
                <br />
               {/*<button type="button" class="btn btn-light">Light</button> */}
                <input type="submit" value="login" onClick={loginFunc} id='t1' className="m-1 btn btn-outline-light"/>
                <br/>
                <Link to='/Register' className="m-1 btn btn-outline-light" id='t1' >Don't Have An Account?</Link>
            </form>
            
       {/*     
      <form>
        <div class="form-floating mb-3">
            
             <input 
              type="email"
              class="form-control"
              id="floatingInput" 
             // placeholder="name@example.com"
              onChange={(e) => {
                setEmail(e.target.value)
               }}
            value = {email} 
             />
             <label for="floatingInput" id='t1'>Email address</label>
        </div>
        <div class="mb-3 form-floating">
            <input
             type="password" 
             class="form-control" 
             id="floatingPassword" 
             //placeholder="Password"
             onChange={(e) => {
                setPassword(e.target.value)
              }}
            value = {password}
             />
            <label for="floatingPassword" id='t1'>Password</label>
        </div> 

            <input
             type="submit"
             value="login" 
             onClick={loginFunc}
             id='t1' 
             className="btn btn-outline-light"
             />
             
            <Link 
            to='/Register'
            className="btn btn-outline-light" 
            id='t1' >
             Don't Have An Account?
            </Link>
             </form>
              */}
        </div>
    );
}

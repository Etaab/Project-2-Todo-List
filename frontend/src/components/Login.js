import React, {useState} from 'react';
import axios from 'axios';
import  { Link } from 'react-router-dom';

export default function Login(props) {
    const [email, setEmail] = useState('Et_1@hotmail.com');
    const [password, setPassword] = useState('1234');
    const [wrongEmail, setWrongEmail] = useState(false);
    const [loginStatus, setLoginStatus] = useState(0);
    const [loginMessage, setLoginMessage] = useState('')
    // 200 || 400 || 404 

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
          setLoginStatus(response.status);
          setLoginMessage(response.data.message);
          //console.log("DATA: ", response.data);
          props.setIsLoggedIn(true);
          props.setUsername(response.data.username);
      })
      .catch((err) => {
         // console.log("ERR: ", err);
          setLoginStatus(err.response.status);
          setLoginMessage(err.response.data.message);
          props.setIsLoggedIn(false);
          props.setUsername(null);
      });

    };

    return (
        
        <div className='text-center'>
            <form action=''>
              <div className='mb-3'>
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
                {loginStatus === 200 &&(
                    <div className="alert alert-success m-1" 
                    role="alert">
                       {loginMessage}
                    </div> 
                )}

                 {(loginStatus === 400 || loginStatus === 404) &&(
                    <div className="alert alert-danger m-1" 
                     role="alert">
                       {loginMessage}
                    </div> 
                )} 

               {/*<button type="button" class="btn btn-light">Light</button> */}
                <input type="submit" value="login" onClick={loginFunc} id='t1' className="m-1 btn btn-outline-light"/>
                <br/>
                <Link to='/Register' className="m-1 btn btn-outline-light" id='t1' >Don't Have An Account?</Link>

              </div>
            </form>
        </div>
       
    );
}

{/*     
      <form>
        <div className="form-floating mb-3">
            
             <input 
              type="email"
              className="form-control"
              id="floatingInput" 
             // placeholder="name@example.com"
              onChange={(e) => {
                setEmail(e.target.value)
               }}
            value = {email} 
             />
             <label htmlFor="floatingInput" id='t1'>Email address</label>
        </div>
        <div className="mb-3 form-floating">
            <input
             type="password" 
             className="form-control" 
             id="floatingPassword" 
             //placeholder="Password"
             onChange={(e) => {
                setPassword(e.target.value)
              }}
            value = {password}
             />
            <label htmlFor="floatingPassword" id='t1'>Password</label>
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

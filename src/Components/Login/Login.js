import {React,useContext,useState} from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/Context';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail] = useState('') 
  const [password,setpassword] = useState('')
  const {OLXdb} = useContext(FirebaseContext)
  const navigate = useNavigate()
  const handlelogin = (e) =>{
    e.preventDefault(); 
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("sign in");
            alert('WELCOME TO OLX');
            navigate('/');
          })
          .catch((error) => {
            if( error.code == 'auth/invalid-login-credentials'){
              alert('invalid user')
            }
            const errorCode = error.code;
            const errorMessage = error.message;
          });

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlelogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            required
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;

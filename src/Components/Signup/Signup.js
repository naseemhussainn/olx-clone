import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { collection,addDoc } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';

export default function Signup() {
  const navigate = useNavigate()
  const [Username,setUsername] = useState('')
  const [Email,setEmail] = useState('')
  const [phone,setphone] = useState('')
  const [password,setpassword] = useState('')

  const {OLXdb} =  useContext(FirebaseContext)
  const [loading, setLoading] = useState(false);
  const handleSumbit = (e) =>{
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,Email,password).then((userCredential)=>{
      const user = userCredential.user;
      updateProfile(user,{displayName:Username})
        .then(()=>{
          const collectionRef = collection(OLXdb, 'users');
          const usersToAdd ={
            id : user.uid,
            username: Username,
            phNo : phone,
          }
          addDoc(collectionRef,usersToAdd)
          .then((docRef) => {
              console.log('product added with id',docRef);
              navigate("/login")
          })
          .catch((error) => {
            console.error('Error getting documents: ', error);
          })
          .finally(() => {
            setLoading(false); // Hide the loader when the process is complete
            alert("User Added");
          });

        })
    })
    .catch((error) => {
      setLoading(false);

      if (error.code === 'auth/email-already-in-use') {
        alert("Email address is already in use");
      } else if (error.code === 'auth/invalid-email') {
        alert("Invalid email address");
      } else if (error.code === 'auth/weak-password') {
        alert("Weak password. It should be at least 6 characters long.");
      } else {
        alert("Error creating user: " + error.message);
      }
    });
  }
  return (
    <div>
      <div className="signupParentDiv">
      {loading && <div className="loader"></div>}
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSumbit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={Username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            required
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={Email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
            required
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setphone(e.target.value)}
            id="lname"
            name="phone"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            id="password"
            name="password"
            required
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}

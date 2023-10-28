import React, { useContext, useEffect } from 'react';
import './App.css';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import { BrowserRouter,Routes,Route,Link,Router} from 'react-router-dom';
import LoginPage from './Pages/Login';
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const {user,setUser} = useContext(AuthContext)
  const {OLXdb} = useContext(FirebaseContext)
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      setUser(user);
    })
console.log(user);
  })
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route Component={Home} path='/'/>
          <Route Component={Signup} path='/signUp'/>
          <Route Component={LoginPage} path='/login'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

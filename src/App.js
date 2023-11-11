import React, { useContext, useEffect } from 'react';
import './App.css';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import { BrowserRouter,Routes,Route,Link,Router} from 'react-router-dom';
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from './store/PostContext';

function App() {
  const {setUser} = useContext(AuthContext)
  const {OLXdb} = useContext(FirebaseContext)
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      setUser(user);
    });
  },[]);
  return (
    <div>
      <Post>
        <BrowserRouter>
          <Routes>
            <Route Component={Home} path='/'/>
            <Route Component={Signup} path='/signUp'/>
            <Route Component={LoginPage} path='/login'/>
            <Route Component={Create} path='/sell'/>
            <Route Component={ViewPost} path='/viewPost/:userID/:productID'/>
          </Routes>
        </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;

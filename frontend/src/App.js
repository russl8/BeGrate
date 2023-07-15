import React from "react";
import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import CreatePost from './components/CreatePost';

import axios, { Axios } from "axios"
import { useNavigate } from "react-router-dom";

function App() {
  //declaration of constants
  const navigate = useNavigate();

  //add an object key&value for the userID or userData
  const [globalState, setGlobalState] = React.useState({
    userAuth: false,
    token: "",
    userData: null
  });

  //getting token from localstorage
  React.useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    if (token) {
      setGlobalState({ ...globalState, token: token })
    }

    //fetch "localhost3001/ post" to set the userauth and  token 
    axios({
      //takes 
      method: "POST",
      data: {
        token
      },
      withCredentials: true,
      url: "http://localhost:3001/"
    }).then(res => {
      console.log(res.data)
      setGlobalState({
        ...globalState,
        token: res.data.token,
        userAuth: res.data.isAuthenticated,
        userData: res.data.userData
      })
    })
    console.log(globalState)

  }, [])

  //logs out user
  const handleLogout = (e) => {
    //delete jwt from local storage
    //change user auth to false
    window.localStorage.removeItem("token")
    setGlobalState({ ...globalState, userAuth: false, token: "", userData: {} })
    //redirect user to home page
    navigate("/");
  }
  //a function used in <Login/> that sets userAuthentication to true, if the user is logged in.
  const loginSetAuth = (username, password) => {
    axios({
      //takes 
      method: "POST",
      data: {
        username: username,
        password: password
      },
      withCredentials: true,
      url: "http://localhost:3001/login"
    }).then(res => {
      const isAuth = res.data.isAuth

      setGlobalState({ ...globalState, userAuth: isAuth })

      if (isAuth) {
        //save the token to local storage
        window.localStorage.setItem("token", JSON.stringify(res.data.token))
        //set the global state token and the auth status
        setGlobalState({
          ...globalState,
          userAuth: isAuth,
          token: res.data.token,
          userData: res.data.userData
        })
        //redirect user to home page
        navigate("/")



        //extra: if user goes back to login page, verify user if signed in or not. if signed in, send 403
      } else {
        //set auth to false and token to "". and remove the token from the local storage.
        setGlobalState({ ...globalState, userAuth: false, token: "" })
        window.localStorage.removeItem("token")
      }


    })
  }
  /*
    now, user can log in.
    need to impement token so that backend can verify code whenever it needs
  
  */

  return (
    <div className="App">
      <Routes>
        {/* nav bar  */}
        <Route element={<Layout
          isAuthenticated={globalState.userAuth}
          handleLogout={handleLogout}
          // WORK ON THIS!!!!!!!!
          userName={() => {
            if (globalState.userData) {
              return globalState.userData.user.username;
            }
            return "Account";
          }}
        />} >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login verifyAuth={loginSetAuth} />} />
          <Route path = "/posts" element = {<CreatePost/>}/>
        </Route> {/* nav bar route ends */}
      </Routes>
    </div>
  );
}

export default App;
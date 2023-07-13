import React from "react";
import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import axios, { Axios } from "axios"

function App() {

  const verifyAuth = (username, password) => {
    axios({

      method: "POST",
      data: {
        username: username,
        password: password
      },
      withCredentials: true,
      url: "http://localhost:3001/login"
    }).then(res => {
      const a = res.data.isAuth
      setUserAuthentication(a)
      console.log(userAuthentication)
    })
  }
  /*
    now, user can log in.
    need to impement token so that backend can verify code whenever it needs
  
  */

  //for each render, fetch the user's authenticaion status (logged in / out)
  // React.useEffect(() => {
  //   fetch("http://localhost:3001/")
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json(); // Parse the response body as JSON
  //       } else {
  //         throw new Error("Error fetching data.");
  //       }
  //     })
  //     .then((jsonResponse) => {
  //       // console.log(jsonResponse)
  //       console.log(jsonResponse)
  //       setUserAuthentication(jsonResponse.isAuthenticated)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // });
  //state for whether user is authenticated
  const [userAuthentication, setUserAuthentication] = React.useState(false)



  return (
    <div className="App">
      <Routes>
        {/* nav bar  */}
        <Route element={<Layout isAuthenticated={userAuthentication} />} >

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login verifyAuth={verifyAuth} />} />

        </Route> {/* nav bar route ends */}
      </Routes>
    </div>
  );
}

export default App;
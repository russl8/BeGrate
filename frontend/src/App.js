import logo from './logo.svg';
import './App.css';
import React from "react"
import { Routes , Route} from "react-router-dom"
//components
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        
        {/* home page */}
        <Route
          path = "/"
          element = {<Home/>}
        />



      </Routes>
    </div>
  );
}

export default App;

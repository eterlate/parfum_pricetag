import React from 'react'
import { userRoutes } from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { PrintContext } from './context/PrintContext';

function App() {
  const routes = userRoutes()
  return (

        <Router>
          <div>
            {routes}
          </div>
        </Router>

  

  )
}

export default App

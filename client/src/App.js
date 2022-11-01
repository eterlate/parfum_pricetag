import React from 'react'
import { userRoutes } from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

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

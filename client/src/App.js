import React from 'react'
import { userRoutes } from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import {CookiesProvider} from 'react-cookie'


function App() {
  const routes = userRoutes()
  return (
      <CookiesProvider>
        <Router>
          <div>
            {routes}
          </div>
        </Router>
      </CookiesProvider>
  

  )
}

export default App

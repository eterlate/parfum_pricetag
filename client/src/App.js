import React from 'react'
import { userRoutes } from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from 'react-cookie'
import Header from './components/Header';


function App() {
  const routes = userRoutes()
  return (
    <CookiesProvider>

      <Router>
        <div>
          <Header />
          {routes}
        </div>
      </Router>
    </CookiesProvider>


  )
}

export default App

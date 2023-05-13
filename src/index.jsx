import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './firebase.js'
import 'bootswatch/dist/superhero/bootstrap.min.css'
import './estilos/main.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


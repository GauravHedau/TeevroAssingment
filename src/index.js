import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar.js';


ReactDOM.render(
  <React.StrictMode>
    <Navigation />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);




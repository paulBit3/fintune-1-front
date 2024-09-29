import React from 'react';
import ReactDOM from 'react-dom/client';
//import { CookiesProvider } from 'react-cookie';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import '../node_modules/flowbite/dist/flowbite.min.js'

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



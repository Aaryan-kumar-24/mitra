import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter } from 'react-router-dom';
import Pg from './pg_card';
import { Pg_card_details } from './Pg_card_details';
import { RouterProvider } from 'react-router-dom';

let allroutes= createBrowserRouter([
{path: '/', element:<Pg/>},
{path: '/:id', element:<Pg_card_details/>},



])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={allroutes}/>
    <App />
  </React.StrictMode>
);

reportWebVitals();

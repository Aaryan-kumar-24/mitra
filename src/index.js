import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter } from 'react-router-dom';
import Pg from './pg_card';
import { Pg_card_details } from './Pg_card_details';
import { RouterProvider } from 'react-router-dom';
import { Shops } from './shops';
import { Header } from './header';
import { Notes } from './notex';
import { Footer } from './footer';
import { Skills } from './skills';
import { Home } from './home';
import { Accounts } from './accounts';


let allroutes= createBrowserRouter([
{path: '/pg', element:<Pg/>},
{path: '/pg/:id', element:<Pg_card_details/>},
{path: '/shops', element:<Shops/>},
{path: '/header', element:<Header/>},
{path: '/Accounts', element:<Accounts/>},
{path: '/Notes', element:<Notes/>},
{path: '/Footer', element:<Footer/>},
{path: '/Skills', element:<Skills/>},
{path: '/', element:<Home/>},


])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={allroutes}/>
    <App />
  </React.StrictMode>
);

reportWebVitals();

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

// Import all required components
import Pg from './pg_card';
import { Pg_card_details } from './Pg_card_details';
import { Shops } from './shops';
import { Notes } from './notex';
import { Skills } from './skills';
import { Home } from './home';
import { Accounts } from './accounts';
import Login_signup from './login_signup';
import { Skill_Details } from './skills_details';
// 👇 Import the AuthProvider
import { AuthProvider } from './AuthContext'; 

import ChatSystem from "./ChatSystem";

// NOTE: Components like Header and Footer should be rendered within App.jsx
//       using React Router's Outlet, not defined as individual top-level routes.

let allroutes = createBrowserRouter([
  {
    // Define the main layout route using App as the element
    path: '/',
    element: <App />, 
    children: [
      {path: '/', element:<Home/>}, // Default Home route
      {path: '/pg', element:<Pg/>},
      {path: '/pg/:id', element:<Pg_card_details/>},
      {path: '/shops', element:<Shops/>},
      {path: '/Notes', element:<Notes/>},
      {path: '/Skills', element:<Skills/>},
      {path: '/skill_details', element:<Skill_Details/>},
      { path: "/skill_details/:skillName", element: <Skill_Details /> },
        { path: "/chat", element: <ChatSystem /> }
    ]
  },
  // Place routes that should NOT include the Header/Footer layout here
  {path: '/Login_signup', element:<Login_signup/>},
  {path: '/Accounts', element:<Accounts/>}, 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 👇 Wrap the entire application routing in AuthProvider */}
    <AuthProvider>
      <RouterProvider router={allroutes}/>
    </AuthProvider>
    {/* ❌ REMOVED: The separate <App /> rendering. It is handled by the router now. */}
  </React.StrictMode>
);

reportWebVitals();
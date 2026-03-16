// src/App.jsx (Example structure for the layout to work)
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <main className="content">
        {/* The Outlet renders the component for the current route path (Home, Pg, Shops, etc.) */}
        <Outlet /> 
      </main>
      
    </>
  );
}

export default App;
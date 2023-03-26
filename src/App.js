import { createContext, useEffect, useState } from 'react';
import './App.css';
import AllUsers from './components/AllUsers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import NavbarNav from './components/Navbar';

const data = createContext();

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  var Url = `https://api.github.com/users`;

  const getUserData = async () => {
    const response = await fetch(Url);
    const jsonData = await response.json();
    setUsers(jsonData)
  };

  return (
    <data.Provider value={users}>
      <div className="App">
        <Router>
          <NavbarNav />
          <Routes>
            <Route path='/user/:login' element={<UserDetails />} />
            <Route path='/' element={<AllUsers />} />
          </Routes>
        </Router>
      </div>
    </data.Provider>
  );
}

export default App;
export { data };

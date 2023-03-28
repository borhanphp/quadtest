import { createContext, useEffect, useState } from 'react';
import './App.css';
import AllUsers from './components/AllUsers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetails from './components/UserDetails';
import NavbarNav from './components/Navbar';

const data = createContext();
const ThemeContext = createContext(null);

function App() {

  const [users, setUsers] = useState([]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    getUserData();
  }, []);

  var Url = `https://api.github.com/users`;

  const getUserData = async () => {
    const response = await fetch(Url);
    const jsonData = await response.json();
    setUsers(jsonData)
  };

  // switching from one mode to another
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'));
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <data.Provider value={users}>
        <div className="App" id={theme}>
          <Router>
            <NavbarNav />
            <Routes>
              <Route path='/user/:login' element={<UserDetails />} />
              <Route path='/' element={<AllUsers />} />
            </Routes>
          </Router>
        </div>
      </data.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
export { data, ThemeContext };

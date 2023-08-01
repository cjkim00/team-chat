import './App.css';

import Home from "./page/Home"
import Registration from './page/Register';
import Login from './page/Login'
import MainPage from './page/MainPage'

import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <section>
            <Routes>                                                                       
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<MainPage />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </section>
        </div>
      </Router>
    </div>
  );
}

export default App;

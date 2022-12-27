
import {BrowserRouter as Router,Route,Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { UserProfile } from './Components';
import Login from './Components/Login';
import Home from './Container/Home';
import Context2 from './Context hook/Context2';

function App() {
  return ( 
  <><Context2>

    <Router>
<Routes>
<Route  path="login" element={<Login/>}/>
<Route  path="/*" element={<Home/>}/>


</Routes>
    <div className="text-3xl font-bold underline">
      
    </div>
    </Router>
  </Context2>
  </>
  );
}

export default App;

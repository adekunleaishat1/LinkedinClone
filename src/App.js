
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Dash from './component/Dash';
import Signup from './component/Signup';
import Login from './component/Login';
import Preloader from './component/Preloader';


function App() {


  return (
    <div>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/app' element={<Dash/>}/>
      <Route path='/preload' element={<Preloader/>}/>
    </Routes>
    </div>
  );
}

export default App;

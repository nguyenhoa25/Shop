
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutPage from './layout/LayoutPage';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutPage></LayoutPage>}>
        <Route path='/' element={<HomePage></HomePage>}/>
        </Route>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/signup' element={<SignUp></SignUp>}/>
      </Routes>
    </div>
  );
}

export default App;

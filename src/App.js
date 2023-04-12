import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutPage from './layout/LayoutPage';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCart from './pages/ShoppingCart';
import CheckOut from './pages/CheckOut';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Admin from './admin/Admin';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutPage></LayoutPage>}>
          <Route path='/' element={<HomePage></HomePage>}/>
          <Route path='/shop' element={<ShopPage></ShopPage>}/>
          <Route path='product/:slug' element={<ProductDetailPage></ProductDetailPage>}/>
          <Route path='/cart' element={<ShoppingCart></ShoppingCart>}/>
          <Route path='/checkout' element={<CheckOut></CheckOut>}/>
        </Route>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/signup' element={<SignUp></SignUp>}/>
        <Route path='/admin' element= {<Admin></Admin>}/>
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
      </Routes>
    </div>
  );
}

export default App;

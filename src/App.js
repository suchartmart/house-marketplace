import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
   <Router>
    <Routes>
      <Route path='/' element={<Explore/>} />
      <Route path='/offers' element={<Offers/>} />
      <Route path='/Profile' element={<Profile/>} />
      <Route path='/Sign-In' element={<SignIn/>} />
      <Route path='/Sign-Up' element={<SignUp/>} />
      <Route path='/Forgot-password' element={<ForgotPassword/>} />
    </Routes>
    <Navbar/>
   </Router>
   <ToastContainer/>
    </>
  );
}

export default App;

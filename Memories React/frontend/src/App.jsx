import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

function App() {

  return (
    <div className='app'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rt1={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Navbar/>
      <div className="container">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default App;

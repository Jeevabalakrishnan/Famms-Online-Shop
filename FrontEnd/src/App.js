import Famms from './user/Famms';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="App">
     <Famms/>
     <ToastContainer />
    </div>
  );
}

export default App;

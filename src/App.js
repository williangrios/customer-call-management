import AuthProvider from './contexts/auth';
import {BrowserRouter, Route} from 'react-router-dom';
import Routes from './routes'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000}/>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

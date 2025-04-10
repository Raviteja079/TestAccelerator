import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <AuthRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;

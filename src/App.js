import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TestCardDnD from "./components/TestCardDnD/TestCardDnD";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
    <Router>
      <MainRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
    </AuthProvider>
  );
}

export default App;

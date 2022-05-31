import { BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import './components/style/app.css'



function App() {
  return (
    <div className="container">
    <BrowserRouter>
    <AuthProvider>
    <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="" element={<Navigate to="/login" />} />
    </Routes>
    </AuthProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;

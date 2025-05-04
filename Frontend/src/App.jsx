import "./App.css";
import Auth from "./pages/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProtectedRoute from "./components/auth/authRoute";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Router>
        <Routes>
          <Route path="/" Component={Auth} />
          <Route Component={ProtectedRoute}>
            <Route path="/home" Component={Home} />
            <Route path="/login" Component={Auth} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

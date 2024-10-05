import { LandingPage } from "./pages/LandingPage";
import "./styles.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

// Landing Page 2
const LandingPage2 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Landing Page 2</h1>
      <button onClick={() => navigate("/page3")}>Go to Page 3</button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/page2" element={<LandingPage2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

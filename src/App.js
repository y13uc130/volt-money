import { LandingPage } from "./pages/LandingPage";
import { LoanOffersPage } from "./pages/LoanOffersPage";

import "./styles.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loan-offers" element={<LoanOffersPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

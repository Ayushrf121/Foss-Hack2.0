import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from "./components/common/Header";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import LoginPage from './components/LoginWeb/LoginPage.jsx';
import Footer from "./components/common/Footer";
import Report from "./pages/Report";
import Response from "./pages/Response.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import DataSecurity from "./pages/DataSecurity.jsx";
import History from "./pages/History.jsx";

const App = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {login ? <LoginPage setLogin={setLogin} /> : <></>}
      <div className="min-h-screen bg-gray-50">
        <ToastContainer />
        <Header setLogin={setLogin} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/response" element={<Response />} />
            <Route path="/history" element={<History />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/services" element={<Terms />} />
            <Route path="/dataSecurity" element={<DataSecurity />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
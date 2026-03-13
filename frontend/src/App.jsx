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
const History = () => <div className="p-8 text-xl">History Page Content</div>;

const App = () => {
  const [login,setLogin] = useState(false);
  useEffect(() => {
    AOS.init()
  }, []);
  return (
    <>
    {
      login ? <LoginPage setLogin = {setLogin}/>:
      <></>
    }
      <div className="min-h-screen bg-gray-50">
        <ToastContainer/>
        <Header setLogin = {setLogin}/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;

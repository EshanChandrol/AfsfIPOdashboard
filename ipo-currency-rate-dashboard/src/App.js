// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './component/Registration';
import Login from './component/Login';
import Home from './component/Home';
import Layout from './component/Layout';
import CurrencyExchangeRates from './component/CurrencyExchangeRates';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<CurrencyExchangeRates />} />
          <Route path="/upcomingIPOs" element={<Home />} />
          {/* <Route path="" element={<test />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;



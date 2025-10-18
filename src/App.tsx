import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';
import DonationPage from './pages/DonationPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import NetworkPage from './pages/NetworkPage';
import NumeroPage from './pages/NumeroPage';
import MontantPage from './pages/MontantPage';
import PresentationPage from './pages/PresentationPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelPage from './pages/PaymentCancelPage';
import ApiTestPage from './pages/ApiTestPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main>
                <HomePage />
              </main>
            </>
          } />
          <Route path="/campaign" element={
            <>
              <Header />
              <main>
                <CampaignPage />
              </main>
            </>
          } />
          <Route path="/donation" element={
            <>
              <Header />
              <main>
                <DonationPage />
              </main>
            </>
          } />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/numero" element={<NumeroPage />} />
          <Route path="/montant" element={<MontantPage />} />
          <Route path="/presentation" element={<PresentationPage />} />
          <Route path="/payment" element={
            <>
              <Header />
              <main>
                <PaymentPage />
              </main>
            </>
          } />
          <Route path="/success" element={
            <>
              <Header />
              <main>
                <SuccessPage />
              </main>
            </>
          } />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-cancel" element={<PaymentCancelPage />} />
          <Route path="/api-test" element={
            <>
              <Header />
              <main>
                <ApiTestPage />
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

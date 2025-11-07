import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';
import Builder from './pages/Builder';
import './App.css';

function App() {
  return (
    <PortfolioProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </PortfolioProvider>
  );
}

export default App;
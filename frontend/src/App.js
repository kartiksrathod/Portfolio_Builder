import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';
import NewBuilder from './pages/NewBuilder';
import TemplatesGallery from './pages/TemplatesGallery';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/builder" element={<NewBuilder />} />
              <Route path="/templates" element={<TemplatesGallery />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
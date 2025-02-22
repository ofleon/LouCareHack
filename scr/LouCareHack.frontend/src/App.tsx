import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Request from './pages/request';
import { Toaster } from "@/components/ui/toaster";
import { CaseProvider } from './context/CaseContext';

function App() {
  return (
    <CaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<Request />} />
        </Routes>
        <Toaster />
      </Router>
    </CaseProvider>
  );
}

export default App;

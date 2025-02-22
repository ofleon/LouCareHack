import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Request from './pages/request';
import { Toaster } from "@/components/ui/toaster";
import { CaseProvider } from './context/CaseContext';
import Main from './pages/Main';

function App() {
  return (
    <CaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/index" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<Request />} />
        </Routes>
        <Toaster />
      </Router>
    </CaseProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Request from './pages/request';
import InventoryList from './pages/InventoryList';
import { Toaster } from "@/components/ui/toaster";
import { CaseProvider } from './context/CaseContext';
import Main from './pages/Main';
import RequestDashboard from './pages/requestDashbaord';
import MatchedHousing from './pages/MatchedHousing';
import AutoMatched from './pages/AutoMatched';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/index",
    element: <Index />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/requestdashboard",
    element: <RequestDashboard />,
  },
  {
    path: "/request",
    element: <Request />,
  },
  {
    path: "/inventory",
    element: <InventoryList />,
  },
  {
    path: "/matched-housing",
    element: <MatchedHousing />,
  },
  {
    path: "/auto-matched",
    element: <AutoMatched />,
  },
]);

function App() {
  return (
    <CaseProvider>
      <RouterProvider router={router} />
      <Toaster />
    </CaseProvider>
  );
}

export default App;

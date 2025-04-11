import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import ServiceDetail from './pages/ServiceDetail.tsx';
import HowAIHelps from './pages/HowAIHelps.tsx';
import Admin from './pages/Admin.tsx';
import WebsiteAdmin from './pages/WebsiteAdmin.tsx';

// ScrollToTop component to handle scrolling to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/service/:serviceId" element={<ServiceDetail />} />
        <Route path="/how-ai-helps" element={<HowAIHelps />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/website" element={<WebsiteAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}
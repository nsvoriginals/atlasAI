import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { UserProvider } from './context/UserContext';
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Lazy-loaded components
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/ADashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const AtsPage = lazy(() => import("./pages/AtsPage"));
const InterviewQuestionsPage = lazy(() => import("./pages/InterviewQuestionsPage"));
const ResumeGen = lazy(() => import("./pages/ResumeGen"));
const GeneratorPage = lazy(() => import("./pages/Generate"));

// Component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
);

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <main className="m-0 p-0 box-border flex items-center justify-center font-satoshi">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/user/ats" element={<AtsPage />} />
              <Route path="/interview-questions" element={<InterviewQuestionsPage />} />
              <Route 
                path="/user/profile" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/resume" element={<ResumeGen />} />
              <Route path="/generator" element={<GeneratorPage />} />
              <Route path="/auth/signup" element={<Register />} />
              <Route path="/auth/signin" element={<Login />} />
              <Route 
                path="*" 
                element={
                  <div className="text-center text-3xl mt-20">
                    404 - Page Not Found
                  </div>
                } 
              />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </UserProvider>
  );
}
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner"; // Create a spinner for fallback

// Lazy-loaded components
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Templates = lazy(() => import("./pages/Templates"));
const Editor = lazy(() => import("./pages/Editor"));
const Index = lazy(() => import("./pages/Index"));
const ResumeOne = lazy(() => import("./ResumeOne"));
const ResumeTwo = lazy(() => import("./ResumeTwo"));
const ProfileSettings = lazy(() => import("./pages/settings/ProfileSettings"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const OtpVerification = lazy(() => import("./pages/auth/OtpVerification"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
const AppContent = () => {
  const location = useLocation();

  // Define routes where the Navbar should not appear
  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/otp-verification",
  ];

  return (
    <>
      {!authRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/templates" element={<Templates />} />
        <Route path="/templates-one" element={<ResumeOne />} />
        <Route path="/templates-two" element={<ResumeTwo />} />
        <Route path="/editor/:templateId" element={<Editor />} />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <AppContent />
          </Suspense>
        </BrowserRouter>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

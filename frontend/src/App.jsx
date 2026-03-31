// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import Risk from "./pages/Risk";
// import RiskPrediction from "./pages/RiskPrediction";
// import Weather from "./pages/Weather";
// import ImageUpload from "./pages/ImageUpload";
// import SendEmail from "./pages/SendEmail";
// import Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <div className="layout">
//         <Sidebar />
        
//         <div className="content">
//           <Routes>


//   {/* LOGIN PAGE */}
//   <Route path="/login" element={<Login />} />

//   {/* PROTECTED ROUTES */}
//   <Route path="/" element={
//     <ProtectedRoute>
//       <Dashboard />
//     </ProtectedRoute>
//   } />

//   <Route path="/risk" element={
//     <ProtectedRoute>
//       <Risk />
//     </ProtectedRoute>
//   } />

//   <Route path="/predict" element={
//     <ProtectedRoute>
//       <RiskPrediction />
//     </ProtectedRoute>
//   } />

//   <Route path="/weather" element={
//     <ProtectedRoute>
//       <Weather />
//     </ProtectedRoute>
//   } />

//   <Route path="/upload" element={
//     <ProtectedRoute>
//       <ImageUpload />
//     </ProtectedRoute>
//   } />

//             <Route path="/" element={<Dashboard />} />
//             <Route path="/risk" element={<Risk />} />
//             <Route path="/predict" element={<RiskPrediction />} />
//             <Route path="/weather" element={<Weather />} />
//             <Route path="/upload" element={<ImageUpload />} /> {/* ✅ THIS IS CORRECT */}
//             <Route path="/email" element={<SendEmail />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </div>

//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Login from "./pages/Login";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import Risk from "./pages/Risk";
// import Weather from "./pages/Weather";
// import Upload from "./pages/Upload";

// function Layout() {
//   const location = useLocation();

//   const isLoggedIn = localStorage.getItem("isLoggedIn");

//   return (
//     <div>
//       {/* ✅ SHOW SIDEBAR ONLY IF LOGGED IN */}
//       {isLoggedIn && location.pathname !== "/login" && <Sidebar />}

//       {/* MAIN CONTENT */}
//       <div style={{ marginLeft: isLoggedIn ? "220px" : "0", padding: "20px" }}>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/risk" element={<Risk />} />
//           <Route path="/weather" element={<Weather />} />
//           <Route path="/upload" element={<Upload />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Weather from "./pages/Weather";
import Risk from "./pages/Risk";
import Upload from "./pages/Upload";
import SaaSLayout from "./components/SaaSLayout";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(17,24,39,0.9)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              borderRadius: "16px",
              boxShadow: "0 20px 70px rgba(0,0,0,0.35)",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <SaaSLayout>
                  <Dashboard />
                </SaaSLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <SaaSLayout>
                  <Weather />
                </SaaSLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/risk"
            element={
              <ProtectedRoute>
                <SaaSLayout>
                  <Risk />
                </SaaSLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <SaaSLayout>
                  <Upload />
                </SaaSLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

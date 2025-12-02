import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/toaster";
import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardWrapper from "./pages/DashboardWrapper";
import Personal from "./pages/Personal";
import Solicitudes from "./pages/Solicitudes";
import Mantenimiento from "./pages/Mantenimiento";
import NuevaSolicitud from "./pages/NuevaSolicitud";
import RegistrarBien from "./pages/RegistrarBien";
import EditarBien from "./pages/EditarBien";
import RegistrarPersonal from "./pages/RegistrarPersonal";
import EditarPersonal from "./pages/EditarPersonal";
import Bienes from "./pages/Bienes";
import MisDatos from "./pages/MisDatos";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/" element={<DashboardLayout />}>
              <Route path="dashboard" element={<DashboardWrapper />} />
              <Route path="bienes" element={<Bienes />} />
              <Route path="bienes/registrar" element={<RegistrarBien />} />
              <Route path="bienes/editar/:id" element={<EditarBien />} />
              <Route path="personal" element={<Personal />} />
              <Route path="personal/registrar" element={<RegistrarPersonal />} />
              <Route path="personal/editar/:id" element={<EditarPersonal />} />
              <Route path="solicitudes" element={<Solicitudes />} />
              <Route path="solicitudes/nueva" element={<NuevaSolicitud />} />
              <Route path="mantenimiento" element={<Mantenimiento />} />
              <Route path="reportes" element={<DashboardWrapper />} />
              <Route path="configuracion" element={<MisDatos />} />
            </Route>
          </Routes>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

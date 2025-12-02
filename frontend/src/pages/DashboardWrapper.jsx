import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from './Dashboard';
import DashboardPersonal from './DashboardPersonal';

const DashboardWrapper = () => {
  const { user } = useAuth();

  // Si es funcionario, mostrar el dashboard personalizado
  if (user?.rol === 'Funcionario') {
    return <DashboardPersonal />;
  }

  // Para Administrador y Jefe de Activos, mostrar el dashboard completo
  return <Dashboard />;
};

export default DashboardWrapper;

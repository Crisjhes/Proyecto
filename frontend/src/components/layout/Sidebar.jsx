import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  Settings,
  Wrench,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

const allMenuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    roles: ['Administrador', 'Jefe de Activos', 'Funcionario'],
  },
  {
    title: 'Bienes',
    icon: Package,
    path: '/bienes',
    roles: ['Administrador', 'Jefe de Activos'],
  },
  {
    title: 'Personal',
    icon: Users,
    path: '/personal',
    roles: ['Administrador', 'Jefe de Activos'],
  },
  {
    title: 'Solicitudes',
    icon: FileText,
    path: '/solicitudes',
    roles: ['Administrador', 'Jefe de Activos'],
  },
  {
    title: 'Mantenimiento',
    icon: Wrench,
    path: '/mantenimiento',
    roles: ['Administrador', 'Jefe de Activos'],
  },
  {
    title: 'Reportes',
    icon: BarChart3,
    path: '/reportes',
    roles: ['Administrador', 'Jefe de Activos'],
  },
  {
    title: 'Configuración',
    icon: Settings,
    path: '/configuracion',
    roles: ['Administrador', 'Jefe de Activos', 'Funcionario'],
  },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user } = useAuth();
  
  // Filtrar menú según el rol del usuario
  const menuItems = allMenuItems.filter((item) => 
    item.roles.includes(user?.rol)
  );
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo y Título */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#003087] to-[#00B1EB] rounded-lg flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h2 className="text-lg font-bold text-[#003087] dark:text-white truncate">
                  ADECINE
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Sistema de Gestión</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft
              className={cn(
                'w-5 h-5 text-gray-500 transition-transform',
                collapsed && 'rotate-180'
              )}
            />
          </button>
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                      isActive
                        ? 'bg-gradient-to-r from-[#003087] to-[#00B1EB] text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#003087] dark:hover:text-[#00B1EB]'
                    )
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium truncate">{item.title}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer con versión */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Versión 1.0.0
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { User, Mail, Building, Shield, Key } from 'lucide-react';

const MisDatos = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const getInitials = () => {
    return `${user.nombres.charAt(0)}${user.apellidos.charAt(0)}`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Datos</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Información personal y credenciales de acceso
        </p>
      </div>

      {/* Perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
            Perfil de Usuario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.foto} alt={user.nombres} />
              <AvatarFallback className="bg-gradient-to-br from-[#003087] to-[#00B1EB] text-white text-3xl font-bold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {user.nombres} {user.apellidos}
              </h2>
              <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                {user.rol}
              </Badge>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Building className="w-5 h-5 text-gray-400" />
                  <span>{user.departamento}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <User className="w-5 h-5 text-gray-400" />
                  <span>CI: {user.ci} {user.expedido}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de Acceso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
            Información de Acceso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Usuario
                </label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-mono font-medium">{user.username}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Contraseña
                </label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Key className="w-4 h-4 text-gray-400" />
                  <span className="font-mono">••••••••</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Nota:</strong> Si necesitas cambiar tu contraseña o actualizar tus datos, contacta al administrador del sistema.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permisos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
            Permisos del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {user.rol === 'Administrador' && (
              <>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Acceso total al sistema</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Gestión de usuarios</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Gestión de bienes y personal</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Aprobación de solicitudes</span>
                </div>
              </>
            )}
            
            {user.rol === 'Jefe de Activos' && (
              <>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Gestión de bienes</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Aprobación de solicitudes</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Gestión de mantenimientos</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Generación de reportes</span>
                </div>
              </>
            )}
            
            {user.rol === 'Funcionario' && (
              <>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Ver mis datos personales</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Crear solicitudes de bienes</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Ver estado de mis solicitudes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Gestión de bienes (solo lectura)</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MisDatos;

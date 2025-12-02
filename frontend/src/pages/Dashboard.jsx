import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Package,
  Users,
  FileText,
  TrendingUp,
  Plus,
  ArrowRight,
  Activity,
  Shield,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  mockEstadisticas,
  mockGraficoBienesPorEstado,
  mockSolicitudes,
  mockActividadReciente,
  mockUsers,
} from '../mock/mockData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showPasswords, setShowPasswords] = React.useState({});

  const stats = [
    {
      title: 'Total Bienes Registrados',
      value: mockEstadisticas.totalBienes,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Bienes en Préstamo',
      value: mockEstadisticas.bienesEnPrestamo,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Solicitudes Pendientes',
      value: mockEstadisticas.solicitudesPendientes,
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      textColor: 'text-orange-600 dark:text-orange-400',
      badge: mockEstadisticas.solicitudesPendientes > 0,
    },
    {
      title: 'Personal Activo',
      value: mockEstadisticas.personalActivo,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  const getEstadoBadge = (estado) => {
    const variants = {
      Pendiente: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
      Aprobada: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
      Rechazada: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
    };
    return variants[estado] || 'bg-gray-100 text-gray-700';
  };

  const getPrioridadBadge = (prioridad) => {
    const variants = {
      Alta: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
      Media: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400',
      Baja: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
    };
    return variants[prioridad] || 'bg-gray-100 text-gray-700';
  };

  const getRolBadge = (rol) => {
    const variants = {
      Administrador: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
      'Jefe de Activos': 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
      Funcionario: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
    };
    return variants[rol] || 'bg-gray-100 text-gray-700';
  };

  const togglePasswordVisibility = (userId) => {
    setShowPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bienvenido/a, {user?.nombres}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {user?.rol === 'Funcionario' 
              ? 'Panel de control - Gestión de solicitudes'
              : 'Resumen general del sistema de gestión de bienes institucionales'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => navigate('/solicitudes/nueva')}
            className="bg-gradient-to-r from-[#003087] to-[#00B1EB] hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Solicitud
          </Button>
          {(user?.rol === 'Administrador' || user?.rol === 'Jefe de Activos') && (
            <>
              <Button
                onClick={() => navigate('/bienes/registrar')}
                variant="outline"
                className="border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white dark:border-[#00B1EB] dark:text-[#00B1EB] dark:hover:bg-[#00B1EB] dark:hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Registrar Bien
              </Button>
              <Button
                onClick={() => navigate('/personal/registrar')}
                variant="outline"
                className="border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white dark:border-[#00B1EB] dark:text-[#00B1EB] dark:hover:bg-[#00B1EB] dark:hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Registrar Personal
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </h3>
                    {stat.badge && (
                      <Badge variant="destructive" className="text-xs">
                        Nuevo
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico y Solicitudes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estado de Bienes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
              Estado de Bienes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockGraficoBienesPorEstado.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {item.estado}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {item.cantidad}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(item.cantidad / mockEstadisticas.totalBienes) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Últimas Solicitudes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
                Solicitudes Recientes
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/solicitudes')}
                className="text-[#003087] dark:text-[#00B1EB] hover:bg-blue-50 dark:hover:bg-gray-800"
              >
                Ver todas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSolicitudes.slice(0, 3).map((solicitud) => (
                <div
                  key={solicitud.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/solicitudes/${solicitud.id}`)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {solicitud.nombre_solicitante}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {solicitud.cargo} - {solicitud.departamento}
                      </p>
                    </div>
                    <Badge className={getPrioridadBadge(solicitud.prioridad)}>
                      {solicitud.prioridad}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {solicitud.activo_solicitado}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(solicitud.fecha_solicitud).toLocaleDateString('es-BO')}
                    </span>
                    <Badge className={getEstadoBadge(solicitud.estado)}>
                      {solicitud.estado}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actividad Reciente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActividadReciente.map((actividad) => (
              <div key={actividad.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                <div className="w-2 h-2 bg-[#00B1EB] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {actividad.descripcion}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {actividad.usuario}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(actividad.fecha).toLocaleString('es-BO')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usuarios del Sistema - Solo visible para Administrador */}
      {user?.rol === 'Administrador' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
              Usuarios del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Nombre Completo</TableHead>
                    <TableHead>CI</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Contraseña Hash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={usuario.foto}
                            alt={usuario.username}
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="font-mono font-medium">{usuario.username}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {usuario.nombres} {usuario.apellidos}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">
                          {usuario.ci} {usuario.expedido}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{usuario.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{usuario.departamento}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRolBadge(usuario.rol)}>{usuario.rol}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                            {showPasswords[usuario.id]
                              ? usuario.password
                              : usuario.passwordHash}
                          </code>
                          <button
                            onClick={() => togglePasswordVisibility(usuario.id)}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            title={showPasswords[usuario.id] ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                          >
                            {showPasswords[usuario.id] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-900">
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                <strong>Seguridad:</strong> Las contraseñas se muestran hasheadas por defecto. Haz clic en el ícono del ojo para ver la contraseña original (solo para administración).
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
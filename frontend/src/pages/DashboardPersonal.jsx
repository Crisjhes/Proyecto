import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  User,
  Package,
  FileText,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Building,
  Mail,
  Calendar,
} from 'lucide-react';
import {
  mockActivos,
  mockAsignaciones,
  mockSolicitudes,
  mockPersonal,
} from '../mock/mockData';

const DashboardPersonal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Obtener datos del personal actual
  const personalData = mockPersonal.find((p) => p.email === user?.email);

  // Obtener bienes asignados al personal
  const misAsignaciones = mockAsignaciones.filter(
    (a) => a.nombre_personal === `${user?.nombres} ${user?.apellidos}` && a.estado === 'Activa'
  );

  const misBienes = mockActivos.filter((activo) =>
    misAsignaciones.some((asig) => asig.id_activo === activo.id)
  );

  // Obtener solicitudes del personal
  const misSolicitudes = mockSolicitudes.filter(
    (s) => s.nombre_solicitante === `${user?.nombres} ${user?.apellidos}`
  );

  const solicitudesPendientes = misSolicitudes.filter((s) => s.estado === 'Pendiente').length;
  const solicitudesAprobadas = misSolicitudes.filter((s) => s.estado === 'Aprobada').length;

  const getInitials = () => {
    if (!user) return 'U';
    return `${user.nombres.charAt(0)}${user.apellidos.charAt(0)}`;
  };

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

  return (
    <div className="space-y-6">
      {/* Encabezado personalizado */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#003087] via-[#00246b] to-[#00B1EB] p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white/20">
              <AvatarImage src={user?.foto} alt={user?.nombres} />
              <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                Bienvenido/a, {user?.nombres} {user?.apellidos}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>{user?.departamento}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{personalData?.cargo || user?.rol}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate('/solicitudes/nueva')}
              className="bg-white text-[#003087] hover:bg-white/90 font-semibold shadow-lg"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nueva Solicitud
            </Button>
          </div>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bienes Asignados</p>
                <p className="text-4xl font-bold text-[#003087] dark:text-[#00B1EB] mt-2">
                  {misBienes.length}
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl">
                <Package className="w-8 h-8 text-[#003087] dark:text-[#00B1EB]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Solicitudes Pendientes</p>
                <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                  {solicitudesPendientes}
                </p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-xl">
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Solicitudes Aprobadas</p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {solicitudesAprobadas}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mis Bienes Asignados */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
              Mis Bienes Asignados
            </CardTitle>
            {misBienes.length > 0 && (
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                {misBienes.length} {misBienes.length === 1 ? 'activo' : 'activos'}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {misBienes.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Fecha Asignación</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {misBienes.map((bien) => {
                    const asignacion = misAsignaciones.find((a) => a.id_activo === bien.id);
                    return (
                      <TableRow key={bien.id}>
                        <TableCell>
                          <span className="font-mono font-medium">{bien.codigo}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {bien.foto && (
                              <img
                                src={bien.foto}
                                alt={bien.descripcion}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <span className="font-medium">{bien.descripcion}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{bien.categoria}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(asignacion?.fecha_asignacion).toLocaleDateString('es-BO')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                            Asignado
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No tienes bienes asignados actualmente
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Puedes solicitar bienes a través del botón "Nueva Solicitud"
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mis Solicitudes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
              Mis Solicitudes
            </CardTitle>
            {misSolicitudes.length > 3 && (
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                {misSolicitudes.length} total
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {misSolicitudes.length > 0 ? (
            <div className="space-y-4">
              {misSolicitudes.slice(0, 5).map((solicitud) => (
                <div
                  key={solicitud.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {solicitud.activo_solicitado}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {solicitud.descripcion}
                      </p>
                    </div>
                    <Badge className={getPrioridadBadge(solicitud.prioridad)}>
                      {solicitud.prioridad}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(solicitud.fecha_solicitud).toLocaleDateString('es-BO')}
                      </span>
                      <Badge variant="outline">{solicitud.tipo_solicitud}</Badge>
                    </div>
                    <Badge className={getEstadoBadge(solicitud.estado)}>
                      {solicitud.estado === 'Pendiente' && <Clock className="w-3 h-3 mr-1" />}
                      {solicitud.estado === 'Aprobada' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {solicitud.estado === 'Rechazada' && <XCircle className="w-3 h-3 mr-1" />}
                      {solicitud.estado}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No tienes solicitudes registradas</p>
              <Button
                onClick={() => navigate('/solicitudes/nueva')}
                className="mt-4 bg-gradient-to-r from-[#003087] to-[#00B1EB] hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear mi primera solicitud
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Información de contacto y soporte */}
      <Card className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200 dark:border-blue-900">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
              <Building className="w-6 h-6 text-[#003087] dark:text-[#00B1EB]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ¿Necesitas ayuda?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Para consultas sobre tus activos asignados o el estado de tus solicitudes, contacta al área de Activos Fijos.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  📧 activos@adecine.gob.bo
                </Badge>
                <Badge className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  📞 Interno: 201
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPersonal;

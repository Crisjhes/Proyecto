import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Plus, Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { mockSolicitudes } from '../mock/mockData';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const Solicitudes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [solicitudes, setSolicitudes] = useState(mockSolicitudes);

  // Redirigir a funcionarios al dashboard
  React.useEffect(() => {
    if (user?.rol === 'Funcionario') {
      toast({
        title: 'Acceso restringido',
        description: 'Los funcionarios no tienen acceso a esta sección. Puedes ver tus solicitudes en el Dashboard.',
        variant: 'destructive',
      });
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const filteredSolicitudes = solicitudes.filter((s) => {
    const matchSearch =
      s.nombre_solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.activo_solicitado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.departamento.toLowerCase().includes(searchTerm.toLowerCase());

    const matchEstado = filterEstado === 'todos' || s.estado === filterEstado;

    return matchSearch && matchEstado;
  });

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

  const handleAprobar = (solicitud) => {
    if (user?.rol !== 'Jefe de Activos' && user?.rol !== 'Administrador') {
      toast({
        title: 'Acceso denegado',
        description: 'No tienes permisos para aprobar solicitudes',
        variant: 'destructive',
      });
      return;
    }

    const mensaje = `¿Estás seguro de aprobar la solicitud de ${solicitud.nombre_solicitante}?\n\nActivo: ${solicitud.activo_solicitado}\nTipo: ${solicitud.tipo_solicitud}`;
    
    if (window.confirm(mensaje)) {
      setSolicitudes(
        solicitudes.map((s) => (s.id === solicitud.id ? { ...s, estado: 'Aprobada' } : s))
      );
      toast({
        title: '✅ Solicitud aprobada',
        description: `La solicitud de ${solicitud.nombre_solicitante} ha sido aprobada exitosamente`,
      });
    }
  };

  const handleRechazar = (solicitud) => {
    if (user?.rol !== 'Jefe de Activos' && user?.rol !== 'Administrador') {
      toast({
        title: 'Acceso denegado',
        description: 'No tienes permisos para rechazar solicitudes',
        variant: 'destructive',
      });
      return;
    }

    const motivo = window.prompt(`Motivo del rechazo de la solicitud de ${solicitud.nombre_solicitante}:`);
    
    if (motivo !== null && motivo.trim() !== '') {
      setSolicitudes(
        solicitudes.map((s) => (s.id === solicitud.id ? { ...s, estado: 'Rechazada', motivo_rechazo: motivo } : s))
      );
      toast({
        title: '❌ Solicitud rechazada',
        description: `La solicitud de ${solicitud.nombre_solicitante} ha sido rechazada`,
        variant: 'destructive',
      });
    } else if (motivo !== null) {
      toast({
        title: 'Acción cancelada',
        description: 'Debes proporcionar un motivo para rechazar la solicitud',
        variant: 'destructive',
      });
    }
  };

  const stats = {
    total: solicitudes.length,
    pendientes: solicitudes.filter((s) => s.estado === 'Pendiente').length,
    aprobadas: solicitudes.filter((s) => s.estado === 'Aprobada').length,
    rechazadas: solicitudes.filter((s) => s.estado === 'Rechazada').length,
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Solicitudes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestión de solicitudes de préstamo y asignación de bienes
          </p>
        </div>
        <Button
          onClick={() => navigate('/solicitudes/nueva')}
          className="bg-gradient-to-r from-[#003087] to-[#00B1EB] hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.total}
                </p>
              </div>
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                  {stats.pendientes}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Aprobadas</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {stats.aprobadas}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rechazadas</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
                  {stats.rechazadas}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar solicitudes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Aprobada">Aprobada</SelectItem>
                <SelectItem value="Rechazada">Rechazada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de solicitudes */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Solicitudes ({filteredSolicitudes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Activo/Descripción</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSolicitudes.map((solicitud) => (
                  <TableRow key={solicitud.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {solicitud.nombre_solicitante}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {solicitud.cargo} - {solicitud.departamento}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{solicitud.tipo_solicitud}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{solicitud.activo_solicitado}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {solicitud.descripcion}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(solicitud.fecha_solicitud).toLocaleDateString('es-BO')}
                    </TableCell>
                    <TableCell>
                      <Badge className={getPrioridadBadge(solicitud.prioridad)}>
                        {solicitud.prioridad}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getEstadoBadge(solicitud.estado)}>
                        {solicitud.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {solicitud.estado === 'Pendiente' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAprobar(solicitud)}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
                              title="Aprobar solicitud"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRechazar(solicitud)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                              title="Rechazar solicitud"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSolicitudes.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No se encontraron solicitudes</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Solicitudes;
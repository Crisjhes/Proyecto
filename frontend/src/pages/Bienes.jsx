import React, { useState } from 'react';
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
import { Plus, Search, Eye, Edit, Trash2, Package, TrendingUp, Archive } from 'lucide-react';
import { mockActivos, mockAsignaciones, mockPersonal } from '../mock/mockData';
import { toast } from '../hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

const Bienes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [selectedBien, setSelectedBien] = useState(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  // Combinar activos con asignaciones
  const activosConAsignacion = mockActivos.map((activo) => {
    const asignacion = mockAsignaciones.find(
      (a) => a.id_activo === activo.id && a.estado === 'Activa'
    );
    
    let personalAsignado = null;
    if (asignacion) {
      personalAsignado = mockPersonal.find((p) => p.id === asignacion.id_personal);
    }

    return {
      ...activo,
      asignacion,
      personalAsignado,
    };
  });

  const filteredBienes = activosConAsignacion.filter((bien) => {
    const matchSearch =
      bien.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bien.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bien.categoria.toLowerCase().includes(searchTerm.toLowerCase());

    const matchEstado = filterEstado === 'todos' || bien.estado === filterEstado;

    return matchSearch && matchEstado;
  });

  const getEstadoBadge = (estado) => {
    const variants = {
      En_Almacen: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
      Asignado: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
      En_Mantenimiento: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
      Dado_de_Baja: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
    };
    return variants[estado] || 'bg-gray-100 text-gray-700';
  };

  const getEstadoLabel = (estado) => {
    const labels = {
      En_Almacen: 'En Almacén',
      Asignado: 'Asignado',
      En_Mantenimiento: 'En Mantenimiento',
      Dado_de_Baja: 'Dado de Baja',
    };
    return labels[estado] || estado;
  };

  const handleViewDetail = (bien) => {
    setSelectedBien(bien);
    setShowDetailDialog(true);
  };

  const handleEdit = (bien) => {
    navigate(`/bienes/editar/${bien.id}`, { state: { bien } });
  };

  const handleDelete = (bien) => {
    if (window.confirm(`¿Estás seguro de eliminar el bien ${bien.codigo}?`)) {
      toast({
        title: 'Bien eliminado',
        description: `${bien.codigo} ha sido eliminado del sistema`,
        variant: 'destructive',
      });
    }
  };

  const stats = {
    total: mockActivos.length,
    disponibles: mockActivos.filter((a) => a.estado === 'En_Almacen').length,
    asignados: mockActivos.filter((a) => a.estado === 'Asignado').length,
    enMantenimiento: mockActivos.filter((a) => a.estado === 'En_Mantenimiento').length,
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bienes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestión y control de activos fijos institucionales
          </p>
        </div>
        <Button
          onClick={() => navigate('/bienes/registrar')}
          className="bg-gradient-to-r from-[#003087] to-[#00B1EB] hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar Bien
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Bienes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-xl">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Disponibles</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {stats.disponibles}
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-xl">
                <Archive className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Asignados</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {stats.asignados}
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-xl">
                <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">En Mantenimiento</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                  {stats.enMantenimiento}
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-xl">
                <Package className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
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
                placeholder="Buscar por código, descripción o categoría..."
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
                <SelectItem value="En_Almacen">En Almacén</SelectItem>
                <SelectItem value="Asignado">Asignado</SelectItem>
                <SelectItem value="En_Mantenimiento">En Mantenimiento</SelectItem>
                <SelectItem value="Dado_de_Baja">Dado de Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de bienes */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Bienes ({filteredBienes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Asignado a</TableHead>
                  <TableHead>Desde</TableHead>
                  <TableHead>Costo (Bs.)</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBienes.map((bien) => (
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
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {bien.descripcion}
                          </p>
                          {bien.numero_serie && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              S/N: {bien.numero_serie}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{bien.categoria}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getEstadoBadge(bien.estado)}>
                        {getEstadoLabel(bien.estado)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {bien.personalAsignado ? (
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">
                            {bien.personalAsignado.nombres} {bien.personalAsignado.apellidos}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {bien.personalAsignado.cargo}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-600 text-sm">
                          No asignado
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {bien.asignacion ? (
                        <span className="text-sm">
                          {new Date(bien.asignacion.fecha_asignacion).toLocaleDateString('es-BO')}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-600 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">
                        Bs. {bien.costo_adquisicion.toLocaleString('es-BO', { minimumFractionDigits: 2 })}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(bien)}
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(bien)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(bien)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBienes.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No se encontraron bienes</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de detalles */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Bien</DialogTitle>
            <DialogDescription>
              Información completa del activo fijo
            </DialogDescription>
          </DialogHeader>
          {selectedBien && (
            <div className="space-y-6">
              {/* Imagen */}
              {selectedBien.foto && (
                <div className="flex justify-center">
                  <img
                    src={selectedBien.foto}
                    alt={selectedBien.descripcion}
                    className="w-full max-w-md h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Información básica */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Código</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedBien.codigo}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Estado</p>
                  <Badge className={getEstadoBadge(selectedBien.estado)}>
                    {getEstadoLabel(selectedBien.estado)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Categoría</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedBien.categoria}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Número de Serie</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedBien.numero_serie || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Descripción</p>
                <p className="text-gray-900 dark:text-white">{selectedBien.descripcion}</p>
              </div>

              {/* Información financiera */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Costo de Adquisición</p>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">
                    Bs. {selectedBien.costo_adquisicion.toLocaleString('es-BO', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de Compra</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(selectedBien.fecha_compra).toLocaleDateString('es-BO')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Valor Residual</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Bs. {selectedBien.valor_residual.toLocaleString('es-BO', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Proveedor</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedBien.proveedor}
                  </p>
                </div>
              </div>

              {/* Asignación actual */}
              {selectedBien.personalAsignado && selectedBien.asignacion && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
                  <p className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
                    Asignación Actual
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-700 dark:text-blue-400">Asignado a</p>
                      <p className="font-semibold text-blue-900 dark:text-blue-200">
                        {selectedBien.personalAsignado.nombres} {selectedBien.personalAsignado.apellidos}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {selectedBien.personalAsignado.cargo} - {selectedBien.personalAsignado.departamento}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700 dark:text-blue-400">Desde</p>
                      <p className="font-semibold text-blue-900 dark:text-blue-200">
                        {new Date(selectedBien.asignacion.fecha_asignacion).toLocaleDateString('es-BO')}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {selectedBien.asignacion.observaciones}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bienes;

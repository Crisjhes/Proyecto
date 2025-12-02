import React, { useState } from 'react';
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
import { Search, Wrench, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { mockMantenimientos, mockActivos } from '../mock/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const Mantenimiento = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');
  const [mantenimientos] = useState(mockMantenimientos);

  // Activos que necesitan mantenimiento
  const activosEnMantenimiento = mockActivos.filter(
    (a) => a.estado === 'En_Mantenimiento'
  );

  const filteredMantenimientos = mantenimientos.filter((m) => {
    const matchSearch =
      m.codigo_activo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.descripcion_activo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

    const matchTipo = filterTipo === 'todos' || m.tipo === filterTipo;

    return matchSearch && matchTipo;
  });

  const getTipoBadge = (tipo) => {
    return tipo === 'Preventivo'
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
      : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400';
  };

  const getEstadoBadge = (estado) => {
    return estado === 'Completado'
      ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400';
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mantenimiento</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Gestión y seguimiento de mantenimientos de activos
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Mantenimientos</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {mantenimientos.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-xl">
                <Wrench className="w-8 h-8 text-blue-600 dark:text-blue-400" />
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
                  {activosEnMantenimiento.length}
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-xl">
                <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completados</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {mantenimientos.filter((m) => m.estado === 'Completado').length}
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activos en mantenimiento */}
      {activosEnMantenimiento.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Activos Actualmente en Mantenimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activosEnMantenimiento.map((activo) => (
                <div
                  key={activo.id}
                  className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-900"
                >
                  <div className="flex items-center gap-4">
                    {activo.foto && (
                      <img
                        src={activo.foto}
                        alt={activo.descripcion}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {activo.codigo} - {activo.descripcion}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Categoría: {activo.categoria}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400">
                    En Mantenimiento
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por código, activo o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="Preventivo">Preventivo</SelectItem>
                <SelectItem value="Correctivo">Correctivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Historial de mantenimientos */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Mantenimientos ({filteredMantenimientos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código Activo</TableHead>
                  <TableHead>Descripción Activo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descripción Mantenimiento</TableHead>
                  <TableHead>Costo (Bs.)</TableHead>
                  <TableHead>Fechas</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMantenimientos.map((mant) => (
                  <TableRow key={mant.id}>
                    <TableCell>
                      <span className="font-mono font-medium">{mant.codigo_activo}</span>
                    </TableCell>
                    <TableCell>{mant.descripcion_activo}</TableCell>
                    <TableCell>
                      <Badge className={getTipoBadge(mant.tipo)}>{mant.tipo}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm line-clamp-2">{mant.descripcion}</p>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">Bs. {mant.costo.toFixed(2)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>
                          Inicio:{' '}
                          {new Date(mant.fecha_inicio).toLocaleDateString('es-BO')}
                        </p>
                        <p>
                          Fin: {new Date(mant.fecha_fin).toLocaleDateString('es-BO')}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getEstadoBadge(mant.estado)}>{mant.estado}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMantenimientos.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No se encontraron mantenimientos
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Mantenimiento;
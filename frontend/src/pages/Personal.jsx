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
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Plus, Search, Eye, QrCode, UserCheck, Filter, Edit, Trash2 } from 'lucide-react';
import { mockPersonal, mockDepartamentos } from '../mock/mockData';
import { toast } from '../hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const Personal = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartamento, setFilterDepartamento] = useState('todos');
  const [personal, setPersonal] = useState(mockPersonal);

  const filteredPersonal = personal.filter((p) => {
    const matchSearch =
      p.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ci.includes(searchTerm) ||
      p.cargo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDepartamento =
      filterDepartamento === 'todos' || p.departamento === filterDepartamento;

    return matchSearch && matchDepartamento;
  });

  const getInitials = (nombres, apellidos) => {
    return `${nombres.charAt(0)}${apellidos.charAt(0)}`;
  };

  const handleViewQR = (persona) => {
    // Aquí se mostraría el QR del personal
    alert(`QR de ${persona.nombres} ${persona.apellidos}\nCI: ${persona.ci}\nCargo: ${persona.cargo}\nDepartamento: ${persona.departamento}`);
  };

  const handleEdit = (persona) => {
    navigate(`/personal/editar/${persona.id}`, { state: { persona } });
  };

  const handleDelete = (persona) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${persona.nombres} ${persona.apellidos}?\n\nEsta acción no se puede deshacer.`)) {
      // Eliminar del estado
      setPersonal(personal.filter((p) => p.id !== persona.id));
      
      toast({
        title: 'Personal eliminado',
        description: `${persona.nombres} ${persona.apellidos} ha sido eliminado del sistema`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Personal</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestión de funcionarios y empleados de ADECINE
          </p>
        </div>
        <Button
          onClick={() => navigate('/personal/registrar')}
          className="bg-gradient-to-r from-[#003087] to-[#00B1EB] hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar Personal
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar por nombre, CI, cargo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={filterDepartamento} onValueChange={setFilterDepartamento}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los departamentos</SelectItem>
                  {mockDepartamentos.map((dept) => (
                    <SelectItem key={dept.id} value={dept.nombre}>
                      {dept.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Personal</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{personal.length}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-xl">
                <UserCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Personal Activo</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {personal.filter((p) => p.estado === 'Activo').length}
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-xl">
                <UserCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Departamentos</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {mockDepartamentos.length}
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-xl">
                <Filter className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de personal */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Personal ({filteredPersonal.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Personal</TableHead>
                  <TableHead>CI</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPersonal.map((persona) => (
                  <TableRow key={persona.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={persona.foto} alt={persona.nombres} />
                          <AvatarFallback className="bg-gradient-to-br from-[#003087] to-[#00B1EB] text-white">
                            {getInitials(persona.nombres, persona.apellidos)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {persona.nombres} {persona.apellidos}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Registrado: {new Date(persona.fecha_registro).toLocaleDateString('es-BO')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {persona.ci} {persona.expedido}
                      </span>
                    </TableCell>
                    <TableCell>{persona.cargo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{persona.departamento}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{persona.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          persona.estado === 'Activo'
                            ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                        }
                      >
                        {persona.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/personal/${persona.id}`)}
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewQR(persona)}
                          className="text-[#003087] dark:text-[#00B1EB]"
                          title="Ver QR"
                        >
                          <QrCode className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(persona)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(persona)}
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

          {filteredPersonal.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No se encontró personal</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Personal;
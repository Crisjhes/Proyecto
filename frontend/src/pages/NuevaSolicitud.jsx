import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ArrowLeft, Send } from 'lucide-react';
import { mockPersonal, mockActivos } from '../mock/mockData';
import { toast } from '../hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';

const NuevaSolicitud = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Si es funcionario, prellenar con sus datos
  const personalActual = mockPersonal.find((p) => p.email === user?.email);
  
  const [formData, setFormData] = useState({
    id_personal: personalActual?.id.toString() || '',
    tipo_solicitud: '',
    activo_solicitado: '',
    descripcion: '',
    prioridad: 'Media',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (!formData.id_personal || !formData.tipo_solicitud || !formData.activo_solicitado) {
      toast({
        title: 'Error de validación',
        description: 'Por favor completa todos los campos requeridos',
        variant: 'destructive',
      });
      return;
    }

    // Simular envío
    toast({
      title: 'Solicitud enviada',
      description: 'La solicitud ha sido registrada exitosamente y está pendiente de aprobación',
    });

    setTimeout(() => {
      navigate('/solicitudes');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Encabezado */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/solicitudes')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nueva Solicitud</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Registra una nueva solicitud de préstamo o asignación de bienes
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Información de la Solicitud</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Solicitante */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="id_personal">
                  Solicitante <span className="text-red-500">*</span>
                </Label>
                {user?.rol === 'Funcionario' ? (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.nombres} {user.apellidos}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {personalActual?.cargo || user.rol}
                    </p>
                  </div>
                ) : (
                  <Select
                    value={formData.id_personal}
                    onValueChange={(value) => handleChange('id_personal', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el solicitante" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPersonal.map((persona) => (
                        <SelectItem key={persona.id} value={persona.id.toString()}>
                          {persona.nombres} {persona.apellidos} - {persona.cargo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo_solicitud">
                  Tipo de Solicitud <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.tipo_solicitud}
                  onValueChange={(value) => handleChange('tipo_solicitud', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Préstamo">Préstamo Temporal</SelectItem>
                    <SelectItem value="Asignación">Asignación Permanente</SelectItem>
                    <SelectItem value="Nuevo Activo">Solicitud de Nuevo Activo</SelectItem>
                    <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Activo y Prioridad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="activo_solicitado">
                  Activo Solicitado <span className="text-red-500">*</span>
                </Label>
                {formData.tipo_solicitud === 'Nuevo Activo' ? (
                  <Input
                    id="activo_solicitado"
                    value={formData.activo_solicitado}
                    onChange={(e) => handleChange('activo_solicitado', e.target.value)}
                    placeholder="Describe el activo que necesitas"
                    required
                  />
                ) : (
                  <Select
                    value={formData.activo_solicitado}
                    onValueChange={(value) => handleChange('activo_solicitado', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el activo" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockActivos
                        .filter((a) => a.estado === 'En_Almacen' || a.estado === 'Asignado')
                        .map((activo) => (
                          <SelectItem key={activo.id} value={activo.codigo}>
                            {activo.codigo} - {activo.descripcion}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="prioridad">
                  Prioridad <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.prioridad}
                  onValueChange={(value) => handleChange('prioridad', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion">
                Descripción / Justificación <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
                placeholder="Describe el motivo de la solicitud y detalles relevantes..."
                rows={5}
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Proporciona información detallada para facilitar la aprobación
              </p>
            </div>

            {/* Información del usuario actual */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Registrada por:</strong> {user?.nombres} {user?.apellidos} ({user?.rol})
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Las solicitudes serán revisadas por el Jefe de Activos
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/solicitudes')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#003087] to-[#00B1EB] hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Solicitud
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default NuevaSolicitud;
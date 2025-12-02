import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { mockDepartamentos, mockPersonal } from '../mock/mockData';
import { toast } from '../hooks/use-toast';

const EditarPersonal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  
  // Obtener los datos de la persona del state o buscar en mockPersonal
  const personaInicial = location.state?.persona || mockPersonal.find(p => p.id === parseInt(id));

  const [formData, setFormData] = useState({
    ci: personaInicial?.ci || '',
    expedido: personaInicial?.expedido || '',
    nombres: personaInicial?.nombres || '',
    apellidos: personaInicial?.apellidos || '',
    cargo: personaInicial?.cargo || '',
    id_departamento: personaInicial?.id_departamento?.toString() || '',
    email: personaInicial?.email || '',
    password: personaInicial?.password || '',
    estado: personaInicial?.estado || 'Activo',
  });

  useEffect(() => {
    if (!personaInicial) {
      toast({
        title: 'Error',
        description: 'No se encontró el personal a editar',
        variant: 'destructive',
      });
      navigate('/personal');
    }
  }, [personaInicial, navigate]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (
      !formData.ci ||
      !formData.expedido ||
      !formData.nombres ||
      !formData.apellidos ||
      !formData.cargo ||
      !formData.id_departamento ||
      !formData.password
    ) {
      toast({
        title: 'Error de validación',
        description: 'Por favor completa todos los campos requeridos',
        variant: 'destructive',
      });
      return;
    }

    // Simular actualización
    toast({
      title: 'Personal actualizado',
      description: `Los datos de ${formData.nombres} ${formData.apellidos} han sido actualizados exitosamente`,
    });

    setTimeout(() => {
      navigate('/personal');
    }, 1500);
  };

  if (!personaInicial) {
    return null;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Encabezado */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/personal')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Editar Personal
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Actualiza la información del funcionario
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Información Personal */}
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ci">
                    Carnet de Identidad <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ci"
                    value={formData.ci}
                    onChange={(e) => handleChange('ci', e.target.value)}
                    placeholder="Número de CI"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expedido">
                    Expedido en <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.expedido}
                    onValueChange={(value) => handleChange('expedido', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LP">La Paz</SelectItem>
                      <SelectItem value="CB">Cochabamba</SelectItem>
                      <SelectItem value="SC">Santa Cruz</SelectItem>
                      <SelectItem value="OR">Oruro</SelectItem>
                      <SelectItem value="PT">Potosí</SelectItem>
                      <SelectItem value="TJ">Tarija</SelectItem>
                      <SelectItem value="CH">Chuquisaca</SelectItem>
                      <SelectItem value="BE">Beni</SelectItem>
                      <SelectItem value="PD">Pando</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">
                    Estado <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => handleChange('estado', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombres">
                    Nombres <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nombres"
                    value={formData.nombres}
                    onChange={(e) => handleChange('nombres', e.target.value)}
                    placeholder="Nombres completos"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellidos">
                    Apellidos <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="apellidos"
                    value={formData.apellidos}
                    onChange={(e) => handleChange('apellidos', e.target.value)}
                    placeholder="Apellidos completos"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Laboral */}
          <Card>
            <CardHeader>
              <CardTitle>Información Laboral</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cargo">
                    Cargo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => handleChange('cargo', e.target.value)}
                    placeholder="Ej: Analista de Sistemas"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id_departamento">
                    Departamento <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.id_departamento}
                    onValueChange={(value) => handleChange('id_departamento', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDepartamentos.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Institucional</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="ejemplo@adecine.gob.bo"
                />
              </div>
            </CardContent>
          </Card>

          {/* Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">
                  Contraseña <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Contraseña de acceso"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  La contraseña debe tener al menos 6 caracteres
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-900">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  <strong>Nota:</strong> Si cambias la contraseña, el funcionario deberá usar la nueva contraseña en su próximo inicio de sesión.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Información del registro */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              <strong>Personal registrado el:</strong> {new Date(personaInicial.fecha_registro).toLocaleDateString('es-BO')}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/personal')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#003087] to-[#00B1EB] hover:opacity-90 transition-opacity"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditarPersonal;

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
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { mockCategorias, mockProveedores } from '../mock/mockData';
import { toast } from '../hooks/use-toast';

const RegistrarBien = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codigo_activo: '',
    descripcion: '',
    numero_serie: '',
    id_categoria: '',
    id_proveedor: '',
    fecha_compra: '',
    costo_adquisicion: '',
    valor_residual: '',
    estado: 'En_Almacen',
    foto: null,
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        foto: file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (
      !formData.codigo_activo ||
      !formData.descripcion ||
      !formData.id_categoria ||
      !formData.id_proveedor ||
      !formData.fecha_compra ||
      !formData.costo_adquisicion
    ) {
      toast({
        title: 'Error de validación',
        description: 'Por favor completa todos los campos requeridos',
        variant: 'destructive',
      });
      return;
    }

    // Simular envío
    toast({
      title: 'Bien registrado',
      description: `El activo ${formData.codigo_activo} ha sido registrado exitosamente`,
    });

    setTimeout(() => {
      navigate('/bienes');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Encabezado */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/bienes')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Registrar Bien</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Registra un nuevo activo fijo en el sistema
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica del Activo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="codigo_activo">
                    Código de Activo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="codigo_activo"
                    value={formData.codigo_activo}
                    onChange={(e) => handleChange('codigo_activo', e.target.value)}
                    placeholder="Ej: AF-2025-001"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Código único del activo según nomenclatura institucional
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numero_serie">Número de Serie</Label>
                  <Input
                    id="numero_serie"
                    value={formData.numero_serie}
                    onChange={(e) => handleChange('numero_serie', e.target.value)}
                    placeholder="Número de serie del fabricante"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">
                  Descripción del Activo <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleChange('descripcion', e.target.value)}
                  placeholder="Descripción detallada del activo..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="id_categoria">
                    Categoría <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.id_categoria}
                    onValueChange={(value) => handleChange('id_categoria', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategorias.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.nombre} (Vida útil: {cat.vida_util} años)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">
                    Estado Inicial <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => handleChange('estado', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="En_Almacen">En Almacén</SelectItem>
                      <SelectItem value="Asignado">Asignado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de Adquisición */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Adquisición</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="id_proveedor">
                    Proveedor <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.id_proveedor}
                    onValueChange={(value) => handleChange('id_proveedor', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProveedores.map((prov) => (
                        <SelectItem key={prov.id} value={prov.id.toString()}>
                          {prov.nombre} (NIT: {prov.nit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fecha_compra">
                    Fecha de Compra <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fecha_compra"
                    type="date"
                    value={formData.fecha_compra}
                    onChange={(e) => handleChange('fecha_compra', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="costo_adquisicion">
                    Costo de Adquisición (Bs.) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="costo_adquisicion"
                    type="number"
                    step="0.01"
                    value={formData.costo_adquisicion}
                    onChange={(e) => handleChange('costo_adquisicion', e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor_residual">Valor Residual (Bs.)</Label>
                  <Input
                    id="valor_residual"
                    type="number"
                    step="0.01"
                    value={formData.valor_residual}
                    onChange={(e) => handleChange('valor_residual', e.target.value)}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Valor estimado al final de su vida útil
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Imagen del Activo */}
          <Card>
            <CardHeader>
              <CardTitle>Imagen del Activo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="foto">Fotografía del Bien</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sube una imagen del activo (JPG, PNG, máx. 5MB)
                </p>
              </div>

              {formData.foto && (
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Archivo seleccionado: {formData.foto.name}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate('/bienes')}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#003087] to-[#00B1EB] hover:opacity-90 transition-opacity"
            >
              <Save className="w-4 h-4 mr-2" />
              Registrar Bien
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrarBien;
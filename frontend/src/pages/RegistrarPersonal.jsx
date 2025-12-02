import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ArrowLeft, Save, QrCode, Download, Fingerprint, Eye, EyeOff } from 'lucide-react';
import { mockDepartamentos } from '../mock/mockData';
import { toast } from '../hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';

const RegistrarPersonal = () => {
  const navigate = useNavigate();
  const qrRef = useRef(null);
  const [formData, setFormData] = useState({
    ci: '',
    expedido: '',
    nombres: '',
    apellidos: '',
    cargo: '',
    id_departamento: '',
    email: '',
    password: '',
    estado: 'Activo',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState('');

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateQR = () => {
    if (!formData.ci || !formData.nombres || !formData.apellidos) {
      toast({
        title: 'Datos incompletos',
        description: 'Complete CI, nombres y apellidos para generar el QR',
        variant: 'destructive',
      });
      return;
    }

    // Generar datos del QR
    const departamento = mockDepartamentos.find(
      (d) => d.id.toString() === formData.id_departamento
    );

    const qrInfo = {
      ci: `${formData.ci} ${formData.expedido}`,
      nombre: `${formData.nombres} ${formData.apellidos}`,
      cargo: formData.cargo,
      departamento: departamento?.nombre || '',
      fecha_registro: new Date().toISOString(),
    };

    setQrData(JSON.stringify(qrInfo));
    setShowQR(true);

    toast({
      title: 'QR generado',
      description: 'El código QR ha sido generado exitosamente',
    });
  };

  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `QR_${formData.ci}_${formData.nombres}_${formData.apellidos}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();

      toast({
        title: 'QR descargado',
        description: 'El código QR ha sido descargado como imagen',
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleBiometricCapture = () => {
    // Aquí se implementaría la captura real con el hardware de huella digital
    toast({
      title: 'Captura biométrica',
      description: 'Función preparada para integración con hardware de huella digital',
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
      !formData.id_departamento
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
      title: 'Personal registrado',
      description: `${formData.nombres} ${formData.apellidos} ha sido registrado exitosamente`,
    });

    setTimeout(() => {
      navigate('/personal');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Encabezado */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/personal')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Registrar Personal
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Registra un nuevo funcionario con datos biométricos y QR
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
              <CardTitle>Seguridad - Acceso al Sistema</CardTitle>
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
                    placeholder="Contraseña de acceso al sistema"
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
                  Esta contraseña será utilizada por el funcionario para acceder al sistema
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>Nota:</strong> Asegúrate de proporcionar la contraseña al funcionario de forma segura. La contraseña debe tener al menos 6 caracteres.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Biometría */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
                Registro Biométrico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
                <Fingerprint className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Captura de huella digital para autenticación
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBiometricCapture}
                  className="border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white dark:border-[#00B1EB] dark:text-[#00B1EB] dark:hover:bg-[#00B1EB] dark:hover:text-white"
                >
                  <Fingerprint className="w-4 h-4 mr-2" />
                  Capturar Huella Digital
                </Button>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>Nota:</strong> El sistema está preparado para integrarse con hardware
                  de captura de huella digital. La funcionalidad completa estará disponible
                  tras conectar el dispositivo biométrico.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Generación de QR */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#003087] dark:text-[#00B1EB]" />
                Código QR de Identificación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Genera el código QR del personal
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Incluye: CI, nombre, cargo y departamento
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={generateQR}
                  className="bg-gradient-to-r from-[#003087] to-[#00B1EB] hover:opacity-90 transition-opacity"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Generar QR
                </Button>
              </div>

              {showQR && qrData && (
                <div className="p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex flex-col items-center gap-4">
                    <div
                      ref={qrRef}
                      className="p-4 bg-white rounded-lg shadow-lg"
                    >
                      <QRCodeSVG
                        value={qrData}
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formData.nombres} {formData.apellidos}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        CI: {formData.ci} {formData.expedido}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={downloadQR}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Credencial con QR
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

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
              Registrar Personal
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrarPersonal;

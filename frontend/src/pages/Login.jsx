import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { mockUsers } from '../mock/mockData';
import { toast } from '../hooks/use-toast';
import logo from '../assets/logo.png'

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simular delay de autenticación
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.username === formData.username && u.password === formData.password
      );

      if (user) {
        const { password, ...userData } = user;
        login(userData);
        toast({
          title: 'Inicio de sesión exitoso',
          description: `Bienvenido/a ${user.nombres} ${user.apellidos}`,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Error de autenticación',
          description: 'Usuario o contraseña incorrectos',
          variant: 'destructive',
        });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-4">
            {/*<ShieldCheck className="w-12 h-12 text-[#003087]" />*/}
            <img 
                src={logo} 
                alt="Logo ADECINE" 
                className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ADECINE
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestión de Bienes Institucionales
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#003087] hover:bg-[#00246b] text-white font-medium transition-colors"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Ingresar'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">
                Usuarios de prueba:
              </p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-500">
                <p><strong>Administrador:</strong> <span className="font-mono">crisjhes</span> / <span className="font-mono">admin123</span></p>
                <p><strong>Jefe de Activos:</strong> <span className="font-mono">jkmilo</span> / <span className="font-mono">jefe123</span></p>
                <p><strong>Funcionarios:</strong></p>
                <div className="ml-2 space-y-0.5">
                  <p><span className="font-mono">cmamani</span> / <span className="font-mono">carlos123</span></p>
                  <p><span className="font-mono">acondori</span> / <span className="font-mono">ana123</span></p>
                  <p><span className="font-mono">lfernandez</span> / <span className="font-mono">lucia123</span></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          © 2025 ADECINE - Autoridad de Fiscalización y Control
        </p>
      </div>
    </div>
  );
};

export default Login;
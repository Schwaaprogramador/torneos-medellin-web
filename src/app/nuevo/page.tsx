'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/config';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
};

type FormErrors = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  general?: string;
};

export default function PlayerRegistration() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
      valid = false;
    }
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Ingrese un email válido';
      valid = false;
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      valid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        })
      });
      
      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }
      
      router.push('/');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        general: error instanceof Error ? error.message : 'Error desconocido'
      }));
    } finally {
      setLoading(false);
    }
  };


return (
  <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md ">
    <h1 className="text-2xl font-bold mb-6 text-center text-yellow-700">Registro de Jugador</h1>
    
    {errors.general && (
      <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
        {errors.general}
      </div>
    )}
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full text-black p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          required
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full text-black p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          required
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Contraseña</label>
        <input
          type="password"
          className="w-full text-black p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full text-black p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          required
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Imagen de Perfil (Opcional)</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full text-black p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          placeholder="URL de la imagen"
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors font-medium shadow-sm"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registrando...
          </span>
        ) : 'Registrarse'}
      </button>
    </form>
  </div>
);

// ... existing code ...
}
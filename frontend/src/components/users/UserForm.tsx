import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { User, CreateUserRequest } from '../../types';

// Esquema de validación que coincide con tu backend
const userSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  email: z.string()
    .email('Email inválido'),
  avatarUrl: z.string()
    .url('Debe ser una URL válida')
    .optional()
    .or(z.literal(''))
});

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserRequest) => void;
  loading?: boolean;
  error?: string;
}

export const UserForm = ({ user, onSubmit, loading = false, error }: UserFormProps) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<CreateUserRequest>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      avatarUrl: user?.avatarUrl || ''
    }
  });

  const handleFormSubmit = (data: CreateUserRequest) => {
    // Si avatarUrl está vacío, no lo enviamos
    const submitData = {
      name: data.name,
      email: data.email,
      ...(data.avatarUrl && { avatarUrl: data.avatarUrl })
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Error general */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Campo Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingresa el nombre completo"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Campo Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="ejemplo@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Campo Avatar URL */}
      <div>
        <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 mb-1">
          URL del Avatar <span className="text-gray-400">(opcional)</span>
        </label>
        <input
          {...register('avatarUrl')}
          type="url"
          id="avatarUrl"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://ejemplo.com/avatar.jpg"
        />
        {errors.avatarUrl && (
          <p className="text-red-500 text-xs mt-1">{errors.avatarUrl.message}</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? 'Guardando...' : (user ? 'Actualizar' : 'Crear Usuario')}
        </button>
      </div>
    </form>
  );
};
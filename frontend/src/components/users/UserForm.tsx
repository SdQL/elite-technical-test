// components/users/UserForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Briefcase, Building, MapPin, FileText, Image } from 'lucide-react';
import type { User as UserType, CreateUserRequest } from '../../types';

const userSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  email: z.string()
    .email('Email inválido'),
  role: z.string()
    .min(2, 'El rol es requerido')
    .max(100, 'El rol no puede exceder 100 caracteres'),
  company: z.string()
    .min(2, 'La empresa es requerida')
    .max(100, 'La empresa no puede exceder 100 caracteres'),
  location: z.string()
    .min(2, 'La ubicación es requerida')
    .max(100, 'La ubicación no puede exceder 100 caracteres'),
  bio: z.string()
    .max(500, 'La biografía no puede exceder 500 caracteres')
    .optional()
    .or(z.literal('')),
  avatarUrl: z.string()
    .url('Debe ser una URL válida')
    .optional()
    .or(z.literal(''))
});

interface UserFormProps {
  user?: UserType;
  onSubmit: (data: CreateUserRequest) => void;
  loading?: boolean;
  error?: string;
}

export const UserForm = ({ user, onSubmit, loading = false, error }: UserFormProps) => {
  const { 
    register, 
    handleSubmit, 
    watch,
    setValue,
    formState: { errors } 
  } = useForm<CreateUserRequest>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || '',
      company: user?.company || '',
      location: user?.location || '',
      bio: user?.bio || '',
      avatarUrl: user?.avatarUrl || ''
    }
  });

  const bioLength = watch('bio')?.length || 0;

  const handleFormSubmit = (data: CreateUserRequest) => {
    const submitData = {
      name: data.name,
      email: data.email,
      role: data.role,
      company: data.company,
      location: data.location,
      ...(data.bio && { bio: data.bio }),
      ...(data.avatarUrl && { avatarUrl: data.avatarUrl })
    };
    onSubmit(submitData);
  };

  // Manejar el input de biografía con límite de caracteres
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setValue('bio', value, { shouldValidate: true });
    }
  };

  const roleOptions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile Developer',
    'UI/UX Designer',
    'Product Manager',
    'Project Manager',
    'DevOps Engineer',
    'Data Analyst',
    'Data Scientist',
    'QA Engineer',
    'Tech Lead',
    'Software Architect',
    'Scrum Master',
    'Product Owner'
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Primera fila: Nombre y Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4" />
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

        <div>
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Mail className="w-4 h-4" />
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
      </div>

      {/* Segunda fila: Rol y Empresa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="role" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Briefcase className="w-4 h-4" />
            Rol de trabajo <span className="text-red-500">*</span>
          </label>
          <select
            {...register('role')}
            id="role"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecciona un rol</option>
            {roleOptions.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Building className="w-4 h-4" />
            Empresa <span className="text-red-500">*</span>
          </label>
          <input
            {...register('company')}
            type="text"
            id="company"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nombre de la empresa"
          />
          {errors.company && (
            <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
          )}
        </div>
      </div>

      {/* Tercera fila: Ubicación y Avatar URL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="location" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <MapPin className="w-4 h-4" />
            Ubicación <span className="text-red-500">*</span>
          </label>
          <input
            {...register('location')}
            type="text"
            id="location"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ciudad, País"
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="avatarUrl" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Image className="w-4 h-4" />
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
      </div>

      {/* Biografía - Campo completo */}
      <div>
        <label htmlFor="bio" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <FileText className="w-4 h-4" />
          Biografía <span className="text-gray-400">(opcional)</span>
        </label>
        <div className="relative">
          <textarea
            {...register('bio', {
              onChange: handleBioChange
            })}
            id="bio"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Escribe una breve descripción sobre el usuario..."
          />
          <div className={`absolute bottom-2 right-3 text-xs transition-colors ${
            bioLength >= 450 
              ? 'text-red-500 font-medium' 
              : bioLength >= 400 
                ? 'text-orange-500' 
                : 'text-gray-400'
          }`}>
            {bioLength}/500
          </div>
        </div>
        {errors.bio && (
          <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
        )}
      </div>

      {/* Botón de envío */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
        >
          {loading ? 'Guardando...' : (user ? 'Actualizar' : 'Crear Usuario')}
        </button>
      </div>
    </form>
  );
};
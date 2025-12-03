// components/users/UserProfile.tsx
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Building, Briefcase, Calendar, User as UserIcon } from 'lucide-react';
import { useUser } from '../hooks/useUser';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading, error } = useUser(id!);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error al cargar el usuario</p>
        <Link to="/users" className="text-blue-600 hover:underline">
          Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/users" className="text-blue-600 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Usuarios
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">{user.name}</span>
      </div>

      {/* Header del perfil */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-blue-100 flex items-center justify-center">
                <UserIcon className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-xl text-blue-600 font-medium">{user.role}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                  {user.email}
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span>{user.company}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{user.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Desde {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biografía */}
      {user.bio && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Sobre {user.name.split(' ')[0]}
          </h2>
          <p className="text-gray-700 leading-relaxed">{user.bio}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
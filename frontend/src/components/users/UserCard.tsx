import { Edit, Trash2, Mail, User } from "lucide-react";
import type { User as UserType } from "../../types";

interface UserCardProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
}

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:scale-[1.02]">
      <div className="flex flex-col items-center text-center mb-4">
        <div className="w-16 h-16 mb-3">
          {user.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt={`Avatar de ${user.name}`}
              className="w-full h-full rounded-full object-cover border-2 border-gray-100"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          
          <div className={`w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium ${user.avatarUrl ? 'hidden' : ''}`}>
            <User className="w-6 h-6" />
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 text-lg mb-1">
          {user.name}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Mail className="w-4 h-4" />
          <span>{user.email}</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(user)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span>Editar</span>
        </button>

        <button
          onClick={() => onDelete(user)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  );
};
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  // Si no está abierta, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      {/* Backdrop - click para cerrar */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      {/* Modal content - responsive */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-lg relative transform transition-all overflow-hidden">
        {/* Header azul */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-blue-600 text-white">
          <h2 className="text-lg md:text-xl font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-blue-700"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

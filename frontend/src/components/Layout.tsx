import { Users } from "lucide-react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-24 md:py-12">
      <header className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="p-3 md:p-4 bg-blue-600 rounded-xl md:rounded-2xl">
          <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-4xl font-bold">
            Gestión de usuarios
          </h1>
          <span className="text-sm md:text-lg text-gray-500">
            Crea, elimina, edita
          </span>
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
};

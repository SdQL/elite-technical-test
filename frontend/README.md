# 👥 Gestión de Usuarios - Frontend

> **Aplicación web moderna para gestionar usuarios con React + TypeScript + Router**

## 🚀 Demo en Vivo

**Frontend:** [https://elite-technical-test.vercel.app/users](https://elite-technical-test.vercel.app/users)  
**API Backend:** [https://elite-technical-test.onrender.com/api](https://elite-technical-test.onrender.com/api)

## 📋 Características Principales

- ✅ **CRUD Completo** - Crear, listar, editar y eliminar usuarios con campos expandidos
- ✅ **Navegación SPA** - React Router con URLs amigables (`/users`, `/users/:id`)
- ✅ **Perfiles Detallados** - Páginas individuales para cada usuario con información completa
- ✅ **Formularios Profesionales** - Validación en tiempo real, campos organizados y contador de caracteres
- ✅ **Confirmaciones de Seguridad** - Modal de confirmación para eliminaciones con información del usuario
- ✅ **Arquitectura Modular** - Hooks especializados y separación clara de responsabilidades
- ✅ **Diseño Responsive** - Optimizado para móviles, tablets y desktop
- ✅ **Estados de Carga** - Feedback visual durante operaciones
- ✅ **Manejo de Errores** - Mensajes informativos en español para todos los casos

## 🛠️ Stack Tecnológico

### Core
- **React 19** - Framework principal
- **TypeScript** - Tipado estático para mejor mantenibilidad
- **Vite** - Build tool rápido con hot reload
- **React Router DOM** - Navegación SPA con routing declarativo

### Estilos & UI
- **Tailwind CSS** - Framework utility-first para estilos
- **Lucide React** - Iconografía moderna y consistente

### Formularios & Validación
- **React Hook Form** - Gestión eficiente de formularios
- **Zod** - Validación de schemas con TypeScript

### HTTP & APIs
- **Axios** - Cliente HTTP para comunicación con backend

## 🏗️ Arquitectura del Código

```
src/
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes base (Modal, Pagination)
│   └── users/           # Componentes específicos de usuarios
├── hooks/               # Custom hooks para lógica de negocio
├── services/            # Capa de servicios para API calls
├── types/               # Definiciones de TypeScript
```

### Patrones Implementados

- **Separación de Responsabilidades** - UI separada de lógica de negocio
- **Custom Hooks** - Lógica reutilizable y testeable
- **Composición de Componentes** - Componentes modulares y flexibles
- **Manejo de Estado Centralizado** - Un solo hook para gestión completa de usuarios

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm

### Comandos

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

## 📱 Funcionalidades de Usuario

### ➕ Crear Usuario
- Formulario con validación en tiempo real
- Campos: Nombre, Email, URL de Avatar (opcional)

### ✏️ Editar Usuario
- Formulario pre-poblado con datos actuales
- Validación idéntica al crear
- Actualización inmediata en la lista

### 🗑️ Eliminar Usuario
- Modal de confirmación con información del usuario
- Prevención de eliminaciones accidentales

### 📄 Lista Paginada
- De 4 a 10 usuarios por página
- Navegación con números de página y flechas
- URLs que reflejan la página actual
- Contador de usuarios totales

    
## 🎨 Experiencia de Usuario

- **Carga Progresiva** - Skeletons durante carga de datos
- **Estados Vacíos** - Mensajes claros cuando no hay usuarios
- **Responsive Design** - Adaptable a cualquier dispositivo

## 🧪 Calidad del Código

- **ESLint** configurado con reglas estrictas
- **TypeScript** en modo strict
- **Componentes tipados** al 100%
- **Error Boundaries** para manejo robusto de errores
---
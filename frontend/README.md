# 👥 Gestión de Usuarios - Frontend

> **Aplicación web moderna para gestionar usuarios con React + TypeScript**

## 🚀 Demo en Vivo

**Frontend:** [https://elite-technical-test-frontend.vercel.app](https://elite-technical-test-frontend.vercel.app)  
**API Backend:** [https://elite-technical-test.onrender.com/api](https://elite-technical-test.onrender.com/api)

## 📋 Características Principales

- ✅ **CRUD Completo** - Crear, listar, editar y eliminar usuarios
- ✅ **Paginación Inteligente** - Navegación fluida entre páginas con URLs dinámicas
- ✅ **Formularios Validados** - Validación en tiempo real con mensajes claros
- ✅ **Confirmaciones de Seguridad** - Modal de confirmación para eliminaciones
- ✅ **Diseño Responsive** - Optimizado para móviles, tablets y desktop
- ✅ **Estados de Carga** - Feedback visual durante operaciones
- ✅ **Manejo de Errores** - Mensajes informativos para problemas de red o validación

## 🛠️ Stack Tecnológico

### Core
- **React 19** - Framework principal
- **TypeScript** - Tipado estático para mejor mantenibilidad
- **Vite** - Build tool rápido con hot reload

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
- 10 usuarios por página
- Navegación con números de página y flechas
- URLs que reflejan la página actual (compartibles)
- Contador de usuarios totales

## 🎨 Experiencia de Usuario

- **Carga Progresiva** - Skeletons durante carga de datos
- **Estados Vacíos** - Mensajes claros cuando no hay usuarios
- **Responsive Design** - Adaptable a cualquier dispositivo

## ⚡ Optimizaciones

- **Bundle Splitting** - Código dividido para carga rápida
- **Tree Shaking** - Solo el código necesario en producción
- **CSS Purging** - Tailwind optimizado automáticamente
- **TypeScript Strict** - Máxima seguridad de tipos

## 🧪 Calidad del Código

- **ESLint** configurado con reglas estrictas
- **TypeScript** en modo strict
- **Componentes tipados** al 100%
- **Error Boundaries** para manejo robusto de errores
---

## 👨‍💻 Sobre el Desarrollo

Esta aplicación fue desarrollada como demostración de buenas prácticas en React moderno, enfocándose en:

- **Código mantenible y escalable**
- **Experiencia de usuario fluida**
- **Arquitectura bien estructurada**
- **Patrones de desarrollo modernos**


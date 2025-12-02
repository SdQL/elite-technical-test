# Backend API - Elite Technical Test

Una API REST completa para gestión de usuarios construida con Node.js, TypeScript, Express.js y Sequelize.

## 🚀 Características

- ✅ **CRUD completo** para usuarios
- ✅ **Paginación** configurable
- ✅ **Validación de entrada** con Zod
- ✅ **Manejo centralizado de errores**
- ✅ **Base de datos PostgreSQL** con Supabase
- ✅ **TypeScript** para type safety

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **ORM**: Sequelize
- **Base de datos**: PostgreSQL (Supabase)
- **Validación**: Zod
- **CORS**: Configurado para desarrollo

## 📁 Estructura del Proyecto

```
src/
├── config/
│   ├── database.ts      # Configuración de Sequelize
│   └── env.ts          # Variables de entorno
├── controllers/
│   └── userController.ts # Controladores HTTP
├── middlewares/
│   ├── errorHandler.ts  # Manejo de errores
│   └── validation.ts    # Validación de entrada
├── models/
│   └── User.ts         # Modelo de usuario
├── routes/
│   └── userRoutes.ts   # Rutas de la API
├── services/
│   └── userService.ts  # Lógica de negocio
├── utils/
│   └── response.ts     # Helpers de respuesta
├── app.ts             # Configuración de Express
└── server.ts          # Punto de entrada
```

## ⚙️ Configuración

1. **Instalar dependencias**:
```bash
npm install
```

2. **Configurar variables de entorno**:
Crea un archivo `.env` en la raíz del proyecto:
```env
PORT=3000
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

3. **Sincronizar la base de datos**:
```bash
npm run dev
```
(La sincronización automática creará las tablas)

## 🚀 Uso

### Iniciar el servidor
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

### Endpoints de la API

#### **GET** `/api/users`
Obtener todos los usuarios con paginación.

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10, max: 100)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid-here",
        "name": "Juan Pérez",
        "email": "juan@email.com",
        "avatarUrl": "https://example.com/avatar.jpg",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrev": false
    }
  }
}
```

#### **GET** `/api/users/:id`
Obtener un usuario específico por ID.

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "avatarUrl": "https://example.com/avatar.jpg",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### **POST** `/api/users`
Crear un nuevo usuario.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Validaciones:**
- `name`: Requerido, mínimo 2 caracteres
- `email`: Requerido, formato válido, único
- `avatarUrl`: Opcional, debe ser URL válida si se proporciona

#### **PUT** `/api/users/:id`
Actualizar un usuario existente.

**Body** (todos los campos son opcionales):
```json
{
  "name": "Juan Pérez Actualizado",
  "email": "juan.nuevo@email.com",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

#### **DELETE** `/api/users/:id`
Eliminar un usuario.

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": null
}
```

### Respuestas de Error

**Formato estándar:**
```json
{
  "success": false,
  "error": "Descripción del error",
  "details": null
}
```

**Códigos de estado comunes:**
- `400`: Bad Request (validación fallida)
- `404`: Not Found (usuario no encontrado)
- `409`: Conflict (email ya existe)
- `500`: Internal Server Error

## 🔧 Desarrollo

### Scripts disponibles
```bash
npm run dev        # Iniciar en modo desarrollo
npm run build      # Compilar TypeScript
npm start         # Iniciar en modo producción
npm run test      # Ejecutar pruebas (por configurar)
```

### Estructura de validación
El proyecto utiliza **Zod** para validación de entrada y **Sequelize** para validación de modelo:

```typescript
// Validación de entrada con Zod
const createUserSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  avatarUrl: z.string().url('URL inválida').optional()
});

// Validación de modelo con Sequelize
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});
```

## 🎯 Próximos pasos

- [ ] Implementar autenticación JWT
- [ ] Añadir pruebas unitarias
- [ ] Configurar CI/CD
- [ ] Añadir logging estructurado
- [ ] Implementar rate limiting
- [ ] Documentación con Swagger

## 📝 Notas del desarrollo

Este proyecto fue desarrollado como parte de una prueba técnica, priorizando:
- **Aprendizaje de Sequelize**: Primera implementación usando este ORM
- **Arquitectura limpia**: Separación clara de responsabilidades
- **Mejores prácticas**: Validación, manejo de errores, paginación
- **Código mantenible**: TypeScript y estructura modular

---

*Desarrollado con ❤️ para aprender y crecer como desarrollador*
# 🛢️ Sistema de Gestión de Pozos Petroleros

Una aplicación fullstack moderna para la gestión y monitoreo de pozos petroleros, desarrollada con Angular 20 y Node.js/TypeScript.

## 📋 Características Principales

- **Gestión de Pozos**: Crear, listar y actualizar estados de pozos petroleros
- **Estadísticas en Tiempo Real**: Visualización de porcentajes y producción diaria
- **Conversión de Unidades**: Barriles, galones y litros automáticamente
- **Interfaz Minimalista**: Diseño limpio y profesional sin distracciones
- **API RESTful**: Backend robusto con validación de datos
- **Base de Datos**: PostgreSQL para almacenamiento persistente

## 🏗️ Arquitectura del Proyecto

```
gestion_pozos/
├── frontend/               # Aplicación Angular 20
│   └── gestion-pozos/
│       ├── src/
│       │   ├── app/
│       │   │   ├── pozos-lista/      # Componente tabla de pozos
│       │   │   ├── agregar-pozo/     # Formulario nuevo pozo
│       │   │   ├── estadisticas/     # Dashboard de métricas
│       │   │   ├── shared/
│       │   │   │   ├── pipes/        # Pipe de conversión unidades
│       │   │   │   └── directives/   # Directiva highlight estado
│       │   │   └── pozo.service.ts   # Servicio HTTP API
│       │   └── styles.scss           # Estilos globales minimalistas
│       └── package.json
├── backend/                # Servidor Express + TypeScript
│   ├── src/
│   │   ├── models/         # Modelos de datos PostgreSQL
│   │   ├── routes/         # Endpoints RESTful
│   │   └── app.ts          # Configuración servidor
│   └── package.json
└── README.md
```

## 🚀 Tecnologías Utilizadas

### Frontend
- **Angular 20** - Framework principal con componentes standalone
- **TypeScript** - Tipado estático y mejores prácticas
- **SCSS** - Estilos organizados y modulares
- **RxJS** - Programación reactiva con Observables
- **HTTP Client** - Comunicación con API backend

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **TypeScript** - Desarrollo tipado en backend
- **PostgreSQL** - Base de datos relacional
- **CORS** - Configuración de seguridad cross-origin

### Herramientas
- **ts-node** - Ejecución directa de TypeScript
- **Angular CLI** - Herramientas de desarrollo
- **npm** - Gestión de dependencias

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- PostgreSQL 12+
- npm 8+
- Angular CLI 20+

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd gestion_pozos
```

### 2. Configurar la base de datos
```sql
-- Crear base de datos
CREATE DATABASE gestion_pozos;

-- Crear tabla pozos
CREATE TABLE pozos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    produccion_diaria NUMERIC NOT NULL,
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('activo', 'inactivo', 'mantenimiento'))
);

-- Insertar datos de ejemplo
INSERT INTO pozos (nombre, ubicacion, produccion_diaria, estado) VALUES
('Pozo A', 'Ubicacion A', 100, 'activo'),
('Pozo B', 'Ubicacion B', 150, 'activo'),
('Pozo C', 'Ubicacion C', 200, 'inactivo'),
('Pozo D', 'Ubicacion D', 250, 'activo'),
('Pozo E', 'Ubicacion E', 300, 'inactivo');
```

### 3. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 4. Configurar variables de entorno del backend
Editar `src/models/Pozo.ts` con tus credenciales de PostgreSQL:
```typescript
const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'gestion_pozos',
  password: 'tu_password',
  port: 5432,
});
```

### 5. Instalar dependencias del frontend
```bash
cd ../frontend/gestion-pozos
npm install
```

## 🎯 Ejecución del Proyecto

### Iniciar el backend (Terminal 1)
```bash
cd backend
npm run dev
```
Servidor disponible en: `http://localhost:3000`

### Iniciar el frontend (Terminal 2)
```bash
cd frontend/gestion-pozos
ng serve
```
Aplicación disponible en: `http://localhost:4200`

## 🔗 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/pozos` | Obtener todos los pozos |
| POST | `/api/pozos` | Crear nuevo pozo |
| PATCH | `/api/pozos/:id` | Actualizar estado de pozo |
| GET | `/health` | Health check del servidor |

### Ejemplo de payload para crear pozo:
```json
{
  "nombre": "Pozo F",
  "ubicacion": "Ubicación Norte",
  "produccion_diaria": 350,
  "estado": "activo"
}
```

## 🎨 Características del Frontend

### Componentes Implementados

1. **Lista de Pozos (`pozos-lista`)**
   - Tabla minimalista con datos en tiempo real
   - Botones para cambiar estado (activo/inactivo)
   - Directiva personalizada para highlight de filas
   - Selector de unidades de producción

2. **Agregar Pozo (`agregar-pozo`)**
   - Formulario reactivo con validaciones
   - Mensajes de éxito/error
   - Integración con API backend

3. **Estadísticas (`estadisticas`)**
   - Dashboard sin tarjetas, diseño limpio
   - Porcentajes de pozos activos/inactivos
   - Conversión automática de unidades
   - Datos reactivos con Observables

### Pipes y Directivas Personalizadas

- **`produccionUnidades`**: Convierte entre barriles, galones y litros
- **`estadoHighlight`**: Resalta filas según el estado del pozo

## 📊 Funcionalidades Principales

- ✅ **CRUD completo** de pozos petroleros
- ✅ **Cambio de estado** en tiempo real (activo ↔ inactivo)
- ✅ **Estadísticas dinámicas** con porcentajes visuales
- ✅ **Conversión de unidades** automática
- ✅ **Validación de datos** en frontend y backend
- ✅ **Diseño responsive** y minimalista
- ✅ **Programación reactiva** con RxJS
- ✅ **Arquitectura modular** y escalable

## 🔧 Scripts Disponibles

### Backend
- `npm run dev` - Iniciar servidor en modo desarrollo
- `npm run build` - Compilar TypeScript a JavaScript
- `npm start` - Iniciar servidor en producción

### Frontend
- `ng serve` - Servidor de desarrollo
- `ng build` - Build para producción
- `ng test` - Ejecutar tests unitarios

## 🏛️ Arquitectura de Componentes

```
AppComponent
├── PozoListaComponent (Lista principal)
│   ├── ProduccionUnidadesPipe
│   └── EstadoHighlightDirective
├── AgregarPozoComponent (Formulario)
└── EstadisticasComponent (Dashboard)
    └── ProduccionUnidadesPipe
```

## 🔐 Consideraciones de Seguridad

- Validación de datos en backend
- Sanitización de inputs en frontend
- CORS configurado apropiadamente
- Manejo de errores consistente

## 🚀 Despliegue

### Producción
1. Build del frontend: `ng build --configuration production`
2. Build del backend: `npm run build`
3. Configurar variables de entorno de producción
4. Servir archivos estáticos desde Express

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Leonardo Quishpe**
- GitHub: [@leog3019](https://github.com/leog3019)
- Email: leonardo.quishpe@epn.edu.ec

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella en GitHub!

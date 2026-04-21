# Gatekeeper System — Frontend

Frontend desarrollado con **React + TypeScript + Tailwind CSS** como parte del Examen Práctico Integrador de las Materias Sistemas Abiertos II y Inteligencia Artificial II
## Descripción

Interfaz web que permite a los alumnos ITSES verificar su acceso mediante su correo institucional y folio de pago. Implementa lógica de polling automático y contenido protegido.

## Stack Tecnológico

- **Framework:** React 19
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **HTTP Client:** Axios
- **Build Tool:** Vite

## Estructura del proyecto
src/
├── api/
│   └── pagos.ts              # Llamadas al backend
├── components/
│   └── Gafete.tsx            # Componente de gafete digital (contenido protegido)
├── hooks/
│   └── useVerificarPago.ts   # Hook con lógica de polling
├── pages/
│   └── Home.tsx              # Página principal
├── App.tsx
├── main.tsx
└── index.css

## Funcionalidades principales

### 1. Formulario de acceso
Captura el correo institucional `@itses.edu.mx` y el folio de pago. Valida que el correo sea institucional antes de enviar la solicitud.

### 2. Lógica de Polling
El hook `useVerificarPago` consulta automáticamente el endpoint `GET /api/pagos/verificar-estatus/:email` cada **7 segundos** mientras el estatus sea `"Procesando"`, sin intervención del usuario.

```typescript
// Polling automático cada 7 segundos
intervaloRef.current = setInterval(consultar, 7000);
```

### 3. Contenido Protegido
El **Gafete Digital** solo se renderiza si el estatus recibido de la API es estrictamente `"Aceptado"`. Cualquier otro valor muestra su mensaje correspondiente.

```typescript
{/* Contenido protegido — solo renderiza si estatus === 'Aceptado' */}
{estatus === 'Aceptado' && (
  <Gafete datos={{ estatus: 'Aceptado', email: form.email, folio: form.folio }} />
)}
```

## Instalación y configuración

### 1. Clona el repositorio
```bash
git clone https://github.com/IngOscar19/Frontend-SA2.git
cd Frontend-SA2
```

### 2. Instala dependencias
```bash
npm install
```

### 3. Configura las variables de entorno
Crea un archivo `.env` en la raíz:
```env
VITE_API_URL=http://localhost:3000
```

### 4. Inicia el servidor de desarrollo
```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## 🔄 Flujo de la interfaz
Usuario llena correo + folio
↓
Validación: ¿correo @itses.edu.mx?
↓ NO → Muestra error en formulario
↓ SÍ
POST /api/pagos/solicitar-acceso
↓
Spinner + Polling cada 7s
GET /api/pagos/verificar-estatus/:email
↓
estatus = "Aceptado"   → 🎫 Gafete Digital (CONTENIDO PROTEGIDO)
estatus = "Rechazado"  → ❌ Mensaje de acceso denegado
estatus = "Procesando" → 🔄 Sigue el polling


## Estados de la aplicación

| Estatus | Descripción | Vista |
|---------|-------------|-------|
| `IDLE` | Estado inicial | Formulario |
| `PROCESANDO` | Esperando respuesta de n8n | Spinner + polling |
| `Aceptado` | Folio válido verificado | Gafete Digital 🎫 |
| `Rechazado` | Folio inválido o ya usado | Mensaje de error ❌ |
| `ERROR` | Fallo de conexión | Mensaje de error con reintento |

## Autor

**Oscar Espinosa**
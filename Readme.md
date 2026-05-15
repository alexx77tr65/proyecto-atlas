# Proyecto Atlas

Este proyecto es una aplicación web simple basada en FastAPI, con una interfaz de usuario estática que incluye:

- página de login inicial
- panel principal tipo dashboard
- sección para subir archivos en el frontend
- páginas institucionales: Comunicados, Calendario y Bienestar
- soporte para estilos y scripts estáticos

## Estructura del proyecto

- `main.py`: servidor FastAPI que sirve plantillas HTML y archivos estáticos.
- `templates/`: contiene las páginas del sitio en formato HTML.
  - `index.html`: página de inicio con login.
  - `index2.html`: dashboard después del login.
  - `comunicados.html`: página de comunicados institucionales.
  - `calendario.html`: página de calendario académico.
  - `bienestar.html`: página de bienestar estudiantil.
- `static/`: contiene CSS y JS del frontend.
  - `styles.css`: estilos generales, diseño responsivo y modo oscuro.
  - `login.js`: lógica de validación y redirección del login.
  - `dashboard.js`: interacción de panel, búsqueda y subida de archivos.
  - `sidebar.js`: comportamiento del menú lateral.
- `.venv/`: entorno virtual Python con dependencias instaladas.

## Instalación y configuración

1. Crear y activar el entorno virtual:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Instalar dependencias:

   ```bash
   pip install -r requirements.txt
   ```

3. Verificar que `main.py` esté presente:

   ```bash
   ls main.py templates static
   ```

## Ejecución

Para iniciar el servidor en modo de desarrollo:

```bash
uvicorn main:app --reload
```

Luego abrir el navegador en:

- `http://localhost:8000/` → login inicial
- `http://localhost:8000/index2` → panel/dashboard
- `http://localhost:8000/comunicados` → página de comunicados
- `http://localhost:8000/calendario` → página de calendario
- `http://localhost:8000/bienestar` → página de bienestar

## Rutas definidas

- `/` y `/index.html`: acceso a `index.html`
- `/index2` y `/index2.html`: acceso a `index2.html`
- `/comunicados`: acceso a `comunicados.html`
- `/calendario`: acceso a `calendario.html`
- `/bienestar`: acceso a `bienestar.html`

## Funcionalidades principales

- Login básico con validación de email y contraseña en el frontend.
- Navegación entre páginas institucionales.
- Dashboard con secciones de:
  - archivos recientes
  - subida de archivos con drag & drop
  - datos del proyecto y equipo
  - accesos rápidos a comunicados, calendario y bienestar.
- Estilos modernos con diseño responsivo y modo oscuro automático.

## Siguientes mejoras sugeridas

- Implementar backend real para guardar archivos subidos.
- Añadir autenticación completa con sesiones o JWT.
- Conectar con una base de datos para contenido dinámico.
- Mejorar la experiencia móvil con un menú responsive adicional.

## Notas adicionales

- Actualmente la subida de archivos funciona en el frontend para vista previa, pero no guarda archivos en el servidor.
- Las páginas HTML están renderizadas como plantillas estáticas desde `FastAPI`.


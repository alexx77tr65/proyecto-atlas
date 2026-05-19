from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

# Configuración de carpetas
BASE_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "static"
UPLOAD_DIR = BASE_DIR / "uploads"

# Asegurar que las carpetas existan al arrancar la app
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI()

# Servir archivos estáticos
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

def template_response(filename: str) -> FileResponse:
    path = TEMPLATES_DIR / filename
    if not path.exists():
        # Mensaje de error en español si la página no existe
        raise HTTPException(status_code=404, detail="Página no encontrada")
    return FileResponse(path, media_type="text/html")

# --- RUTAS DE NAVEGACIÓN ---

@app.get("/")
async def root():
    return template_response("index.html")

# Ruta dinámica: Captura cualquier página (ej: /calendario, /bienestar)
@app.get("/{page_name}")
async def render_page(page_name: str):
    # Si el usuario no escribe el .html, se lo agregamos automáticamente
    if not page_name.endswith(".html"):
        filename = f"{page_name}.html"
    else:
        filename = page_name
        
    return template_response(filename)

# --- SUBIDA DE ARCHIVOS ---

@app.post("/upload")
async def upload_files(files: list[UploadFile] = File(...)):
    archivos_guardados = []
    
    for upload in files:
        # Reemplazamos espacios por guiones bajos para evitar problemas en URLs
        nombre_limpio = upload.filename.replace(" ", "_")
        destination = UPLOAD_DIR / nombre_limpio
        
        # Leer y guardar el archivo
        content = await upload.read()
        destination.write_bytes(content)
        
        # Información del archivo con claves en español
        archivos_guardados.append({
            "nombre_archivo": nombre_limpio,
            "tipo_contenido": upload.content_type,
            "url": f"/uploads/{nombre_limpio}",
            "tamano_bytes": len(content)
        })
        
    return {"exito": True, "archivos": archivos_guardados}
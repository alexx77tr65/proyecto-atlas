from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
TEMPLATES_DIR = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "static"
UPLOAD_DIR = BASE_DIR / "uploads"


app = FastAPI()

# Servir archivos estáticos: CSS, JS e imágenes
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

def template_response(filename: str) -> FileResponse:
    return FileResponse(TEMPLATES_DIR / filename, media_type="text/html")

@app.get("/")
async def root():
    return template_response("index.html")

@app.get("/index2")
async def index2():
    return template_response("index2.html")

@app.get("/index2.html")
async def index2_html():
    return template_response("index2.html")

@app.get("/comunicados")
async def comunicados():
    return template_response("comunicados.html")

@app.get("/comunicados.html")
async def comunicados_html():
    return template_response("comunicados.html")

@app.get("/calendario")
async def calendario():
    return template_response("calendario.html")

@app.get("/calendario.html")
async def calendario_html():
    return template_response("calendario.html")

@app.get("/bienestar")
async def bienestar():
    return template_response("bienestar.html")

@app.get("/bienestar.html")
async def bienestar_html():
    return template_response("bienestar.html")

@app.post("/upload")
async def upload_files(files: list[UploadFile] = File(...)):
    saved_files = []
    for upload in files:
        destination = UPLOAD_DIR / upload.filename
        content = await upload.read()
        destination.write_bytes(content)
        saved_files.append({
            "filename": upload.filename,
            "content_type": upload.content_type,
            "size": len(content)
        })
    return {"success": True, "files": saved_files}

    

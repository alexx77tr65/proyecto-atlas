// Función para manejar la selección de archivos
function handleFileSelect(event) {
    const files = event.target.files;
    const fileList = document.getElementById('archivo-lista');
    const emptyMessage = document.getElementById('archivo-empty');
    
    // Limpiar la lista actual
    fileList.innerHTML = '';
    
    if (files.length > 0) {
        emptyMessage.style.display = 'none';
        
        // Crear elemento de lista para cada archivo
        Array.from(files).forEach(file => {
            const li = document.createElement('li');
            li.className = 'archivo-item';
            
            // Formatear el tamaño del archivo
            const size = formatFileSize(file.size);
            
            // Crear contenido del elemento de lista
            li.innerHTML = `
                <div class="archivo-info">
                    <span class="archivo-nombre">${file.name}</span>
                    <span class="archivo-tipo">${file.type || 'Desconocido'}</span>
                    <span class="archivo-tamaño">${size}</span>
                </div>
                <div class="archivo-progreso">
                    <div class="barra-progreso"></div>
                    <span class="porcentaje">0%</span>
                </div>
            `;
            
            fileList.appendChild(li);
        });
        
        // Mostrar el botón de subida
        document.getElementById('btn-subir').style.display = 'block';
    } else {
        emptyMessage.style.display = 'block';
        document.getElementById('btn-subir').style.display = 'none';
    }
}

// Función para formatear el tamaño del archivo
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Función para subir archivos
async function uploadFiles() {
    const fileInput = document.getElementById('archivo');
    const files = fileInput.files;
    const fileList = document.getElementById('archivo-lista');
    const items = fileList.getElementsByClassName('archivo-item');
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const item = items[i];
        const progressBar = item.querySelector('.barra-progreso');
        const percentageText = item.querySelector('.porcentaje');
        
        try {
            // Simular una subida con progreso
            // Aquí deberías reemplazar esto con tu lógica real de subida
            await simulateFileUpload(file, (progress) => {
                progressBar.style.width = `${progress}%`;
                percentageText.textContent = `${progress}%`;
                
                if (progress === 100) {
                    item.classList.add('subido');
                }
            });
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            item.classList.add('error');
        }
    }
}

// Función para simular la subida de un archivo
function simulateFileUpload(file, progressCallback) {
    return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 100) progress = 100;
            
            progressCallback(Math.floor(progress));
            
            if (progress === 100) {
                clearInterval(interval);
                resolve();
            }
        }, 500);
    });
}

// Inicializar los event listeners cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('archivo');
    const uploadButton = document.getElementById('btn-subir');
    
    fileInput.addEventListener('change', handleFileSelect);
    uploadButton.addEventListener('click', uploadFiles);
});
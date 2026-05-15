// Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
  initializeSearch();
  initializeUploadSection();
  initializeCardInteractions();
});

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById('busqueda');
  const searchBtn = document.getElementById('searchBtn');
  const cards = document.querySelectorAll('.card');
  
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      cards.forEach(card => card.style.display = '');
      return;
    }
    
    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent.toLowerCase() || '';
      const small = card.querySelector('small')?.textContent.toLowerCase() || '';
      
      if (title.includes(searchTerm) || description.includes(searchTerm) || small.includes(searchTerm)) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  searchInput.addEventListener('input', function(e) {
    if (e.target.value === '') {
      cards.forEach(card => card.style.display = '');
    }
  });
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .card {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
    z-index: 1;
  }
  
  .card:hover::before {
    left: 100%;
  }
`;
document.head.appendChild(style);

// Card interactions
function initializeCardInteractions() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('h3')?.textContent || 'Sin título';
      const message = `Abriendo: ${title}`;
      console.log(message);
      // Add visual feedback
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
}

// Upload section handler
function initializeUploadSection() {
  const uploadBox = document.getElementById('uploadBox');
  const uploadInput = document.getElementById('uploadFile');
  const uploadButton = document.getElementById('uploadButton');
  const fileList = document.getElementById('fileList');
  const initialListItem = '<li>No hay archivos seleccionados aún.</li>';
  let selectedFiles = [];

  function renderFiles() {
    if (selectedFiles.length === 0) {
      fileList.innerHTML = initialListItem;
      return;
    }

    fileList.innerHTML = selectedFiles.map((file, index) => `
      <li>
        <span>${file.name} <small>(${Math.round(file.size / 1024)} KB)</small></span>
        <button type="button" class="file-remove" data-index="${index}">Eliminar</button>
      </li>
    `).join('');
  }

  function updateFiles(files) {
    const newFiles = Array.from(files);
    selectedFiles = selectedFiles.concat(newFiles);
    renderFiles();
  }

  uploadBox.addEventListener('click', () => uploadInput.click());
  uploadButton.addEventListener('click', () => uploadInput.click());

  uploadBox.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadBox.style.borderColor = '#1d4ed8';
    uploadBox.style.background = 'rgba(37, 99, 235, 0.1)';
  });

  uploadBox.addEventListener('dragleave', function() {
    uploadBox.style.borderColor = 'var(--border)';
    uploadBox.style.background = 'rgba(56, 189, 248, 0.05)';
  });

  uploadBox.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadBox.style.borderColor = 'var(--accent)';
    uploadBox.style.background = 'rgba(37, 99, 235, 0.08)';
    if (e.dataTransfer.files.length > 0) {
      updateFiles(e.dataTransfer.files);
    }
  });

  uploadInput.addEventListener('change', function() {
    if (this.files.length > 0) {
      updateFiles(this.files);
    }
  });

  fileList.addEventListener('click', function(event) {
    if (event.target.matches('.file-remove')) {
      const index = Number(event.target.dataset.index);
      selectedFiles.splice(index, 1);
      renderFiles();
    }
  });

  const sendUploadButton = document.getElementById('sendUploadButton');
  const uploadResult = document.getElementById('uploadResult');

  async function uploadSelectedFiles() {
    if (selectedFiles.length === 0) {
      uploadResult.textContent = 'Selecciona primero al menos un archivo.';
      uploadResult.style.color = '#f97316';
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));
    uploadResult.textContent = 'Subiendo archivos...';
    uploadResult.style.color = 'var(--text)';

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (response.ok && data.success) {
        uploadResult.textContent = `Se subieron ${data.files.length} archivos correctamente.`;
        uploadResult.style.color = '#10b981';
        selectedFiles = [];
        renderFiles();
      } else {
        uploadResult.textContent = data.detail || 'Error al subir los archivos.';
        uploadResult.style.color = '#ef4444';
      }
    } catch (error) {
      uploadResult.textContent = 'No se pudo conectar con el servidor.';
      uploadResult.style.color = '#ef4444';
    }
  }

  if (sendUploadButton) {
    sendUploadButton.addEventListener('click', uploadSelectedFiles);
  }

  renderFiles();
}

// File upload handler
const fileInput = document.getElementById('archivo');
const fileLabel = document.querySelector('label[for="archivo"]');

if (fileInput && fileLabel) {
  fileInput.addEventListener('change', function(e) {
    if (this.files.length > 0) {
      const filename = this.files[0].name;
      fileLabel.textContent = `✓ ${filename}`;
      fileLabel.style.background = '#10b981';
      fileLabel.style.color = 'white';
      
      setTimeout(() => {
        fileLabel.textContent = 'Subir archivo';
        fileLabel.style.background = '';
        fileLabel.style.color = '';
      }, 3000);
    }
  });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

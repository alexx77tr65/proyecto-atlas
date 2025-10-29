// Manejo del modo oscuro
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('theme-switch');
    const themeIcon = themeSwitch.querySelector('i');

    // Verificar si hay un tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeSwitch.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Búsqueda de archivos
    const buscarInput = document.getElementById('buscar-input');
    const filtroTipo = document.getElementById('filtro-tipo');
    const filtroFecha = document.getElementById('filtro-fecha');
    const resultadosContainer = document.getElementById('resultados-busqueda');

    // Array de ejemplo con archivos (reemplazar con datos reales)
    const archivos = [
        { nombre: 'Informe_2023.pdf', tipo: 'pdf', fecha: '2023-10-28', tamaño: '2.5 MB' },
        { nombre: 'Presentacion.pptx', tipo: 'ppt', fecha: '2023-10-27', tamaño: '5.1 MB' },
        { nombre: 'Datos.xlsx', tipo: 'xls', fecha: '2023-10-26', tamaño: '1.2 MB' },
        { nombre: 'Documento.docx', tipo: 'doc', fecha: '2023-10-25', tamaño: '3.7 MB' }
    ];

    function buscarArchivos() {
        const busqueda = buscarInput.value.toLowerCase();
        const tipo = filtroTipo.value;
        const fecha = filtroFecha.value;

        const resultados = archivos.filter(archivo => {
            const coincideNombre = archivo.nombre.toLowerCase().includes(busqueda);
            const coincideTipo = !tipo || archivo.tipo.includes(tipo);
            const coincideFecha = !fecha || cumpleFiltroFecha(archivo.fecha, fecha);
            return coincideNombre && coincideTipo && coincideFecha;
        });

        mostrarResultados(resultados);
    }

    function cumpleFiltroFecha(fechaArchivo, filtro) {
        const fecha = new Date(fechaArchivo);
        const hoy = new Date();
        
        switch(filtro) {
            case 'hoy':
                return fecha.toDateString() === hoy.toDateString();
            case 'semana':
                const unaSemanaMenos = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
                return fecha >= unaSemanaMenos;
            case 'mes':
                return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
            default:
                return true;
        }
    }

    function mostrarResultados(resultados) {
        resultadosContainer.innerHTML = '';
        
        if (resultados.length === 0) {
            resultadosContainer.innerHTML = '<p class="no-resultados">No se encontraron archivos</p>';
            return;
        }

        resultados.forEach(archivo => {
            const iconoTipo = obtenerIconoTipo(archivo.tipo);
            const elemento = document.createElement('div');
            elemento.className = 'resultado-item';
            elemento.innerHTML = `
                <i class="resultado-icon ${iconoTipo}"></i>
                <div class="resultado-info">
                    <div class="resultado-nombre">${archivo.nombre}</div>
                    <div class="resultado-meta">
                        ${archivo.tamaño} · ${formatearFecha(archivo.fecha)}
                    </div>
                </div>
            `;
            resultadosContainer.appendChild(elemento);
        });
    }

    function obtenerIconoTipo(tipo) {
        switch(tipo) {
            case 'pdf': return 'fas fa-file-pdf';
            case 'doc': return 'fas fa-file-word';
            case 'xls': return 'fas fa-file-excel';
            case 'ppt': return 'fas fa-file-powerpoint';
            default: return 'fas fa-file';
        }
    }

    function formatearFecha(fecha) {
        return new Date(fecha).toLocaleDateString();
    }

    // Event listeners para la búsqueda
    buscarInput.addEventListener('input', buscarArchivos);
    filtroTipo.addEventListener('change', buscarArchivos);
    filtroFecha.addEventListener('change', buscarArchivos);

    // Búsqueda inicial
    buscarArchivos();
});
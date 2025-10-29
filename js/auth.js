document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const appNavContainer = document.getElementById('app-nav-container');
    const appNavLinks = document.querySelectorAll('#app-nav a');
    const appSections = document.querySelectorAll('main .panel');
    const defaultSectionId = 'seccion-recopilador';
    const btnLoginHeader = document.getElementById('btn-login-header');
    const authContainer = document.getElementById('auth-sections');

    // Credenciales predefinidas
    const defaultCredentials = {
        username: "1",
        password: "1"
    };

    // Función para mostrar secciones
    function showSection(targetId) {
        // Oculta todas las secciones
        appSections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });
        
        // Muestra la sección deseada
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
        }

        // Actualiza navegación
        appNavLinks.forEach(link => {
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Manejo del formulario de inicio de sesión
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (username === defaultCredentials.username && password === defaultCredentials.password) {
            // Login exitoso
            authContainer.style.display = 'none';
            appNavContainer.style.display = 'block';
            
            // Mostrar la sección principal
            showSection(defaultSectionId);
            
            // Cambiar el botón del header
            btnLoginHeader.textContent = 'Cerrar Sesión';
            btnLoginHeader.setAttribute('href', '#');
            
            // Limpiar formulario
            loginForm.reset();
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    // Gestión de la navegación
    appNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            showSection(targetId);
        });
    });

    // Gestión del botón de cerrar sesión
    btnLoginHeader.addEventListener('click', function(e) {
        if (btnLoginHeader.textContent === 'Cerrar Sesión') {
            e.preventDefault();
            // Ocultar contenido de la aplicación
            appNavContainer.style.display = 'none';
            appSections.forEach(section => section.style.display = 'none');
            
            // Mostrar login
            authContainer.style.display = 'block';
            
            // Restablecer botón
            btnLoginHeader.textContent = 'Inicio de Sesión';
            btnLoginHeader.classList.add('active');
        }
    });

    // Manejo de las pestañas de autenticación
    const authTabs = document.querySelectorAll('.auth-tab');
    const authPanels = document.querySelectorAll('.auth-panel');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            authPanels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            const targetPanel = document.getElementById(`${tab.dataset.tab}-panel`);
            targetPanel.classList.add('active');
        });
    });

    // Configuración inicial
    appSections.forEach(section => section.style.display = 'none');
    authContainer.style.display = 'block';
    appNavContainer.style.display = 'none';

    // Manejo del formulario de registro
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        // Validaciones básicas
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Aquí puedes agregar tu lógica de registro
        console.log('Registro:', { username, email, password });
        
        // Limpiar el formulario
        registerForm.reset();
        
        // Cambiar a la pestaña de inicio de sesión
        document.querySelector('[data-tab="login"]').click();
    });
});
// Login Form Validation
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');

// Email validation
emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', () => {
  if (emailError.classList.contains('show')) {
    validateEmail();
  }
});

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    emailError.textContent = 'El correo es requerido';
    emailError.classList.add('show');
    return false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = 'Ingresa un correo válido';
    emailError.classList.add('show');
    return false;
  } else {
    emailError.classList.remove('show');
    return true;
  }
}

// Password validation
passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('input', () => {
  if (passwordError.classList.contains('show')) {
    validatePassword();
  }
});

function validatePassword() {
  const password = passwordInput.value;
  
  if (!password) {
    passwordError.textContent = 'La contraseña es requerida';
    passwordError.classList.add('show');
    return false;
  } else if (password.length < 6) {
    passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
    passwordError.classList.add('show');
    return false;
  } else {
    passwordError.classList.remove('show');
    return true;
  }
}

// Form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Validate both fields
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  
  if (!emailValid || !passwordValid) {
    return;
  }
  
  // Show success message and redirect
  successMessage.classList.add('show');
  
  // Simulate API call (replace with real authentication later)
  setTimeout(() => {
    window.location.href = '/index2';
  }, 1500);
});

// Clear error when user starts typing
[emailInput, passwordInput].forEach(input => {
  input.addEventListener('focus', function() {
    if (this === emailInput) {
      emailError.classList.remove('show');
    } else {
      passwordError.classList.remove('show');
    }
  });
});

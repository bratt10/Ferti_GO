document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const mensajeDiv = document.getElementById("mensaje");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      mostrarMensaje("❌ Completa todos los campos.", "error");
      return;
    }

    const datos = {
      email: email,
      contraseña: password
    };

    // Mostrar loading
    mostrarMensaje("⏳ Iniciando sesión...", "info");

    try {
      // Usar la URL de Railway (o localhost si estás en desarrollo)
      const API_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:8080' 
        : 'https://fertigo-production.up.railway.app';

      const response = await fetch(`${API_URL}/usuario/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      if (response.ok) {
        const usuario = await response.json();
        mostrarMensaje("✅ ¡Inicio de sesión exitoso!", "success");
        
        // Guardar datos del usuario si es necesario
        // localStorage.setItem('usuario', JSON.stringify(usuario));
        
        // Redirigir al dashboard después de 1 segundo
        setTimeout(() => {
          window.location.href = "/dashboard/dashboard.html";
        }, 1000);
      } else if (response.status === 401) {
        mostrarMensaje("⚠️ Credenciales inválidas o no tienes permisos.", "error");
      } else {
        const errorText = await response.text();
        mostrarMensaje("❌ Error: " + errorText, "error");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      mostrarMensaje("🚨 Error de conexión con el servidor: " + err.message, "error");
    }
  });

  function mostrarMensaje(texto, tipo) {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = tipo;
    mensajeDiv.style.display = "block";
  }
});
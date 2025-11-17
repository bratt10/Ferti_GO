document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("❌ Completa todos los campos.");
      return;
    }

    const datos = {
      email: email,
      contraseña: password
    };

    try {
      // Llamada al backend
      const response = await fetch("http://localhost:8080/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      if (response.ok) {
        const usuario = await response.json();
        // Redirigir al dashboard
        window.location.href = "../dashboard/dashboard.html";  
      } else if (response.status === 401) {
        alert("⚠️ Credenciales inválidas o no tienes permisos.");
      } else {
        const errorText = await response.text();
        alert("❌ Error: " + errorText);
      }
    } catch (err) {
      alert("🚨 Error de conexión con el servidor: " + err.message);
    }
  });
});

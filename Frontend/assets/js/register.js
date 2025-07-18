(() => {
  const form = document.getElementById("register-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("register-name").value.trim();
      const correo = document.getElementById("register-email").value.trim();
      const contrasena = document
        .getElementById("register-password")
        .value.trim();

      try {
        const res = await fetch("http://localhost:3000/api/v1/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, correo, contrasena }),
        });

        const data = await res.json();

        if (res.ok) {
          alert("Registro exitoso. Ahora inicia sesión.");
          window.location.href = "login.html";
        } else {
          alert(data.mensaje || "Error al registrar.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error de red o del servidor.");
      }
    });
  }
})();

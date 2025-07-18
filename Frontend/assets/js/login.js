(function () {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user_" + email));
    if (storedUser && storedUser.password === password) {
      alert("Bienvenido " + storedUser.name);
      window.location.href = "index.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
})();
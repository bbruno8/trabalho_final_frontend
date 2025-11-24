// Toggle mostrar/ocultar senha
const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");
const telefone = document.getElementById("telefone");
const msg = document.getElementById("copiado-msg");
const numero = "(31) 9 9945-5642";  

toggleSenha.addEventListener("click", () => {
    const tipo = senhaInput.getAttribute("type") === "password" ? "text" : "password";
    senhaInput.setAttribute("type", tipo);
});

// Validação simples do formulário
const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = senhaInput.value;

    if (!email.includes("@") || !email.includes(".com")) {
        alert("E-mail inválido!");
        return;
    }

    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    alert("Login bem-sucedido! Redirecionando...");
    window.location.href = "home.html";
});

  telefone.addEventListener("click", () => {
    navigator.clipboard.writeText(numero).then(() => {
      msg.style.opacity = "1";
      setTimeout(() => {
        msg.style.opacity = "0";
      }, 1500);
    });
  });
// Toggle mostrar/ocultar senha
const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");
const telefone = document.getElementById("telefone");
const msg = document.getElementById("copiado-msg");
const numero = "(31) 9 9945-5642";
const emailInput = document.getElementById("email");
const btnEntrar = document.querySelector(".btn");

// Função para validar os campos e habilitar/desabilitar o botão
function validarCampos() {
    const emailPreenchido = emailInput.value.trim() !== "";
    const senhaPreenchida = senhaInput.value.trim() !== "";
    
    if (emailPreenchido && senhaPreenchida) {
        btnEntrar.disabled = false;
        btnEntrar.classList.add("ativo");
    } else {
        btnEntrar.disabled = true;
        btnEntrar.classList.remove("ativo");
    }
}

// Desabilitar o botão inicialmente
btnEntrar.disabled = true;

// Adicionar eventos de input para validar em tempo real
emailInput.addEventListener("input", validarCampos);
senhaInput.addEventListener("input", validarCampos);

// Lógica de trocar ícones ao clicar
toggleSenha.addEventListener("click", () => {
    // Verifica o tipo atual e alterna
    if (senhaInput.type === "password") {
        // Mostra a senha
        senhaInput.type = "text";
        toggleSenha.src = "/assets/icones/icone_senha_visivel.png";
        toggleSenha.alt = "Ocultar senha";
    } else {
        // Oculta a senha
        senhaInput.type = "password";
        toggleSenha.src = "/assets/icones/icone_senha_oculta.png";
        toggleSenha.alt = "Mostrar senha";
    }
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
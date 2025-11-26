// === MOSTRAR/OCULTAR SENHA COM TROCA DE IMAGEM ===
function toggleSenhaFunc(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    const img = toggle.querySelector('.icone-senha');
    
    if (input.type === "password") {
        input.type = "text";
        img.src = "/assets/icones/icone_senha_visivel.png";
        img.alt = "Ocultar senha";
    } else {
        input.type = "password";
        img.src = "/assets/icones/icone_senha_oculta.png";
        img.alt = "Mostrar senha";
    }
}

document.getElementById("toggleSenha1").addEventListener("click", () => {
    toggleSenhaFunc("senha", "toggleSenha1");
});

document.getElementById("toggleSenha2").addEventListener("click", () => {
    toggleSenhaFunc("confirmarSenha", "toggleSenha2");
});


// === MÁSCARA DE TELEFONE ===
const telefoneInput = document.getElementById("telefoneInput");

telefoneInput.addEventListener("input", () => {
    let v = telefoneInput.value.replace(/\D/g, "").slice(0, 11);

    if (v.length >= 7) {
        v = v.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
    } else if (v.length >= 3) {
        v = v.replace(/(\d{2})(\d{1,5})/, "($1) $2");
    } else if (v.length >= 1) {
        v = v.replace(/(\d{1,2})/, "($1");
    }

    telefoneInput.value = v;
});


// === MÁSCARA DE DATA ===
const nascimento = document.getElementById("nascimento");

nascimento.addEventListener("input", () => {
    let v = nascimento.value.replace(/\D/g, "").slice(0, 8);

    if (v.length >= 5) {
        v = v.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    } else if (v.length >= 3) {
        v = v.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }

    nascimento.value = v;
});


// === VALIDAÇÕES ===
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefone() {
    return telefoneInput.value.replace(/\D/g, "").length === 11;
}

function validarData() {
    const valor = nascimento.value;
    if (valor.length !== 10) return false;
    
    const partes = valor.split('/');
    const dia = parseInt(partes[0]);
    const mes = parseInt(partes[1]);
    const ano = parseInt(partes[2]);
    
    if (mes < 1 || mes > 12) return false;
    if (dia < 1 || dia > 31) return false;
    if (ano < 1900 || ano > new Date().getFullYear()) return false;
    
    return true;
}

function validarSenha() {
    const senha = document.getElementById("senha").value;
    return senha.length >= 6;
}

function senhasIguais() {
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmarSenha").value;
    return senha === confirmar && senha !== "";
}


// === HABILITAR/DESABILITAR BOTÃO ===
const botao = document.getElementById("botaoRegistro");

function verificarCampos() {
    const email = document.getElementById("email").value;
    const nome = document.getElementById("nome").value.trim();
    
    const campos = [
        email !== "" && validarEmail(email),
        nome !== "",
        validarTelefone(),
        validarData(),
        validarSenha(),
        senhasIguais()
    ];

    const tudoValido = campos.every(c => c === true);

    if (tudoValido) {
        botao.disabled = false;
        botao.classList.add("ativo");
    } else {
        botao.disabled = true;
        botao.classList.remove("ativo");
    }
}


// === MONITORAR TODOS OS CAMPOS ===
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", verificarCampos);
});


// === BLOQUEAR SUBMIT SE INVÁLIDO ===
document.getElementById("registroForm").addEventListener("submit", e => {
    e.preventDefault();
    
    if (botao.disabled) {
        alert("Preencha todos os campos corretamente.");
        return;
    }
    
    // Aqui você pode adicionar o código para enviar os dados
    const dados = {
        email: document.getElementById("email").value,
        nome: document.getElementById("nome").value,
        telefone: telefoneInput.value,
        nascimento: nascimento.value,
        senha: document.getElementById("senha").value
    };
    
    console.log("Dados do formulário:", dados);
    alert("Registro realizado com sucesso!");
    
    // Limpar formulário após sucesso
    document.getElementById("registroForm").reset();
    verificarCampos();
});


// === COPIAR TELEFONE DO FOOTER ===
document.getElementById("telefone").addEventListener("click", () => {
    const numeroTelefone = "(31) 99999-9999"; // Substitua pelo seu número
    
    navigator.clipboard.writeText(numeroTelefone).then(() => {
        const msg = document.getElementById("copiado-msg");
        msg.classList.add("show");
        
        setTimeout(() => {
            msg.classList.remove("show");
        }, 2000);
    }).catch(err => {
        console.error("Erro ao copiar:", err);
    });
});


// Verificar campos ao carregar a página
verificarCampos();
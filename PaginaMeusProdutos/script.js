document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY_PEDIDOS = 'meusPedidos';
    const telefone = document.getElementById("telefone");
    const msg = document.getElementById("copiado-msg");
    const numero = "(31) 9 9945-5642"; 
   
    const SERVICE_IMAGE_MAP = {
        'Limpeza': 'Limpeza-sistema.png',
        'Atualização de Sistema': 'atualizacao-de-sistema.jpg',
    
    };

    function getServiceImage(serviceName) {
        return SERVICE_IMAGE_MAP[serviceName] || 'produto-default.png';
    }
    
    function getPedidos() {
        const pedidosJSON = localStorage.getItem(STORAGE_KEY_PEDIDOS);
        return pedidosJSON ? JSON.parse(pedidosJSON) : [];
    }
    
    function savePedidos(pedidos) {
        localStorage.setItem(STORAGE_KEY_PEDIDOS, JSON.stringify(pedidos));
    }

    window.adicionarNovoPedido = (nomeServico, codigo, status) => {
        const novoPedido = {
            id: Date.now(),
            nome: nomeServico,
            codigo: codigo,
            status: status,
            data: new Date().toLocaleDateString('pt-BR'),
            imagem: getServiceImage(nomeServico) 
        };

        const pedidosAtuais = getPedidos();
        pedidosAtuais.unshift(novoPedido); 
        savePedidos(pedidosAtuais);
        
        if (document.querySelector('.pagina-pedidos')) {
             renderizarPedidos(); 
        }
    };


    function renderizarPedidos() {
        const listaPedidosContainer = document.querySelector('.lista-pedidos');
        if (!listaPedidosContainer) return;

        const pedidos = getPedidos();
        listaPedidosContainer.innerHTML = '';

        if (pedidos.length === 0) {
            listaPedidosContainer.innerHTML = '<p class="no-pedidos-message">Você ainda não possui pedidos/serviços registrados.</p>';
            return;
        }

        pedidos.forEach(pedido => {
            let statusClass = '';
            let buttonText = 'Ver Detalhes';
            
            if (pedido.status.includes('Entregue')) {
                statusClass = 'status-entregue';
            } else if (pedido.status.includes('Em andamento')) {
                statusClass = 'status-em-andamento';
                buttonText = 'Acompanhar';
            } else if (pedido.status.includes('Esperando pagamento')) {
                 statusClass = 'status-esperando';
                 buttonText = 'Pagar Agora';
            }
            
            const pedidoHTML = `
                <div class="card-pedido" data-pedido-id="${pedido.id}">
                    <div class="produto-imagem">
                        <img src="${pedido.imagem}" alt="Ícone do serviço ${pedido.nome}" class="imagem-pedido-card">
                    </div>
                    <div class="detalhes-pedido">
                        <span class="codigo-pedido-texto">Serviço #${pedido.codigo} - ${pedido.nome}</span>
                        <span class="pedido-status ${statusClass}">Status: ${pedido.status}</span>
                        <span class="pedido-data">Solicitado em: ${pedido.data}</span>
                    </div>
                    <div class="pedido-acoes">
                        <button class="botao-detalhes">${buttonText}</button>
                    </div>
                </div>
            `;
            listaPedidosContainer.innerHTML += pedidoHTML;
        });
        
        document.querySelectorAll('.botao-detalhes').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.card-pedido');
                const pedidoId = card.getAttribute('data-pedido-id');
                alert(`Simulando ação para o serviço ID: ${pedidoId}. Ação: ${e.target.textContent}`);
            });
        });
    }

    if (document.querySelector('.pagina-pedidos')) {
        if (getPedidos().length === 0) {
             window.adicionarNovoPedido('Limpeza', '1001', 'Entregue');
             window.adicionarNovoPedido('Atualização de Sistema', '1002', 'Em andamento');
        }
        renderizarPedidos();
    }
    
    if (telefone && msg) {
        telefone.addEventListener("click", () => {
            navigator.clipboard.writeText(numero).then(() => {
                msg.style.opacity = "1";
                setTimeout(() => {
                    msg.style.opacity = "0";
                }, 1500);
            });
        });
    }
});
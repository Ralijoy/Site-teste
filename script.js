function calcularOrcamento(event) {
    event.preventDefault();

    const tipoUso = document.getElementById("tipo-uso").value;
    const nivel = document.getElementById("nivel").value;
    const orcamentoCliente = Number(document.getElementById("orcamento-cliente").value || 0);
    const nome = document.getElementById("nome").value.trim();

    if (!tipoUso || !nivel) {
        alert("Por favor, selecione o tipo de uso e o nível da máquina.");
        return;
    }

    // Valores base aproximados de peças, só para simulação
    let basePecas = 0;

    if (nivel === "entrada") {
        basePecas = 2000;
    } else if (nivel === "intermediario") {
        basePecas = 3500;
    } else if (nivel === "avancado") {
        basePecas = 6000;
    }

    // Ajuste conforme o tipo de uso
    if (tipoUso === "gamer") {
        basePecas += 800;
    } else if (tipoUso === "edicao") {
        basePecas += 1000;
    } else if (tipoUso === "basico") {
        basePecas -= 300;
    }

    if (basePecas < 0) basePecas = 0;

    // Valor do serviço de montagem
    let servicoMontagem = 250;
    if (nivel === "intermediario") servicoMontagem = 300;
    if (nivel === "avancado") servicoMontagem = 400;

    const totalEstimado = basePecas + servicoMontagem;

    // Mensagem personalizada
    let saudacao = nome ? `Olá, ${nome}!` : "Olá!";
    let comparacaoOrcamento = "";

    if (orcamentoCliente > 0) {
        if (orcamentoCliente >= totalEstimado) {
            comparacaoOrcamento = "Seu orçamento está compatível com essa configuração.";
        } else {
            comparacaoOrcamento = "Seu orçamento está abaixo da estimativa. Talvez seja necessário reduzir o nível ou trocar algumas peças.";
        }
    } else {
        comparacaoOrcamento = "Informe seu orçamento para comparar com a estimativa.";
    }

    const divResultado = document.getElementById("resultado-orcamento");
    divResultado.style.display = "block";
    divResultado.innerHTML = `
        <p><strong>${saudacao}</strong></p>
        <p>Estimativa de valor das peças: <strong>R$ ${basePecas.toFixed(2)}</strong></p>
        <p>Serviço de montagem: <strong>R$ ${servicoMontagem.toFixed(2)}</strong></p>
        <p><strong>Total estimado:</strong> R$ ${totalEstimado.toFixed(2)}</p>
        <p>${comparacaoOrcamento}</p>
        <p><em>Obs.: Este é apenas um simulador simples. Os valores reais podem variar conforme marcas, promoções e disponibilidade de peças.</em></p>
    `;
}

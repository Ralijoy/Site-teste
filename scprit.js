// ======== Simulador de orçamento (igual ao primeiro, só reorganizado) ========

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

    let basePecas = 0;

    if (nivel === "entrada") {
        basePecas = 2000;
    } else if (nivel === "intermediario") {
        basePecas = 3500;
    } else if (nivel === "avancado") {
        basePecas = 6000;
    }

    // Ajuste pelo tipo de uso
    if (tipoUso === "gamer") {
        basePecas += 800;
    } else if (tipoUso === "edicao") {
        basePecas += 1000;
    } else if (tipoUso === "basico") {
        basePecas -= 300;
    }

    if (basePecas < 0) basePecas = 0;

    let servicoMontagem = 250;
    if (nivel === "intermediario") servicoMontagem = 300;
    if (nivel === "avancado") servicoMontagem = 400;

    const totalEstimado = basePecas + servicoMontagem;

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
        <p><em>Obs.: Este é apenas um simulador simples. Os valores reais podem variar conforme marcas e promoções.</em></p>
    `;
}

// ======== Partículas vermelhas flutuantes no fundo ========

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const NUM_PARTICLES = 70;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function criarParticulas() {
    particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 1 + Math.random() * 2.5,
            vx: -0.5 + Math.random(),
            vy: -0.5 + Math.random(),
            alpha: 0.3 + Math.random() * 0.5
        });
    }
}

function atualizarParticulas() {
    for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // reaparece do outro lado quando sai da tela
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    }
}

function desenharParticulas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${p.alpha})`; // vermelho com transparência
        ctx.fill();
    }

    atualizarParticulas();
    requestAnimationFrame(desenharParticulas);
}

criarParticulas();
desenharParticulas();

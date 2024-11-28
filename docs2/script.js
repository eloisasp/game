// Configurações do jogo
const gridSize = 5; // Tamanho da grade (5x5)
const totalCells = gridSize * gridSize;

// Elementos da interface
const grid = document.getElementById("grid");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

// Variáveis do jogo
let bombPosition;
let safeClicks;

// Inicializa o jogo
function initializeGame() {
    grid.innerHTML = ""; // Limpa o grid
    result.textContent = ""; // Limpa o resultado
    restartBtn.classList.add("d-none");

    // Sorteia a posição da bomba
    bombPosition = Math.floor(Math.random() * totalCells);
    safeClicks = totalCells - 1; // Número de células seguras

    // Cria os botões no grid
    for (let i = 0; i < totalCells; i++) {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary");
        button.dataset.index = i; // Salva a posição do botão
        button.textContent = "?";
        button.addEventListener("click", handleButtonClick);
        grid.appendChild(button);
    }
}

// Lida com os cliques nos botões
function handleButtonClick(event) {
    const button = event.target;
    const index = parseInt(button.dataset.index);

    // Verifica se clicou na bomba
    if (index === bombPosition) {
        button.classList.remove("btn-primary");
        button.classList.add("btn-danger");
        button.textContent = "💣";
        endGame(false);
    } else {
        button.classList.remove("btn-primary");
        button.classList.add("btn-success");
        button.textContent = "✔️";
        button.disabled = true; // Desativa o botão
        safeClicks--;

        // Verifica se o jogador venceu
        if (safeClicks === 0) {
            endGame(true);
        }
    }
}

// Finaliza o jogo
function endGame(isWin) {
    // Desativa todos os botões
    const buttons = document.querySelectorAll("#grid button");
    buttons.forEach((btn) => {
        btn.disabled = true;
        // Mostra a bomba se o jogador perder
        if (parseInt(btn.dataset.index) === bombPosition) {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-danger");
            btn.textContent = "💣";
        }
    });

    // Exibe o resultado
    if (isWin) {
        result.textContent = "Parabéns! Você venceu!";
        result.classList.add("text-success");
    } else {
        result.textContent = "Que pena! Você encontrou a bomba!";
        result.classList.add("text-danger");
    }

    // Exibe o botão de reiniciar
    restartBtn.classList.remove("d-none");
}

// Reinicia o jogo
restartBtn.addEventListener("click", initializeGame);

// Inicializa o jogo na primeira execução
initializeGame();

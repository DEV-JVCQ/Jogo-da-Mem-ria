document.addEventListener("DOMContentLoaded", () => {
  // Opções de cartas
  const cards = [
    { name: "cachorro", img: "images/DIFICIL/CACHORRO.png" },
    { name: "cavalo", img: "images/DIFICIL/CAVALO.png" },
    { name: "galinha", img: "images/DIFICIL/GALINHA.png" },
    { name: "gato", img: "images/DIFICIL/GATO.png" },
    { name: "leao", img: "images/DIFICIL/LEÃO.png" },
    { name: "macaco", img: "images/DIFICIL/MACACO.png" },
    { name: "pato", img: "images/DIFICIL/PATO.png" },
    { name: "vaca", img: "images/DIFICIL/VACA.png" },
    { name: "cabra", img: "images/DIFICIL/CABRA.png" },
    { name: "cachorro", img: "images/DIFICIL/CACHORRO.png" },
    { name: "cavalo", img: "images/DIFICIL/CAVALO.png" },
    { name: "galinha", img: "images/DIFICIL/GALINHA.png" },
    { name: "gato", img: "images/DIFICIL/GATO.png" },
    { name: "leao", img: "images/DIFICIL/LEÃO.png" },
    { name: "macaco", img: "images/DIFICIL/MACACO.png" },
    { name: "pato", img: "images/DIFICIL/PATO.png" },
    { name: "vaca", img: "images/DIFICIL/VACA.png" },
    { name: "cabra", img: "images/DIFICIL/CABRA.png" },
  ];
// Embaralhar cartas
  cards.sort(() => 0.5 - Math.random());

  // Elementos da tela
  const board = document.querySelector(".board");
  const resultView = document.querySelector("#result");

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let score = parseInt(localStorage.getItem('scoreFacil')) || 0; // Recuperar score específico do "Fácil"

  // Função para mostrar o popup
  function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerText = message;

    popup.style.position = "fixed";
    popup.style.top = "10px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    popup.style.color = "white";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "5px";
    popup.style.zIndex = "1000";

    document.body.appendChild(popup);

    // Remover o popup após 3 segundos
    setTimeout(() => popup.remove(), 3000);
  }

  // Função para criar o tabuleiro
  function createBoard() {
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "images/FACIL/FACIL.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      board.appendChild(card);
    }
  }

  // Checar combinação das cartas
  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    // Verificar se clicou na mesma carta
    if (optionOneId == optionTwoId) {
      setTimeout(() => {
        cards[optionOneId].setAttribute("src", "images/FACIL/FACIL.png");
        cards[optionTwoId].setAttribute("src", "images/FACIL/FACIL.png");
      }, 1000); // Demora 5 segundos para fechar
      showPopup("Você clicou na mesma imagem");
      score--; // Subtrair ponto por erro
    }
    // Verificar se as cartas combinam
    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute("src", "images/FACIL/CHECK_FACIL.png");
      cards[optionTwoId].setAttribute("src", "images/FACIL/CHECK_FACIL.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
      score++; // Adicionar ponto por par certo
      showPopup("Você encontrou uma combinação");
    } else {
      setTimeout(() => {
        cards[optionOneId].setAttribute("src", "images/FACIL/FACIL.png");
        cards[optionTwoId].setAttribute("src", "images/FACIL/FACIL.png");
      }, 1000); // Demora 5 segundos para fechar
      showPopup("Errou, tente novamente");
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultView.textContent = "Pares Encontrados: " + cardsWon.length;

    // Salvar score específico do "Fácil" no localStorage
    localStorage.setItem('scoreFacil', score);

    // Atualizar pontuação na tela
    updateScore();

    // Verificar se o jogo acabou
    if (cardsWon.length === cards.length / 2) {
      resultView.textContent = "Parabéns! Você encontrou todas as cartas";
    }
  }

  // Virar a carta
  function flipCard() {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cards[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cards[cardId].img);

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 200); // Verifica a correspondência após 200ms
    }
  }

  // Atualizar pontuação na página
  function updateScore() {
    const scoreElements = document.querySelectorAll(".score");
    scoreElements.forEach(scoreElement => {
      scoreElement.textContent = score;
    });
  }

  // Criar o tabuleiro
  createBoard();
});


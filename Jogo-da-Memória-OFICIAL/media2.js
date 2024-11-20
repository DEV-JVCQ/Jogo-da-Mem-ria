document.addEventListener("DOMContentLoaded", () => {
  // Opções de cartas
  const cards = [
    { name: "alvin", img: "images/MEDIA/ALVIN.png" },
    { name: "bob", img: "images/MEDIA/BOB.png" },
    { name: "jessie", img: "images/MEDIA/JESSIE.png" },
    { name: "mario", img: "images/MEDIA/MARIO.png" },
    { name: "monica", img: "images/MEDIA/MONICA.png" },
    { name: "patrick", img: "images/MEDIA/PATRICK.png" },
    { name: "alvin", img: "images/MEDIA/ALVIN.png" },
    { name: "bob", img: "images/MEDIA/BOB.png" },
    { name: "jessie", img: "images/MEDIA/JESSIE.png" },
    { name: "mario", img: "images/MEDIA/MARIO.png" },
    { name: "monica", img: "images/MEDIA/MONICA.png" },
    { name: "patrick", img: "images/MEDIA/PATRICK.png" }
  ];

  // Embaralhar as cartas
  cards.sort(() => 0.5 - Math.random());

  // Recuperar elementos
  const board = document.querySelector(".board");
  const resultView = document.querySelector("#result");
  let cardsChosen = []; // Cartas escolhidas
  let cardsChosenId = []; // IDs das cartas escolhidas
  let cardsWon = []; // Cartas combinadas
  let score = parseInt(localStorage.getItem('scoreMedio')) || 0; // Recuperar o score do "Médio"

  // Função para mostrar o popup
  function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerText = message;
  
    // Adicionar estilos para a posição do popup
    popup.style.position = "fixed"; // Tornar o popup fixo na tela
    popup.style.top = "10px"; // Colocar o popup a 10px do topo
    popup.style.left = "50%"; // Centralizar horizontalmente
    popup.style.transform = "translateX(-50%)"; // Ajustar para centralizar corretamente
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Fundo escuro semitransparente
    popup.style.color = "white"; // Texto branco
    popup.style.padding = "10px 20px"; // Espaçamento interno
    popup.style.borderRadius = "5px"; // Bordas arredondadas
    popup.style.zIndex = "1000"; // Garantir que o popup esteja sobre outros elementos
  
    document.body.appendChild(popup);
  
    // Remover o popup após 3 segundos
    setTimeout(() => popup.remove(), 3000);
  }
  // Função para criar o tabuleiro de cartas
  function createBoard() {
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "images/MEDIA/MEDIA.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      board.appendChild(card);
    }
  }

  // Função para checar combinações
  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    // Verificar se clicou na mesma carta
    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute("src", "images/MEDIA/MEDIA.png");
      cards[optionTwoId].setAttribute("src", "images/MEDIA/MEDIA.png");
      showPopup("Você clicou na mesma imagem");
    }
    // Verificar se as cartas combinam
    else if (cardsChosen[0] === cardsChosen[1]) {
      showPopup("Você encontrou uma combinação");
      cards[optionOneId].setAttribute("src", "images/MEDIA/CHECK_MEDIA.png");
      cards[optionTwoId].setAttribute("src", "images/MEDIA/CHECK_MEDIA.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
      score++; // Adicionar um ponto por combinação
    } else {
      cards[optionOneId].setAttribute("src", "images/MEDIA/MEDIA.png");
      cards[optionTwoId].setAttribute("src", "images/MEDIA/MEDIA.png");
      showPopup("Errou, tente novamente");
    }
    cardsChosen = [];
    cardsChosenId = [];
    
    // Mostrar o placar
    resultView.textContent = "Pares Encontrados: " + cardsWon.length;
    
    // Salvar o score no localStorage
    localStorage.setItem('scoreMedio', score);

    // Atualizar o placar na tela
    updateScore();

    // Verificar se o jogo acabou
    if (cardsWon.length === cards.length / 2) {
      resultView.textContent = "Parabéns! Você encontrou todas as cartas";
    }
  }

  // Função para virar a carta
  function flipCard() {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cards[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cards[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 200);
    }
  }

  // Função para atualizar o placar
  function updateScore() {
    const scoreElements = document.querySelectorAll(".score");
    scoreElements.forEach(scoreElement => {
      scoreElement.textContent = score;
    });
  }

  // Criar o tabuleiro de cartas
  createBoard();
});

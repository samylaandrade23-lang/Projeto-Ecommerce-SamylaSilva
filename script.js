// Menu responsivo: abre e fecha ao tocar no botão.
const botaoMenu = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu-principal");

botaoMenu.addEventListener("click", () => {
  const estaAberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", String(estaAberto));
  botaoMenu.setAttribute("aria-label", estaAberto ? "Fechar menu" : "Abrir menu");
  botaoMenu.textContent = estaAberto ? "✕" : "☰";
});

// Fecha o menu mobile depois que uma opção é selecionada.
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    botaoMenu.textContent = "☰";
  });
});

// Cálculo demonstrativo de frete usando if/else.
const formularioFrete = document.querySelector("#form-frete");
const campoValor = document.querySelector("#valor-compra");
const resultadoFrete = document.querySelector("#resultado-frete");

formularioFrete.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const valor = Number(campoValor.value);

  if (campoValor.value === "" || valor < 0 || !Number.isFinite(valor)) {
    resultadoFrete.textContent = "Digite um valor válido para calcular.";
  } else if (valor >= 200) {
    resultadoFrete.textContent = "Boa notícia! Você ganhou frete grátis.";
  } else {
    resultadoFrete.textContent = "O frete estimado para sua compra é R$ 19,90.";
  }
});

// Validação do formulário de contato e mensagem de retorno.
const formularioContato = document.querySelector("#form-contato");
const retornoContato = document.querySelector("#retorno-contato");

formularioContato.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!formularioContato.checkValidity()) {
    formularioContato.reportValidity();
    return;
  }

  const nome = document.querySelector("#nome").value.trim();
  const mensagem = document.querySelector("#mensagem").value.trim();

  if (nome.length < 3 || mensagem.length < 10) {
    retornoContato.textContent = "Confira o nome e escreva uma mensagem com pelo menos 10 caracteres.";
    return;
  }

  retornoContato.textContent = `Obrigado, ${nome}! Seu formulário foi validado. (Demonstração acadêmica: a mensagem não foi enviada.)`;
  formularioContato.reset();
});

// Carrinho de compras: adiciona, remove e soma os itens.
const carrinho = [];
const listaCarrinho = document.querySelector("#lista-carrinho");
const totalCarrinho = document.querySelector("#total-carrinho");
const qtdCarrinho = document.querySelector("#carrinho-qtd");
const botaoLimpar = document.querySelector("#limpar-carrinho");

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;
  let quantidade = 0;

  if (carrinho.length === 0) {
    const vazio = document.createElement("li");
    vazio.textContent = "Seu carrinho está vazio.";
    listaCarrinho.appendChild(vazio);
  }

  carrinho.forEach((item, indice) => {
    total += item.preco * item.quantidade;
    quantidade += item.quantidade;

    const linha = document.createElement("li");
    linha.textContent = `${item.nome} (x${item.quantidade}) - ${formatarPreco(item.preco * item.quantidade)} `;

    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "remover-item";
    remover.textContent = "Remover";
    remover.addEventListener("click", () => {
      if (item.quantidade > 1) {
        item.quantidade -= 1;
      } else {
        carrinho.splice(indice, 1);
      }
      renderizarCarrinho();
    });

    linha.appendChild(remover);
    listaCarrinho.appendChild(linha);
  });

  totalCarrinho.textContent = formatarPreco(total);
  qtdCarrinho.textContent = quantidade;
}

document.querySelectorAll(".adicionar-carrinho").forEach((botao) => {
  botao.addEventListener("click", () => {
    const nome = botao.dataset.nome;
    const preco = Number(botao.dataset.preco);
    const existente = carrinho.find((item) => item.nome === nome);

    if (existente) {
      existente.quantidade += 1;
    } else {
      carrinho.push({ nome, preco, quantidade: 1 });
    }
    renderizarCarrinho();
  });
});

botaoLimpar.addEventListener("click", () => {
  carrinho.length = 0;
  renderizarCarrinho();
});

renderizarCarrinho();

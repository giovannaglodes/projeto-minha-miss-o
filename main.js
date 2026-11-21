import { afirmacoes } from "./afirmacoes.js";
import { nomes } from "./nomes.js";
import { etapasMissao, sortearItem, criarMensagem } from "./missao.js";

const telaInicial = document.querySelector("#tela-inicial");
const telaMissao = document.querySelector("#tela-missao");
const telaFinal = document.querySelector("#tela-final");
const botaoIniciar = document.querySelector("#botao-iniciar");
const botaoProximo = document.querySelector("#botao-proximo");
const botaoReiniciar = document.querySelector("#botao-reiniciar");

const nomeSorteado = document.querySelector("#nome-sorteado");
const textoAfirmacao = document.querySelector("#texto-afirmacao");
const listaEtapas = document.querySelector("#lista-etapas");
const contador = document.querySelector("#contador");
const barraPreenchida = document.querySelector("#barra-preenchida");
const mensagemFinal = document.querySelector("#mensagem-final");

let etapaAtual = 0;

function mostrarTela(telaEscolhida) {
  // Esconde todas as telas e mostra somente a escolhida.
  for (const tela of [telaInicial, telaMissao, telaFinal]) {
    tela.classList.add("escondido");
  }
  telaEscolhida.classList.remove("escondido");
}

function atualizarProgresso() {
  contador.textContent = `${etapaAtual} de ${etapasMissao.length}`;
  const porcentagem = (etapaAtual / etapasMissao.length) * 100;
  barraPreenchida.style.width = `${porcentagem}%`;
}

function mostrarEtapas() {
  listaEtapas.innerHTML = "";

  // O for...of percorre cada etapa e cria um item na lista.
  for (const [indice, etapa] of etapasMissao.entries()) {
    const item = document.createElement("li");
    const marcador = document.createElement("span");
    const texto = document.createElement("span");

    marcador.className = "marcador";
    marcador.textContent = indice + 1;
    texto.textContent = etapa;

    item.append(marcador, texto);
    listaEtapas.appendChild(item);
  }
}

function iniciarMissao() {
  etapaAtual = 0;
  const nome = sortearItem(nomes);
  const afirmacao = sortearItem(afirmacoes);

  nomeSorteado.textContent = nome;
  textoAfirmacao.textContent = afirmacao;
  mensagemFinal.textContent = criarMensagem(nome) + " Parabéns por concluir todos os passos.";

  mostrarEtapas();
  atualizarProgresso();
  botaoProximo.textContent = "Concluir próxima etapa";
  mostrarTela(telaMissao);
}

function concluirProximaEtapa() {
  // Condicional para impedir que a contagem ultrapasse o total de etapas.
  if (etapaAtual < etapasMissao.length) {
    const item = listaEtapas.children[etapaAtual];
    item.classList.add("concluida");
    item.querySelector(".marcador").textContent = "✓";
    etapaAtual++;
    atualizarProgresso();
  }

  if (etapaAtual === etapasMissao.length) {
    mostrarTela(telaFinal);
  }
}

botaoIniciar.addEventListener("click", iniciarMissao);
botaoProximo.addEventListener("click", concluirProximaEtapa);
botaoReiniciar.addEventListener("click", () => mostrarTela(telaInicial));

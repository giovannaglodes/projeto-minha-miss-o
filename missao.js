// Passos que formam a missão.
export const etapasMissao = [
  "Escolha uma coisa nova para aprender hoje.",
  "Dedique pelo menos 15 minutos a essa atividade.",
  "Anote o que você conseguiu aprender ou melhorar."
];

// Sorteia um item de uma lista usando Math.random().
export function sortearItem(lista) {
  const indice = Math.floor(Math.random() * lista.length);
  return lista[indice];
}

// Troca o marcador {nome} pelo nome sorteado usando replace().
export function criarMensagem(nome) {
  const modelo = "Esta missão foi preparada especialmente para {nome}!";
  return modelo.replace("{nome}", nome);
}

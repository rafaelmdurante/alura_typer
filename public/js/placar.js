$("#botao-placar").click(mostraPlacar);

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var nome = "Miranda";
  var numPalavrasPlacar = $("#contador-palavras").text();
  var linha = novaLinha(nome, numPalavrasPlacar);
  linha.find(".botao-remover").click(removerLinha);
  corpoTabela.prepend(linha);
}

function novaLinha(usuario, palavras) {
  // Construindo Linhas e Colunas
  var linha = $("<tr>");
  var colNome = $("<td>").text(usuario);
  var colPalavras = $("<td>").text(palavras);
  var colRemover = $("<td>");

  var link = $("<a>").attr("href", "#").addClass("botao-remover");
  var icone = $("<i>").addClass("material-icons").text("delete");

  // Agrupando linhas e colunas
  // Link no Icon
  link.append(icone);
  // Icone
  colRemover.append(link);
  // Monta linha completa
  linha.append(colNome);
  linha.append(colPalavras);
  linha.append(colRemover);

  return linha;
}

function removerLinha(event) {
  event.preventDefault();
  let linha = $(this).parent().parent();
  linha.fadeOut(1000);
  setTimeout(function() {
    linha.remove();
  }, 1000);
}

function mostraPlacar() {
  $(".placar").stop().slideToggle(400);
}

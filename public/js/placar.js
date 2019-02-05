$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var nome = $("#usuarios").val();
  var numPalavrasPlacar = $("#contador-palavras").text();
  var linha = novaLinha(nome, numPalavrasPlacar);
  linha.find(".botao-remover").click(removerLinha);
  corpoTabela.append(linha);

  $(".placar").slideDown(500);
  scrollPlacar();
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

function scrollPlacar() {
  var posicaoPlacar = $(".placar").offset().top;

  $("html").animate(
  {
    scrollTop: posicaoPlacar+'px'
  }, 1000);
}

function sincronizaPlacar() {
  let placar = [];
  let linhas = $("tbody>tr");
  linhas.each(function(){
    let usuario = $(this).find("td:nth-child(1)").text();
    let palavras = $(this).find("td:nth-child(2)").text();
    let score = {
      usuario: usuario,
      pontos: palavras
    };
    placar.push(score);
  });
  let dados = {
    placar: placar
  }
  $.post("http://localhost:3000/placar", dados, function(){
    console.log("Placar sincronizado com sucesso.");
  });
}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar",function(data){
    $(data).each(function(){
      let linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removerLinha);
      $("tbody").append(linha);
    });
  });
}

// ======== Variáveis Globais ========
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

// ======== Funções ========
function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function inicializarContadores() {
  // Controle do Campo Digitação
  campo.on("input", function(){
    var conteudo = campo.val();
    // Retirar espaços da String
    var conteudoSemEspaco = conteudo.replace(/\s+/g, '');
    var qtdCaracteres = conteudoSemEspaco.length;
    // Conta somente palavras separadas por espaço
    var qtdPalavras = conteudo.split(/\S+/).length - 1; // Substituição de " " por RegExp /\S+/ [...] - 1 para ficar mais correta contagem
    $("#contador-palavras").text(qtdPalavras);
    $("#contador-caracteres").text(qtdCaracteres);
  });
}

function inicializarCronometro() {
  // Controle do tempo
  var tempoRestante = $("#tempo-digitacao").text();
  campo.one("focus", function() {
    $("#botao-reiniciar").attr("disabled", true);
    var cronometro = setInterval(function() {
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1) {
        clearInterval(cronometro);
        inserePlacar();
        finalizarJogo();
      }
    }, 1000);
  });
}

function finalizarJogo() {
  campo.attr("disabled", true);
  $("#botao-reiniciar").attr("disabled", false);
  campo.addClass("campo-desativado");
}

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
  $(this).parent().parent().remove();
}

function reiniciarJogo() {
  $("#botao-reiniciar").click(function(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
    inicializarCronometro();
  });
}

function inicializarMarcadores() {
  var frase = $(".frase").text();
  $(".campo-digitacao").on("input", function(){
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length);
    if (digitado == comparavel) {
      campo.addClass("borda-verde");
    } else {
      campo.addClass("borda-vermelha")
    }
  })
}

// ======== Carregar ao iniciar a página ========
$(
  function(){
    atualizaTamanhoFrase();
    inicializarContadores();
    inicializarCronometro();
    inicializarMarcadores();
    $("#botao-reiniciar").click(reiniciarJogo());
  }
)

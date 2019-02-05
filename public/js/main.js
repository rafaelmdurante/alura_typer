// ======== Variáveis Globais ========
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
var btnReiniciar = $("#botao-reiniciar");

// ======== Carregar ao iniciar a página ========
$(
  function(){
    atualizaTamanhoFrase();
    inicializarContadores();
    inicializarCronometro();
    inicializarMarcadores();
    $("#botao-reiniciar").click(reiniciarJogo);
    atualizaPlacar();
    $("#usuarios").selectize({
      create: true,
      sortField: 'text'
    });
  }
)

// ======== Funções ========
function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $("#tempo-digitacao").text(tempo);
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
  campo.one("focus", function() {
    var tempoRestante = $("#tempo-digitacao").text();
    $("#botao-reiniciar").unbind('click');
    var cronometro = setInterval(function() {
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1) {
        clearInterval(cronometro);
        finalizarJogo();
        $("#botao-reiniciar").click(reiniciarJogo);
      }
    }, 1000);
  });
}

function finalizarJogo() {
  campo.attr("disabled", true);
  campo.toggleClass("campo-desativado");
  inserePlacar();
}

function reiniciarJogo() {
  campo.attr("disabled", false);
  campo.val("");
  $("#contador-caracteres").text(0);
  $("#contador-palavras").text(0);
  $("#tempo-digitacao").text(tempoInicial);
  inicializarCronometro();
  campo.removeClass("campo-desativado");
  campo.removeClass("borda-vermelha");
  campo.removeClass("borda-verde");

}

function inicializarMarcadores() {
  $(".campo-digitacao").on("input", function(){
    var frase = $(".frase").text();
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length);
    if (digitado == comparavel) {
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    } else {
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  })
}

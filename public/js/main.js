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
    var cronometro = setInterval(function() {
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante < 1) {
        campo.attr("disabled", true);
        clearInterval(cronometro);
      }
    }, 1000);
  });
}

function reiniciarJogo() {
  $("#botao-reiniciar").click(function(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializarCronometro();
  });
}

// ======== Carregar ao iniciar a página ========
$(
  function(){
    atualizaTamanhoFrase();
    inicializarContadores();
    inicializarCronometro();
    $("#botao-reiniciar").click(reiniciarJogo());
  }
)

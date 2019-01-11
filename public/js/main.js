var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");

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

// Controle do tempo
var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function() {
  var cronometro = setInterval(function() {
    tempoRestante--;
    $("#tempo-digitacao").text(tempoRestante);
    if (tempoRestante < 1) {
      $("#tempo-jogo").text("GAME OVER!");
      campo.attr("disabled", true);
      clearInterval(cronometro);
    }
  }, 1000);
});

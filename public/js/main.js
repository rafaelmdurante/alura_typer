var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");
campo.on("input", function(){
  var conteudo = campo.val();
  var qtdCaracteres = conteudo.length;
  var qtdPalavras = conteudo.split(/\S+/).length - 1; // Substituição de " " por RegExp /\S+/ [...] - 1 para ficar mais correta contagem
  $("#contador-palavras").text(qtdPalavras);
  $("#contador-caracteres").text(qtdCaracteres);
});

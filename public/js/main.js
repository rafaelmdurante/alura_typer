var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");
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

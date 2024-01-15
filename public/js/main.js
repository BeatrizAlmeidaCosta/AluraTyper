 var tempoinicial = $("#tempo-digitacao").text();

var frase = $(".frase").text(); 
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");
campo.on("input", function() {
    var conteudo = campo.val();

    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
});


var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function() {
    var cronometroID = setInterval(function() {
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        if (tempoRestante < 1) {
            campo.attr("disabled", true);
            clearInterval(cronometroID);
        }
    }, 1000);
});

$("#botao-reiniciar").click(function(){
    campo.attr("disabled", false);
    campo.val ("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
$("#tempo-digitacao").text(tempoinicial);
})

function inicializacronometro () { 
    var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function() {

    $("#botao-reiniciar").attr("disabled",true);

    var cronometroID = setInterval(function() {
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        if (tempoRestante < 1) {
            
            clearInterval(cronometroID);
            
        
            $("#botao-reiniciar").attr("disabled", false);
            campo.toggleClass("campo-desativado");

            campo.addClass("campo-desativado");
            finalizajogo();
            
        }
    }, 1000);
});

};

function reiniciajogo () {

        campo.attr("disabled", false);
        campo.val ("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoinicial);
    inicializacronometro();

    campo.toggleClass("campo-desativado");

    campo.removeClass("borda-vermelha"); 
    campo.removeClass("borda-verde");
    

};

function inicializacontadores () {
    var campo = $(".campo-digitacao");
campo.on("input", function() {
    var conteudo = campo.val();

    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
});
};

function atualizatamanhofrase () {

    var frase = $(".frase").text(); 
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

};

$(document).ready(function(){
    inicializacontadores ();
    inicializacronometro();
    atualizatamanhofrase();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciajogo);

});

var frase = $(".frase").text();
campo.on("input", function() {
    var digitado = campo.val();
    var comparavel = frase.substr(0 , digitado.length);

    if(digitado == comparavel) {
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
    } else {
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }
});

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);

        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Beatriz";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>" ;

    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botaoremover").click(removeLinha);

    corpoTabela.prepend(linha); }

    $(".botaoremover").click(function(event) {
        $(this).parent().parent().remove();
    } )
    
    function novaLinha(usuario, numPalavras){
        var linha = $("<tr>");
    
        var colunaUsuario = $("<td>").text(usuario);
        var colunaPalavras = $("<td>").text(numPalavras);
        var colunaRemover = $("<td>");
    
        var link = $("<a>").addClass("botaoremover").attr("href","#");
        var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
      
        link.append(icone);
        colunaRemover.append(link);

        linha.append(colunaUsuario);
        linha.append(colunaPalavras);
        linha.append(colunaRemover);
    
        return linha;
    }

   

function finalizajogo () {
    
            
        
            
            inserePlacar();

            campo.attr("disabled", true);
}

function removeLinha () {  event.preventDefault();
    $(this).parent().parent().remove();}
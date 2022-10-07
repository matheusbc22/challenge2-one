const btnStart = document.getElementById("btnStart");
const btnAdd = document.getElementById("btnAdd");
const forca = document.getElementById("forca");
const btnQuit = document.getElementById("btnQuit");
const palavra = document.getElementById("input");
const btnNewGame = document.getElementById("btnNewGame");
const btnSalvar = document.getElementById("salvar");
const btnVoltar = document.getElementById("voltar");
const menuAdd = document.getElementById("menuAdd");
const navBar = document.getElementById("logo");

var arrayDePalavras = ["MAÇA", "BANANA", "PERA", "UVA", "MELANCIA", "MORANGO", "CACAU", "MELAO", "LARANJA"];
var palavraEscolhida = "";
var xPalavra = 0;
var yErrado = 480;
var xErrado = 180;
var tentativas = 6;
var parteForca = 0;
var jogoInicial = true;
var acertos = 0;

console.log(arrayDePalavras);
function salvarPalavra(){
    if (palavra.value.length <= 10){
        let valorPalavra = palavra.value.toUpperCase();
        if (valorPalavra.match(/^[A-ZÇ ]+$/)){
            arrayDePalavras.push(palavra.value.toUpperCase());
            palavra.value = "";
            window.alert("Palavra adicionada!!");
        }else{
            window.alert("Caracter inválido, só são aceitos caractéres de A-Z e Ç");
        }
    }else{
        window.alert("Máximo de 10 caractéres!");
    }
}
function voltar(){
    menuAdd.style.display = "none";
    desistirJogo();
}
function addPalavra(){
    menuAdd.style.display = "inline";
    btnStart.style.display = "none";
    btnAdd.style.display = "none";
    palavra.style.display = "inline";
    btnSalvar.style.display = "inline";
    btnVoltar.style.display = "inline";
}
function desenhaCanvas(){
    forca.style.display = "inline";
    btnNewGame.style.display = "inline";
    btnQuit.style.display = "inline";
    btnStart.style.display = "none";
    btnAdd.style.display = "none";
    navBar.style.display = "none";
    novaPalavra();
}
function desistirJogo(){
    forca.style.display = "none";
    btnNewGame.style.display = "none";
    btnQuit.style.display = "none";
    btnStart.style.display = "inline";
    btnAdd.style.display = "inline";
    navBar.style.display = "flex";
}
function desenhaForca(n){
    let x = 535;
    let y = 120;
    let ctx = forca.getContext("2d");
    ctx.lineWidth = 10;
    switch(n){
        case 1:
            ctx.beginPath();
            ctx.arc(x, y + 40, 40, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(x, y + 80);
            ctx.lineTo(x, y + 160);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(x - 2, y + 155);
            ctx.lineTo(x + 40, y + 200);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(x - 2, y + 155);
            ctx.lineTo(x - 40, y + 200);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.moveTo(x, y + 80);
            ctx.lineTo(x + 40, y + 120);
            ctx.stroke();
            break;         
        case 6:
            ctx.beginPath();
            ctx.moveTo(x, y + 80);
            ctx.lineTo(x - 40, y + 120);
            ctx.stroke();
            let textoDerrota = ["V", "O", "C", "Ê", " ", "P", "E", "R", "D", "E", "U", "!"];
            let xTextoDerrota = 240;
            for (let i = 0; i < textoDerrota.length; i++){
                escrevaLetra(textoDerrota[i], xTextoDerrota, 60);
                xTextoDerrota += 30;
            }
            break;          
    }
}
function novaPalavra(){
    let posPalavra = Math.floor(Math.random() * arrayDePalavras.length);
    let tamanhoPalavra = arrayDePalavras[posPalavra].length;
    palavraEscolhida = arrayDePalavras[posPalavra];
    desenhaTracos(tamanhoPalavra);
}
function escreverLetra(letra, letraCerta){
    if (tentativas >= 1){
        let info = forca.getBoundingClientRect();
        let larguraCanva = info.width;
        let alturaCanva = info.height;
        alturaCanva -= 10;
        let tamanhoPalavra = palavraEscolhida.length;
        let posLetras = [];
        if (letraCerta === true){
            for (let i = 0; i < palavraEscolhida.length; i++){
                if (palavraEscolhida[i] == letra){
                    posLetras.push(i);
                }
            }
            let ondeComecaPalavra = (larguraCanva / 2) - ((tamanhoPalavra * 40) + ((tamanhoPalavra -1) * 40)) / 2;
            xPalavra = ondeComecaPalavra;
            for (let i = 0; i < posLetras.length; i++){
                xPalavra = (ondeComecaPalavra) + ((posLetras[i] * 80));
                escrevaLetra(letra, xPalavra, alturaCanva);
                acertos++;
                if (acertos == palavraEscolhida.length){
                    let x = 535;
                    let y = 120;
                    let textoVitoria = ["V", "O", "C", "Ê", " ", "G", "A", "N", "H", "O", "U", "!"];
                    let xTextoVitoria = 240;
                    for (let i = 0; i < textoVitoria.length; i++){
                        escrevaLetra(textoVitoria[i], xTextoVitoria, 60);
                        xTextoVitoria += 30;
                    }
                    tentativas = 0;
                }
            }
        }else{
            escrevaLetra(letra, xErrado, yErrado);
            xErrado += 80;
            tentativas--;
            parteForca++;
            desenhaForca(parteForca);
        }
    }
}
function escrevaLetra(letra, x, y){
    let ctx = forca.getContext("2d");
    ctx.lineWidth  = 8;
    ctx.font = "40px Arial";
    ctx.fillText(letra, x, y);
}
function aguardarTentativa(e){
    let letraMaiuscula;
    if (jogoInicial){
        window.addEventListener('keyup', function (e) {
            let letraPresionada = e.key;
            letraMaiuscula = letraPresionada.toUpperCase();
            if (letraPresionada.length === 1 && letraMaiuscula.match(/^[A-ZÇ ]+$/)){
                if (palavraEscolhida.indexOf(letraMaiuscula) >= 0){
                    escreverLetra(letraMaiuscula, true);
                }else{
                    escreverLetra(letraMaiuscula, false);
                }
            }
        }, false);  
    }    
    jogoInicial = false;
}
function imprimirForca(){
    let x = 320;
    let y = 400;
    let ctx = forca.getContext("2d");
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 160, y);
    ctx.stroke();
    ctx.moveTo(x + 80, y);
    ctx.lineTo(x + 80, y - 320);
    ctx.stroke();
    ctx.moveTo(x + 75, y - 320);
    ctx.lineTo(x + 220, y - 320);
    ctx.stroke();
    ctx.moveTo(x + 215, y - 320);
    ctx.lineTo(x + 215, y - 280);
    ctx.stroke();
}
function desenhaTracos(tamanho){
    let info = forca.getBoundingClientRect();
    let larguraCanva = info.width;
    let alturaCanva = info.height;
    let MetadeTamanhoPalavraPixel = ((tamanho * 40) + ((tamanho -1) * 40)) / 2;
    let x = (larguraCanva / 2) - MetadeTamanhoPalavraPixel;
    let y = alturaCanva;
    let ctx = forca.getContext("2d");
    ctx.clearRect(0, 0, larguraCanva, alturaCanva);
    ctx.lineWidth = 10;
    ctx.beginPath();
    for (let i = 0; i < tamanho; i++){
        ctx.moveTo(x, y);
        x += 40;
        ctx.lineTo(x, y);
        ctx.stroke();
        x += 40;
    }
    tentativas = 6;
    parteForca = 0;
    acertos = 0;
    xPalavra = 0;
    yErrado = 480;
    xErrado = 180;
    imprimirForca();
    aguardarTentativa();
}

btnStart.onclick = desenhaCanvas;
btnQuit.onclick = desistirJogo;
btnNewGame.onclick = novaPalavra;
btnAdd.onclick = addPalavra;
btnVoltar.onclick = voltar;
btnSalvar.onclick = salvarPalavra;
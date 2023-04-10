const itensCardapio = [
    {pizza: "Quatro Queijos", preco:"R$:45,00", imagem:'url("https://4.bp.blogspot.com/-u3xPiG3U_Qk/VaFwLCS8kwI/AAAAAAAATko/DHpSZA0nIfs/s1600/Pizza%2Bestranha.jpg")'},
    {pizza: "Calabresa", preco:"R$:35,00", imagem:'url("https://www.fatosdesconhecidos.com.br/wp-content/uploads/2019/07/pizza.jpg")'},
    {pizza: "Frango", preco:"R$:50,00", imagem:'url("https://www.fatosdesconhecidos.com.br/wp-content/uploads/2019/07/pizza.jpg")'}
]

var itemAtual = 0;
var imagem;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('esquerda').addEventListener('click', esquerda);
    document.getElementById('direita').addEventListener('click', direita);
    document.getElementById('btnNovo').addEventListener('click', showOptions);
    imagem = document.getElementById('imagem')
}

function esquerda(){
    if (itemAtual>0){
        itemAtual --;
   }else{
    itemAtual = itensCardapio.length - 1;
   }
    atualizarTela();
}

function direita(){
    if (itemAtual < itensCardapio.length){
        itemAtual ++;
   }else{
    itemAtual = 0;
   }
    atualizarTela();
}

function atualizarTela(){
    imagem.style.backgroundImage = itensCardapio[itemAtual].imagem;
}

function showOptions() {
    document.getElementById('app-lista').style.display = 'none';
}
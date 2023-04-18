var pizza;
var preco;
var imagem;
var PIZZARIA_ID = 'Pizzaria da Mooca Belo'

var itensCardapio;
var itemAtual = 0;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    cordova.plugin.http.setDataSerializer('json');
    imagem = document.getElementById('imagem');
    pizza = document.getElementById('pizza');
    preco = document.getElementById('preco');
    document.getElementById('btnNovo').addEventListener('click', novo);
    document.getElementById('btnFoto').addEventListener('click', foto);
    document.getElementById('btnSalvar').addEventListener('click', salvar);
    document.getElementById('btnExcluir').addEventListener('click', excluir);
    document.getElementById('btnCancelar').addEventListener('click', cancelar);
}

function novo() {
    applista.style.display = 'none'; // oculta lista
    appcadastro.style.display = 'flex'; // exibe cadastro 
    console.log('oi') 
}

//ta dando erro
const foto = () => {
    navigator.camera.getPicture(onSuccess, 
                                onFail, 
                                { quality: 50, 
                                  destinationType: Camera.DestinationType.DATA_URL }
                               );  
    
    function onSuccess(imageData) {
        preview.style.backgroundImage = "url('data:image/jpeg;base64," + imageData + "')"; 
    }  
    
    function onFail(message) { 
        alert('Failed because: ' + message); 
    }
}

function salvar() {
    // espeficica o formato JSON para os dados enviados
    cordova.plugin.http.setDataSerializer('json');
    cordova.plugin.http.post('https://pedidos-pizzaria.glitch.me/admin/pizza/', {
        pizzaria: PIZZARIA_ID, 
        pizza: pizza.value, 
        preco: preco.value, 
        imagem: imagem.style.backgroundImage
    }, {}, function(response) {
        // verifica se deu certo (status = 200)
        alert(response.status);
    }, function(response) {
        alert(response.error);
    });
}

function excluir() {
    //terminar função de deletar
    cordova.plugin.http.delete('https://pedidos-pizzaria.glitch.me/admin/pizzas/:PIZZARIA_ID', {}, {}, 
    function(response) {
        itensCardapio = JSON.parse(response.data);
        atualizarTela();
    }, function(response) {
        alert(response.error);
    });
}

function cancelar() {  
    //voltar pra tela inicial
}

function carregarPizzas() {
    //terminar função de mostrar as pizzas cadastradas
    cordova.plugin.http.get('https://pedidos-pizzaria.glitch.me/admin/pizzas/:PIZZARIA_ID', {}, {}, 
    function(response) {
        itensCardapio = JSON.parse(response.data);
        atualizarTela();
    }, function(response) {
        alert(response.error);
    });
}
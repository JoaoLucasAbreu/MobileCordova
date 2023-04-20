const pizzaria = 'Pizzaria da Mooca Belo'

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    carregar();
    document.getElementById('btnCancelar').addEventListener("click",cancelar);
    document.getElementById('btnNovo').addEventListener("click",novo);
    document.getElementById('btnFoto').addEventListener("click",foto);
    document.getElementById('btnExcluir').addEventListener("click",excluir);
    var btnSalvar = document.getElementById('btnSalvar');
    var preco = document.getElementById('preco');
    var pizza = document.getElementById('pizza');

    cordova.plugin.http.setDataSerializer('json');
}

function novo() {
    applista.style.display = 'none';
    appcadastro.style.display = 'flex';
    btnSalvar.onclick = function () {
        salvar();
    }
}

function cancelar() {
    applista.style.display = 'flex';
    appcadastro.style.display = 'none';
    listaPizzas.innerHTML = '';
    carregarPizzas();
}
function foto() {
    navigator.camera.getPicture(onSuccess, 
        onFail, 
        { quality: 50, 
          destinationType: Camera.DestinationType.DATA_URL }
       );

    function onSuccess(imageData) {
    imagem.style.backgroundImage = "url('data:image/jpeg;base64," + imageData + "')"; 
    }

    function onFail(message) { 
    alert('Failed because: ' + message); 
    }
}
function salvar() {
    cordova.plugin.http.post("https://pedidos-pizzaria.glitch.me/admin/pizza/",{
        pizzaria: pizzaria, 
        pizza: pizza.value, 
        preco: preco.value, 
        imagem: imagem.style.backgroundImage
    },{},function(response){
        alert(response.status);
    },function(response){
        alert(response.error);
    });
}
function excluir() {
    let pizza = pizza.value;
    cordova.plugin.http.delete("https://pedidos-pizzaria.glitch.me/admin/pizza/"+pizzaria+"/"+pizza,{
    },{},function(response){
        alert(response.status);
    },function(response){
        alert(response.error);
    });
}
function carregar() {
    cordova.plugin.http.get('https://pedidos-pizzaria.glitch.me/admin/pizzas/'+pizzaria,{},{}, 
    function(response) {
        if(response.data != '') {
            listaPizzasCadastradas = JSON.parse(response.data);
            listaPizzasCadastradas.forEach((item, idx) => {

                const novo = document.createElement('div');
                novo.classList.add('linha');
                novo.innerHTML = item.pizza;
                novo.id = idx;
                novo.onclick = function () {
                    carregarDadosPizza (novo.id);
                    applista.style.display = 'none'; 
                    appcadastro.style.display = 'flex';
                };
                
                listaPizzas.appendChild(novo);
            });
        }
    }, 
    function(response) {
        alert(response.error);
    });
}
function carregarDadosPizza(id) {
    imagem.style.backgroundImage = listaPizzasCadastradas[id].imagem;
    preco.value = listaPizzasCadastradas[id].preco;
    pizza.value = listaPizzasCadastradas[id].pizza;
    let idpizza = listaPizzasCadastradas[id]._id;
    btnSalvar.onclick = function () {
        atualizar(idpizza);
    }
}
function atualizar(id) {
    cordova.plugin.http.put("https://pedidos-pizzaria.glitch.me/admin/pizza/",{
        pizzaid: id,
        pizzaria: PIZZARIA_ID, 
        pizza: pizza.value, 
        preco: preco.value, 
        imagem: imagem.style.backgroundImage
    },{},function(response){
        alert(response.status);
    },function(response){
        alert(response.error);
    })
}


const visualizarPedidos = () =>{
    document.getElementById('triangulo-pedidos').innerHTML=`<i class="fa-solid fa-caret-down"></i>`;
    document.getElementById('triangulo-tomados').innerHTML=``;
    document.getElementById('triangulo-entregados').innerHTML=``;

    document.getElementById('btn-pedidos').classList.add("active");
    document.getElementById('btn-tomados').classList.remove("active");
    document.getElementById('btn-entregados').classList.remove("active");

    document.getElementById('pagina-pedidos').style.display="block";
    document.getElementById('pagina-tomados').style.display="none";
    document.getElementById('pagina-entregas').style.display="none";

}

const visualizarTomados = () =>{
    document.getElementById('triangulo-pedidos').innerHTML=``;
    document.getElementById('triangulo-tomados').innerHTML=`<i class="fa-solid fa-caret-down"></i>`;
    document.getElementById('triangulo-entregados').innerHTML=``;

    document.getElementById('btn-pedidos').classList.remove("active");
    document.getElementById('btn-tomados').classList.add("active");
    document.getElementById('btn-entregados').classList.remove("active");

    document.getElementById('pagina-pedidos').style.display="none";
    document.getElementById('pagina-tomados').style.display="block";
    document.getElementById('pagina-entregas').style.display="none";
}

const visualizarEntregas = () =>{
    document.getElementById('triangulo-pedidos').innerHTML=``;
    document.getElementById('triangulo-tomados').innerHTML=``;
    document.getElementById('triangulo-entregados').innerHTML=`<i class="fa-solid fa-caret-down"></i>`;

    document.getElementById('btn-pedidos').classList.remove("active");
    document.getElementById('btn-tomados').classList.remove("active");
    document.getElementById('btn-entregados').classList.add("active");

    document.getElementById('pagina-pedidos').style.display="none";
    document.getElementById('pagina-tomados').style.display="none";
    document.getElementById('pagina-entregas').style.display="block";
}
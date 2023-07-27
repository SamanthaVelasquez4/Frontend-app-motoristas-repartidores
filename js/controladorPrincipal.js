var pedidos=[
    {
        id:11,
        factura:{
            id:5,
            fecha: "12/7/10",
            cliente: {
                primerNombre: "Mario",
                primerApellido: "Martinez",
                numTelefono:"5896-5235"
            },
            empresa:{
                nombre: "Blalala",
                direccion: "Mall Multiplaza",
            },
            productos:[
                {
                    producto: {
                        nombre: "Camisa",
                        precio: 100, 
                    },
                    cantidad: 2,
                },
                {
                    producto: {
                        nombre: "Leggin",
                        precio: 200, 
                    },
                    cantidad: 1,
                },
                {
                    producto: {
                        nombre: "Tenis",
                        precio: 1000, 
                    },
                    cantidad: 1,
                },
                {
                    producto: {
                        nombre: "Camisa",
                        precio: 500, 
                    },
                    cantidad: 2,
                },
                
            ],
        },
        costoEnvio:80,
        ubicacion: "Aldea de Suyapa",
        calificacion: null,
        estado:null,
        motorista:{
            primerNombre: null,
            primerApellido: null,
            calificacion:null,
            tipoVehiculo:null,
            placa:null,
            numTelefono:null,
        }
    },
    {
        id:12,
        factura:{
            id:12,
            fecha: "12/7/10",
            cliente: {
                primerNombre: "Mario",
                primerApellido: "Martinez",
                numTelefono:"5896-5235"
            },
            empresa:{
                nombre: "SportLine",
                direccion: "Mall Multiplaza",
            },
            productos:[
                {
                    producto: {
                        nombre: "Camisa",
                        precio: 100, 
                    },
                    cantidad: 2,
                },
                {
                    producto: {
                        nombre: "Leggin",
                        precio: 200, 
                    },
                    cantidad: 1,
                },                
            ],
        },
        costoEnvio:80,
        ubicacion: "Aldea de Suyapa",
        calificacion: null,
        estado:null,
        motorista:{
            primerNombre: null,
            primerApellido: null,
            calificacion:null,
            tipoVehiculo:null,
            placa:null,
            numTelefono:null,
        }
    },
    {
        id:13,
        factura:{
            id:5,
            fecha: "12/7/10",
            cliente: {
                primerNombre: "Ana",
                primerApellido: "Martinez",
                numTelefono:"5896-5235"
            },
            empresa:{
                nombre: "Nike",
                direccion: "Res. las hadas",
            },
            productos:[
                {
                    producto: {
                        nombre: "Camisa",
                        precio: 100, 
                    },
                    cantidad: 2,
                },
                {
                    producto: {
                        nombre: "Leggin",
                        precio: 200, 
                    },
                    cantidad: 1,
                },
                {
                    producto: {
                        nombre: "Tenis",
                        precio: 1000, 
                    },
                    cantidad: 1,
                },
            ],
        },
        costoEnvio:80,
        ubicacion: "Col. Kennedy",
        calificacion: null,
        estado:null,
        motorista:{
            primerNombre: null,
            primerApellido: null,
            calificacion:null,
            tipoVehiculo:null,
            placa:null,
            numTelefono:null,
        }
    },
]

var repartidor={};

//localStorage
var localstorage=window.localStorage;
repartidor= JSON.parse(localstorage.getItem('repartidor'));


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
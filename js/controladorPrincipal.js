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

const visualizarPerfil = () =>{

    //Poner imagen del usuario dependiendo el genero
    if(repartidor.genero=="F"){
        document.getElementById('img-perfil-modal').setAttribute('src','img/usuario2.png');
    }else{
        document.getElementById('img-perfil-modal').setAttribute('src','img/usuario.png');
    }

    //Poner calificacion
    document.getElementById('calificacion-perfil-modal').innerHTML="";
    for(let i=0; i<repartidor.calificacion;i++){
      document.getElementById('calificacion-perfil-modal').innerHTML+=`<i class="fa-solid fa-star" style="color: #fd8d07;"></i>`;  
    }
    for(let i=0; i<5-repartidor.calificacion;i++){
        document.getElementById('calificacion-perfil-modal').innerHTML+=`<i class="fa-solid fa-star"></i>`;
    }

    //Ver informacion general del usuario
    document.getElementById('info-perfil-modal').innerHTML=
    `<p class="fw-bold">${repartidor.primerNombre} ${repartidor.primerApellido}</p>
    <p>${repartidor.id}</p>
    <p>${repartidor.usuario}</p>
    <p>${repartidor.edad} años</p>
    <p>${repartidor.numTelefono}</p>
    <p>Pedidos entregados: ${repartidor.pedidoEntregados.length}</p>
    <p>Ganancias: ${calcularGanancias()} lps</p>`;
    
}

//calcular ganancias del repartidor
const calcularGanancias = () => {
    let ganancia=0;
    repartidor.pedidoEntregados.forEach(pedido => {
        ganancia+=pedido.costoEnvio;
    });
    return ganancia;
}

//renderizar mensajes
const renderizarMensajes = () =>{
    let contMensajesLeido=0;
    document.getElementById('contenedor-mensajes-modal').innerHTML=``;
    repartidor.mensajes.forEach((mensaje,i) => {
        if(mensaje.estado){
            contMensajesLeido++;
            document.getElementById('contenedor-mensajes-modal').innerHTML+=
            `<div class="row p-2 mt-2">
                <div class="col cuerpo-mensaje rounded-3">
                    <p class="fw-bold text-center mt-2">${mensaje.encabezado}</p>
                    <p class="mb-2">${mensaje.contenido}</p>
                    <div class="row div-flex-end fs-5" >
                        <div class="col-2" style="color: red;" onclick="borrarMensaje(${i})"><i class="fa-solid fa-trash"></i></div>
                    </div>
                </div>
            </div>`;
        }else{
            document.getElementById('contenedor-mensajes-modal').innerHTML+=
            `<div class="row p-2 mt-2">
                <div class="col cuerpo-mensaje rounded-3">
                    <p class="fw-bold text-center mt-2">${mensaje.encabezado}</p>
                    <p class="mb-2">${mensaje.contenido}</p>
                    <div class="row div-flex-end fs-5" >
                        <div class="col-2" style="color: green;" onclick="leerMensaje(${i})"><i class="fa-solid fa-check"></i></div>
                        <div class="col-2" style="color: red;" onclick="borrarMensaje(${i})"><i class="fa-solid fa-trash"></i></div>
                    </div>
                </div>
            </div>`;
        }   
    });

    //Ver si todos los mensajes estan leidos
    if(contMensajesLeido==repartidor.mensajes.length){
        document.getElementById('alerta-mensaje').style.display="none";
    }else{
        document.getElementById('alerta-mensaje').style.display="block";
    }
}

//Que desde el inicio diga si hay mensajes abiertos o no
renderizarMensajes();

const leerMensaje= (index) =>{
    repartidor.mensajes[index].estado=true;
    renderizarMensajes();
}

const borrarMensaje= (index) =>{
    repartidor.mensajes.splice(index,1);
    renderizarMensajes();
}
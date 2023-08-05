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
        estado:"Buscando Repartidor",
        imagenPedido: "img/producto3.webp",
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
        imagenPedido: "img/producto.png",
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
        estado:"Buscando repartidor",
        imagenPedido:"img/producto2.jpg",
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

//variables globales
var repartidor={};
var pedidoVisualizado={};
var pedidoTomado={};
var indexPedidoTomado;
var modalConfirmarPedido = new bootstrap.Modal(document.getElementById('modalConfirmarPedido'));
var modalEstadoPedido = new bootstrap.Modal(document.getElementById('modalEstadoPedido'));
var modalConfirmarEntregado = new bootstrap.Modal(document.getElementById('modalConfirmarEntregado'));

//localStorage
var localstorage=window.localStorage;
repartidor= JSON.parse(localstorage.getItem('repartidor'));

//Funciones para la navegacion entre los Pedidos, Pedidos Tomados y Pedidos Entregados
const visualizarPedidos = () =>{
    //mostrar triangulo correspondiente a pedidos
    document.getElementById('triangulo-pedidos').innerHTML=`<i class="fa-solid fa-caret-down"></i>`;
    document.getElementById('triangulo-tomados').innerHTML=``;
    document.getElementById('triangulo-entregados').innerHTML=``;

    //seleccionar que pedidos esta activo
    document.getElementById('btn-pedidos').classList.add("active");
    document.getElementById('btn-tomados').classList.remove("active");
    document.getElementById('btn-entregados').classList.remove("active");

    //Mostrar solo el div de pedidos
    document.getElementById('pagina-pedidos').style.display="block";
    document.getElementById('pagina-tomados').style.display="none";
    document.getElementById('pagina-entregas').style.display="none";

    //renderizar pedidos
    document.getElementById('pagina-pedidos').innerHTML="";

    pedidos.forEach(pedido => {
        document.getElementById('pagina-pedidos').innerHTML+=
        `<div class="row rounded-2 mb-3 pt-2 pb-2" data-bs-toggle="modal" data-bs-target="#modalInfoProducto" onclick="visualizarInfoPedido(${pedido.id}, 'pedido')">
            <div class="col-4 centrar-div"> 
                <img src="${pedido.imagenPedido}" alt="">
            </div>
            <div class="col-8 grid">
                <div class="row text-center">
                    <p class="fw-bold">Pedido #${pedido.id}</p>
                    <p class="fw-bold nombre">${pedido.factura.cliente.primerNombre} ${pedido.factura.cliente.primerApellido}</p>
                    <p class="telefono">${pedido.factura.cliente.numTelefono}</p>
                    <p class=" fw-bold comision">Comisión: ${pedido.costoEnvio} lps</p>
                    <p class="fst-italic direccion">${pedido.ubicacion}</p>
                </div>
                <div class="text-end">
                    <button type="button" class="btn-default mt-2" data-bs-toggle="modal" data-bs-target="#modalConfirmarPedido" onclick="tomarPedido(${pedido.id});">Tomar Pedido</button>
                </div> 
            </div>
        </div>`;
    });
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

    //renderizar pedidos tomados
    document.getElementById('pagina-tomados').innerHTML="";
    repartidor.pedidoTomados.forEach(pedido => {
        document.getElementById('pagina-tomados').innerHTML+=
        `<div class="row rounded-2 mb-3 pt-2 pb-2" data-bs-toggle="modal" data-bs-target="#modalInfoProducto" onclick="visualizarInfoPedido(${pedido.id}, 'tomado')">
            <div class="col-4 centrar-div"> 
                <img src="${pedido.imagenPedido}" alt="">
            </div>
            <div class="col-8 grid">
                <div class="row text-center">
                    <p class="fw-bold">Pedido #${pedido.id}</p>
                    <p class="fw-bold nombre">${pedido.factura.cliente.primerNombre} ${pedido.factura.cliente.primerApellido}</p>
                    <p class="telefono">${pedido.factura.cliente.numTelefono}</p>
                    <p class=" fw-bold comision">Comisión: ${pedido.costoEnvio} lps</p>
                    <p class="fst-italic direccion">${pedido.ubicacion}</p>
                </div>
                <div class="text-end">
                    <button type="button" class="btn-default mt-2" data-bs-toggle="modal" data-bs-target="#modalEstadoPedido" onclick="informacionEstado(${pedido.id})">Estado</button>
                </div> 
            </div>
        </div>`;
    })
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

    //renderizar pedidos entregados
    document.getElementById('pagina-entregas').innerHTML="";
    repartidor.pedidoEntregados.forEach(pedido =>{
        let texto="";
        for(let i=0; i<pedido.calificacion;i++){
            texto+=`<i class="fa-solid fa-star" style="color: #fd8d07;"></i>`;
        }
        for(let i=0; i<5-pedido.calificacion;i++){
            texto+=`<i class="fa-solid fa-star"></i>`;
        }
        document.getElementById('pagina-entregas').innerHTML+=
        `<div class="row rounded-2 mb-3 pt-2 pb-2" data-bs-toggle="modal" data-bs-target="#modalInfoProducto" onclick="visualizarInfoPedido(${pedido.id}, 'entrega')">
            <div class="col-4 centrar-div"> 
                <img src="${pedido.imagenPedido}" alt="">
            </div>
            <div class="col-8 grid">
                <div class="row text-center">
                    <p class="fw-bold">Pedido #${pedido.id}</p>
                    <p class="fw-bold nombre">${pedido.factura.cliente.primerNombre} ${pedido.factura.cliente.primerApellido}</p>
                    <p class="telefono">${pedido.factura.cliente.numTelefono}</p>
                    <p class=" fw-bold comision">Comisión: ${pedido.costoEnvio} lps</p>
                    <p class="fst-italic direccion">${pedido.ubicacion}</p>
                </div>
                <div class="text-center">
                    ${texto}
                </div> 
            </div>
        </div>`; 
    })
}

//Funciones para el nav del encabezado como ser Ver el perfil y mensajes
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

const tomarPedido = (id) =>{
    pedidoTomado = pedidos.find(element => element.id === id);
}

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

const leerMensaje= (index) =>{
    repartidor.mensajes[index].estado=true;
    renderizarMensajes();
}

const borrarMensaje= (index) =>{
    repartidor.mensajes.splice(index,1);
    renderizarMensajes();
}

//Funciones para los Modales
const confirmarPedidoTomado = () =>{
    //Poner los datos del motorista en el pedido para el cliente
    pedidoTomado.motorista.primerNombre=repartidor.primerNombre;
    pedidoTomado.motorista.primerApellido=repartidor.primerApellido;
    pedidoTomado.motorista.calificacion=repartidor.calificacion;
    pedidoTomado.motorista.tipoVehiculo=repartidor.tipoVehiculo;
    pedidoTomado.motorista.placa=repartidor.placa;
    pedidoTomado.motorista.numTelefono=repartidor.numTelefono;
    pedidoTomado.estado="En camino";
    console.log(pedidoTomado);

    //Agregar el pedido al arreglo pedidos Tomados del repartidor
    repartidor.pedidoTomados.push(pedidoTomado);

    //Borrar el pedido del arregelo de pedidos
    pedidos.splice(pedidos.indexOf(pedidoTomado),1);

    //Cerrar modal y mostrar apartado de tomados
    modalConfirmarPedido.hide();
    visualizarTomados();
}

const visualizarInfoPedido = (id, tipo) =>{
    pedidoVisualizado={};
    if(tipo=="pedido"){
        pedidoVisualizado= pedidos.find(element => element.id === id);
    }else if(tipo=="tomado"){
        pedidoVisualizado= repartidor.pedidoTomados.find(element => element.id === id);
    }else{
        pedidoVisualizado=  repartidor.pedidoEntregados.find(element => element.id === id);
    }
    

    //encabezado
    document.getElementById('informacion-general-pedido-modal').innerHTML=
    `<p class="mt-2 fw-bold titulo">Pedido #${pedidoVisualizado.id}</p>
    <hr class="m-2">
    <div>
    <p class="fw-bold titulo">Informacion cliente</p>
    <p>Nombre: ${pedidoVisualizado.factura.cliente.primerNombre} ${pedidoVisualizado.factura.cliente.primerApellido}</p>
    <p>Telefono: ${pedidoVisualizado.factura.cliente.numTelefono}</p>
    <p>Direccion: ${pedidoVisualizado.ubicacion}</p>
    </div>
    <hr class="m-2">
    <p class="fw-bold titulo">Factura #${pedidoVisualizado.factura.id}</p>
    <p>Fecha: ${pedidoVisualizado.factura.fecha}</p>
    <p>Empresa: ${pedidoVisualizado.factura.empresa.nombre}</p>
    <p>Dirección: ${pedidoVisualizado.factura.empresa.direccion}</p>`;

    //productos
    document.getElementById('productos-factura').innerHTML=``;

    pedidoVisualizado.factura.productos.forEach(producto =>{
        document.getElementById('productos-factura').innerHTML+=
        `<tr>
            <td>${producto.producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.producto.precio}</td>
        </tr>`;
    });

    document.getElementById('productos-factura').innerHTML+=
        `<tr>
            <td>Subtotal</td>
            <td colspan="2">${calcularSubtotal()}</td>
        </tr>
        <tr>
            <td>ISV</td>
            <td colspan="2">${calcularISV()}</td>
        </tr>
        <tr>
            <td>Envio</td>
            <td colspan="2">${pedidoVisualizado.costoEnvio}</td>
        </tr>
        <tr>
            <td>Total</td>
            <td colspan="2">${calcularTotal()+pedidoVisualizado.costoEnvio}</td>
        </tr>`;
}

//Funciones para el modal de estado
const informacionEstado = (id) =>{
    pedidoTomado = repartidor.pedidoTomados.find(element => element.id === id);

    let btnCamino= document.getElementById('btn-estado-camino');
    let btnTienda= document.getElementById('btn-estado-tienda');
    let btnDestino= document.getElementById('btn-estado-destino');
    let btnEntrega= document.getElementById('btn-estado-entregado');

    //El boton del estado actual va a aparecer de distinto color
    if(pedidoTomado.estado=="En camino"){
        btnCamino.classList.add('active-btn-estado');
        btnDestino.classList.remove('active-btn-estado');
        btnTienda.classList.remove('active-btn-estado');
        btnEntrega.classList.remove('active-btn-estado');
    }else if(pedidoTomado.estado=="En tienda"){
        btnTienda.classList.add('active-btn-estado');
        btnDestino.classList.remove('active-btn-estado');
        btnCamino.classList.remove('active-btn-estado');
        btnEntrega.classList.remove('active-btn-estado');
    }else if(pedidoTomado.estado=="Entregado"){
        btnEntrega.classList.add('active-btn-estado');
        btnDestino.classList.remove('active-btn-estado');
        btnTienda.classList.remove('active-btn-estado');
        btnCamino.classList.remove('active-btn-estado');
    }else{
        btnDestino.classList.add('active-btn-estado');
        btnCamino.classList.remove('active-btn-estado');
        btnTienda.classList.remove('active-btn-estado');
        btnEntrega.classList.remove('active-btn-estado');
    }
}

const estadoEnTienda = () =>{
    pedidoTomado.estado="En tienda";
    modalEstadoPedido.hide();
}

const estadoEnCamino = () =>{
    console.log(pedidoTomado);
    pedidoTomado.estado= "En camino";
    modalEstadoPedido.hide();
}

const estadoEnDestino = () =>{
    pedidoTomado.estado="En destino";
    modalEstadoPedido.hide();
}

const estadoEntregado = () =>{
    pedidoTomado.estado ="Entregado";

    //Pasar el pedido a entrgados del repartidor
    repartidor.pedidoEntregados.push(pedidoTomado);

    //Borrar el pedido del arreglo de tomados
    repartidor.pedidoTomados.splice(repartidor.pedidoTomados.indexOf(pedidoTomado),1);

    //Cerrar Modal y mostrar el apartado de pedidos Entregados
    modalConfirmarEntregado.hide();
    visualizarEntregas();
}

//calculos
const calcularGanancias = () => {
    let ganancia=0;
    repartidor.pedidoEntregados.forEach(pedido => {
        ganancia+=pedido.costoEnvio;
    });
    return ganancia;
}

const calcularSubtotal = () =>{
    let subtotal=0;
    pedidoVisualizado.factura.productos.forEach(producto =>{
        subtotal+=(producto.producto.precio*producto.cantidad);
    });
    return subtotal;
}

const calcularISV = () =>{
    let ISV=0;
    ISV=0.15*calcularSubtotal();
    return ISV;
}

const calcularTotal = () =>{
    let total=0;
    total= calcularSubtotal() + calcularISV();
    return total;
}

//Funciones que se realizan antes de que el usuario interactue
visualizarPedidos();
renderizarMensajes();



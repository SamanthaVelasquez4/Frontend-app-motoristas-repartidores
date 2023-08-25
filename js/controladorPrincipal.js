let pedidos=[];

//variables globales
let idRepartidor;
let repartidor={};
let pedidoTomado;
let indexPedidoTomado;
const modalConfirmarPedido = new bootstrap.Modal(document.getElementById('modalConfirmarPedido'));
const modalEstadoPedido = new bootstrap.Modal(document.getElementById('modalEstadoPedido'));
const modalConfirmarEntregado = new bootstrap.Modal(document.getElementById('modalConfirmarEntregado'));
const modalWarning= new bootstrap.Modal(document.getElementById('modalWarning'));
const modalInfoProducto= new bootstrap.Modal(document.getElementById('modalInfoProducto'));
const modalCambioContraseña= new bootstrap.Modal(document.getElementById('modalCambioContraseña'));
let mensajes=[];

//localStorage
var localstorage=window.localStorage;
let almacenado= JSON.parse(localstorage.getItem('repartidor'));

//Obtener respartidor
const obtenerRepartidor = async() =>{
    try{
        let respuesta = await fetch(`http://localhost:5555/motoristas/${idRepartidor}`,
        {
        method: 'GET',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
        });

        let a = await respuesta.json();
        if(a.status){
            repartidor=a.respuesta;
            mensajes=repartidor.mensajes;
            renderizarMensajes();
            //console.log(repartidor);
        }else{
            console.log(a);
            modalWarning.show();
        }
    }catch{
        modalWarning.show();
        //console.log('entra aqui');
        window.location.href="index.html";
    }
 
    /*window.location.href="../index.html";*/
 }

//Funciones para la navegacion entre los Pedidos, Pedidos Tomados y Pedidos Entregados
const visualizarPedidos = async() =>{
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

    try{
        let respuesta = await fetch('http://localhost:5555/pedidos/obtener/Pedido',
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
        });

        let a = await respuesta.json();
        if(a.status && a.respuesta.length>0){
            pedidos=a.respuesta;
            document.getElementById('pagina-pedidos').innerHTML="";
            pedidos.forEach(pedido => {
                let factura=pedido.factura[0]
                document.getElementById('pagina-pedidos').innerHTML+=
                `<div class="row rounded-2 mb-3 pt-2 pb-2" data-bs-toggle="modal" data-bs-target="#modalInfoProducto" onclick="visualizarInfoPedido('${pedido._id}')">
                    <div class="col-4 centrar-div"> 
                        <img src="${pedido.img}" alt="">
                    </div>
                    <div class="col-8 grid">
                        <div class="row text-center">
                            <p class="titulo-id" >${pedido._id}</p>
                            <p class="fw-bold nombre">${factura.cliente.nombre}</p>
                            <p class="telefono">${factura.cliente.numTelefono}</p>
                            <p class=" fw-bold comision">Comisión: ${pedido.costoEnvio} lps</p>
                            <p class="fst-italic direccion">${pedido.ubicacion}</p>
                        </div>
                        <div class="text-end">
                            <button type="button" style="font-size:0.8rem;" class="btn-default mt-2" data-bs-toggle="modal" data-bs-target="#modalConfirmarPedido" onclick="tomarPedido('${pedido._id}');">Tomar Pedido</button>
                        </div> 
                    </div>
                </div>`;
            });
        }else if(a.respuesta.length<=0){
            document.getElementById('pagina-pedidos').innerHTML=
            `<div class="vacio" style="color: #ffffff;">
                <i class="fa-solid fa-magnifying-glass fa-fade"></i>
                Buscando pedidos...
            </div>`;
            
        }else{
            console.log(a);
            modalWarning.show();
        }
    }catch{
        modalWarning.show();
        console.log('entra aqui')
    }

    
}


const visualizarTomados = async() =>{
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
    try{
        let respuesta = await fetch(`http://localhost:5555/motoristas/${idRepartidor}/obtenerPedidos/Tomado`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
        });

        let a = await respuesta.json();
        if(a.status && a.respuesta.length>0){
            let pedidoTomados=a.respuesta;
            document.getElementById('pagina-tomados').innerHTML="";
            pedidoTomados.forEach(pedido => {
                let factura=pedido.factura[0];
                document.getElementById('pagina-tomados').innerHTML+=
                `<div class="row rounded-2 mb-3 pt-2 pb-2" data-bs-toggle="modal" data-bs-target="#modalInfoProducto" onclick="visualizarInfoPedido('${pedido._id}')">
                    <div class="col-4 centrar-div"> 
                        <img src="${pedido.img}" alt="">
                    </div>
                    <div class="col-8 grid">
                        <div class="row text-center">
                            <p class="titulo-id">${pedido._id}</p>
                            <p class="fw-bold nombre">${factura.cliente.nombre}</p>
                            <p class="telefono">${factura.cliente.numTelefono}</p>
                            <p class=" fw-bold comision">Comisión: ${pedido.costoEnvio} lps</p>
                            <p class="fst-italic direccion">${pedido.ubicacion}</p>
                        </div>
                        <div class="text-end">
                            <button type="button" class="btn-default mt-2" data-bs-toggle="modal" data-bs-target="#modalEstadoPedido" onclick="informacionEstado('${pedido._id}', '${pedido.estadoCliente}')">Estado</button>
                        </div> 
                    </div>
                </div>`;
            })
        }else if(a.respuesta.length<=0){
            document.getElementById('pagina-tomados').innerHTML=
            `<div class="vacio" style="color: #ffffff;">
                <i class="fa-regular fa-clock fa-spin"></i>
                No hay pedidos tomado...
            </div>`;
        }else{
            console.log(a);
            modalWarning.show();
        }
    }catch{
        modalWarning.show();
        //console.log('entra aqui')
    }
   
}

const visualizarEntregas = async() =>{
    document.getElementById('triangulo-pedidos').innerHTML=``;
    document.getElementById('triangulo-tomados').innerHTML=``;
    document.getElementById('triangulo-entregados').innerHTML=`<i class="fa-solid fa-caret-down"></i>`;

    document.getElementById('btn-pedidos').classList.remove("active");
    document.getElementById('btn-tomados').classList.remove("active");
    document.getElementById('btn-entregados').classList.add("active");

    document.getElementById('pagina-pedidos').style.display="none";
    document.getElementById('pagina-tomados').style.display="none";
    document.getElementById('pagina-entregas').style.display="block";

    try{
        let respuesta = await fetch(`http://localhost:5555/motoristas/${idRepartidor}/obtenerPedidos/Entregado`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
        });

        let a = await respuesta.json();
        if(a.status && a.respuesta.length>0){
           let pedidoEntregados=a.respuesta;
           //renderizar pedidos entregados
            document.getElementById('pagina-entregas').innerHTML="";
            pedidoEntregados.forEach(pedido =>{
                //console.log(pedido);
                let factura= pedido.factura[0];
                let texto="";
                for(let i=0; i<pedido.calificacion;i++){
                    texto+=`<i class="fa-solid fa-star" style="color: #fd8d07;"></i>`;
                }
                for(let i=0; i<5-pedido.calificacion;i++){
                    texto+=`<i class="fa-solid fa-star"></i>`;
                }
                document.getElementById('pagina-entregas').innerHTML+=
                `<div class="row rounded-2 mb-3 pt-2 pb-2" data-bs-toggle="modal" data-bs-target="#modalInfoProducto" onclick="visualizarInfoPedido('${pedido._id}')">
                    <div class="col-4 centrar-div"> 
                        <img src="${pedido.img}" alt="">
                    </div>
                    <div class="col-8 grid">
                        <div class="row text-center">
                            <p class="titulo-id">${pedido._id}</p>
                            <p class="fw-bold nombre">${factura.cliente.nombre}</p>
                            <p class="telefono">${factura.cliente.numTelefono}</p>
                            <p class=" fw-bold comision">Comisión: ${pedido.costoEnvio} lps</p>
                            <p class="fst-italic direccion">${pedido.ubicacion}</p>
                        </div>
                        <div class="text-center">
                            ${texto}
                        </div> 
                    </div>
                </div>`; 
            })
        }else if(a.respuesta.length<=0){
            document.getElementById('pagina-entregas').innerHTML=
            `<div class="vacio" style="color: #ffffff;">
                <i class="fa-regular fa-folder-open fa-bounce"></i>
                No hay pedidos entregados...
            </div>`;
        }
        else{
            console.log(a);
            modalWarning.show();
        }
    }catch{
        modalWarning.show();
        //console.log('entra aqui')
    }
}

//Funciones para el nav del encabezado como ser Ver el perfil y mensajes
const visualizarPerfil = () =>{
    obtenerRepartidor();
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
    <p>${repartidor._id}</p>
    <p>${repartidor.usuario}</p>
    <p>${repartidor.edad} años</p>
    <p>${repartidor.numTelefono}</p>
    <p>Pedidos entregados: ${repartidor.pedidoEntregados.length}</p>`;
    
}

const tomarPedido = (id) =>{
    pedidoTomado =id;
}

const renderizarMensajes = () =>{
    let contMensajesNoLeido=0;
    document.getElementById('contenedor-mensajes-modal').innerHTML=``;
    for(let i=0; i< mensajes.length; i++){
        let mensaje=mensajes[i];
        if(mensaje.estado){
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
            contMensajesNoLeido++;
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
    };
    //console.log(contMensajesNoLeido);
    //Ver si todos los mensajes estan leidos
    if(contMensajesNoLeido!=0){
        document.getElementById('alerta-mensaje').style.display="block";
    }else{
        document.getElementById('alerta-mensaje').style.display="none";
    }
}

const leerMensaje= async(index) =>{
    try{
        let respuesta = await fetch(`http://localhost:5555/motoristas/${idRepartidor}/mensajeLeido/${index}`,
        {
        method: 'PUT',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
        });

        let a = await respuesta.json();
        if(a.status){
            obtenerRepartidor();
        }else{
            console.log(a);
            modalWarning.show();
        }
    }catch{
        modalWarning.show();
        //console.log('entra aqui');
        window.location.href="index.html";
    }
}

const borrarMensaje= async(index) =>{
    try{
        let respuesta = await fetch(`http://localhost:5555/motoristas/${idRepartidor}/eliminar/mensaje/${index}/prueba`,
        {
        method: 'PUT',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
        });

        let a = await respuesta.json();
        if(a.status){
            obtenerRepartidor();
        }else{
            console.log(a);
            modalWarning.show();
        }
    }catch{
        modalWarning.show();
        //console.log('entra aqui');
        window.location.href="index.html";
    }
}

//Funciones para los Modales
const confirmarPedidoTomado = async() =>{
    try{
        let respuesta = await fetch(`http://localhost:5555/motoristas/${idRepartidor}/pedido/${pedidoTomado}`,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
        });
    
        let a = await respuesta.json();
        if(a.status){
            visualizarTomados();
            document.getElementById('contenedor-de-pedidos').scrollTop= document.getElementById('contenedor-de-pedidos').scrollHeight;
        }else{
            modalWarning.show();
            console.log(a);
        }
    }catch{
        modalWarning.show();
    }

    //Cerrar modal y mostrar apartado de tomados
    modalConfirmarPedido.hide();
}

const visualizarInfoPedido = async(id) =>{
    
    try{
        let respuesta = await fetch(`http://localhost:5555/pedidos/${id}`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
        });

        let a = await respuesta.json();
        if(a.status){
            let pedidoVisualizado= a.respuesta;
            let factura=pedidoVisualizado.factura[0];
            //encabezado
            document.getElementById('informacion-general-pedido-modal').innerHTML=
            `<p class="mt-2">Código del pedido</p>
            <p class="mt-1 fw-bold">${pedidoVisualizado._id}</p>
            <hr class="m-2">
            <div>
            <p class="fw-bold titulo">Información cliente</p>
            <p>Nombre: ${factura.cliente.nombre}</p>
            <p>Telefono: ${factura.cliente.numTelefono}</p>
            <p>Direccion: ${pedidoVisualizado.ubicacion}</p>
            </div>
            <hr class="m-2">
            <p class="fw-bold titulo">Información factura</p>
            <p class="fw-bold titulo">${pedidoVisualizado._idFactura}</p>
            <p>Fecha: ${factura.fecha}</p>
            <p>Empresa: ${factura.empresa.nombre}</p>
            <p>Dirección: ${factura.empresa.direccion}</p>`;

            //productos
            document.getElementById('productos-factura').innerHTML=``;

            factura.productos.forEach(producto =>{
                document.getElementById('productos-factura').innerHTML+=
                `<tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.precio}</td>
                </tr>`;
            });

            document.getElementById('productos-factura').innerHTML+=
            `<tr>
                <td>Subtotal</td>
                <td colspan="2">${factura.subtotal}</td>
            </tr>
            <tr>
                <td>ISV</td>
                <td colspan="2">${factura.isv}</td>
            </tr>
            <tr>
                <td>Envio</td>
                <td colspan="2">${pedidoVisualizado.costoEnvio}</td>
            </tr>
            <tr>
                <td>Total</td>
                <td colspan="2">${pedidoVisualizado.total}</td>
            </tr>`;

        }else{
            console.log(a);
            modalWarning.show();
        }
    }catch{
        modalWarning.show();
        console.log('entra aqui');
        modalInfoProducto.hide();
    }
    

    
}

//Funciones para el modal de estado
const informacionEstado = async(id, estado) =>{
    pedidoTomado = id;

    let btnCamino= document.getElementById('btn-estado-camino');
    let btnTienda= document.getElementById('btn-estado-tienda');
    let btnDestino= document.getElementById('btn-estado-destino');
    let btnEntrega= document.getElementById('btn-estado-entregado');

    //El boton del estado actual va a aparecer de distinto color
    if(estado=="En camino"){
        btnEntrega.disabled=true;
        btnDestino.disabled=true;
        btnCamino.disabled=false;
        btnTienda.disabled=false;
        btnCamino.classList.add('active-btn-estado');
        btnDestino.classList.remove('active-btn-estado');
        btnTienda.classList.remove('active-btn-estado');
        btnEntrega.classList.remove('active-btn-estado');
    }else if(estado=="En tienda"){
        btnCamino.disabled=true;
        btnEntrega.disabled=true;
        btnDestino.disabled=false;
        btnTienda.disabled=false;
        btnTienda.classList.add('active-btn-estado');
        btnDestino.classList.remove('active-btn-estado');
        btnCamino.classList.remove('active-btn-estado');
        btnEntrega.classList.remove('active-btn-estado');
    }else if(estado=="Entregado"){
        btnEntrega.classList.add('active-btn-estado');
        btnDestino.classList.remove('active-btn-estado');
        btnTienda.classList.remove('active-btn-estado');
        btnCamino.classList.remove('active-btn-estado');
    }else{
        btnCamino.disabled=true;
        btnEntrega.disabled=false;
        btnDestino.disabled=true;
        btnTienda.disabled=true;
        btnDestino.classList.add('active-btn-estado');
        btnCamino.classList.remove('active-btn-estado');
        btnTienda.classList.remove('active-btn-estado');
        btnEntrega.classList.remove('active-btn-estado');
    }
}

const estadoEnTienda = async() =>{
    try{
        let body={
            estadoCliente: "En tienda"
        }
        let respuesta = await fetch(`http://localhost:5555/pedidos/${pedidoTomado}/cambiarEstadoCliente`,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
            "body": JSON.stringify(body)
        });
    
        let a = await respuesta.json();
        if(a.status){
            visualizarTomados();
        }else{
            modalWarning.show();
        }
    }catch{
        modalWarning.show();
    }
    modalEstadoPedido.hide();
}

const estadoEnDestino = async() =>{
    try{
        let body={
            estadoCliente: "En destino"
        }
        let respuesta = await fetch(`http://localhost:5555/pedidos/${pedidoTomado}/cambiarEstadoCliente`,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
            "body": JSON.stringify(body)
        });
    
        let a = await respuesta.json();
        if(a.status){
            visualizarTomados();
        }else{
            modalWarning.show();
        }
    }catch{
        modalWarning.show();
    }
    modalEstadoPedido.hide();
}

const estadoEntregado = async() =>{
    try{
        let respuesta = await fetch(`http://localhost:5555/motoristas/${idRepartidor}/pedido/entregado/${pedidoTomado}`,
        {
        method: 'PUT',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
        });

        let a = await respuesta.json();
        if(a.status){
            modalConfirmarEntregado.hide();
            visualizarEntregas();
            document.getElementById('contenedor-de-pedidos').scrollTop= document.getElementById('contenedor-de-pedidos').scrollHeight;
        }else{
            console.log(a);
            modalWarning.show();
        }
    }catch{
        modalWarning.show();
        //console.log('entra aqui');
        window.location.href="index.html";
    }
    
}

//verificar Contraseña
const verificarContrasena = ()=>{
    if(document.getElementById('verificar-contrasena-input').value==document.getElementById('contrasena-input').value && document.getElementById('contrasena-input').value!="" && document.getElementById('verificar-contrasena-input').value!=""){
        document.getElementById('verificacion-contra').style.backgroundColor="green";
        return true;
    }else{
        document.getElementById('verificacion-contra').style.backgroundColor="red";
        return false;
    }
}

//guardar contraseña
const guardarContrasena = async() =>{

    if(verificarContrasena && document.getElementById('contrasena-actual').value!="" ){
        let body={
            usuario: repartidor.usuario,
            contrasena: document.getElementById('contrasena-actual').value,
            nuevaContrasena: document.getElementById('verificar-contrasena-input').value
        }
        try{
            let respuesta = await fetch('http://localhost:5555/motoristas/actalizar/contrasena',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json", //MIME type 
                },
                body: JSON.stringify(body)
            });
    
            let a = await respuesta.json();
            if(a.status){
                modalCambioContraseña.hide();
            }else{
                
            }
        }catch{
            modalWarning.show();
            console.log('entra aqui')
        }
    }else{
        document.getElementById('error-contra').style.display="block";
    }
    
}

const contrasena = () =>{
    document.getElementById('error-contra').style.display="none";
}
//Funciones que se realizan antes de que el usuario interactue
if (almacenado) {
    idRepartidor=almacenado._id;
    obtenerRepartidor();
    visualizarPedidos();
} else {
    window.location.href = '/index.html';
}


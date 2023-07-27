var repartidores=[
    {
        id:1,
        primerNombre: "Thomas",
        primerApellido: "Vasquez",
        usuario: "thomas1234",
        contrasena:"1234",
        numTelefono: "8752-9521",
        genero:"M",
        edad: 32,
        calificacion: 3,
        pedidoTomados:[
            {
                id:1,
                factura:{
                    id:1,
                    fecha: "12/7/10",
                    cliente: {
                        primerNombre: "Maria",
                        primerApellido: "Martinez",
                        numTelefono:"5896-5235"
                    },
                    empresa:{
                        nombre: "Nike",
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
                costoEnvio: 70,
                ubicacion: "Col. Hato de enmedio",
                calificacion: 2,
                estado:null   
            }
        ],
        pedidoEntregados: [
            {
                id:2,
                factura:{
                    id:2,
                    fecha: "12/7/10",
                    cliente: {
                        primerNombre: "Mario",
                        primerApellido: "Martinez",
                        numTelefono:"5896-5235"
                    },
                    empresa:{
                        nombre: "Nike",
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
                        
                    ],
                },
                costoEnvio: 70,
                ubicacion: "Col. Hato de enmedio",
                calificacion: 4,
                estado:"entregado",   
            },
            {
                id:3,
                factura:{
                    id:3,
                    fecha: "12/7/10",
                    cliente: {
                        primerNombre: "Mario",
                        primerApellido: "Martinez",
                        numTelefono:"5896-5235"
                    },
                    empresa:{
                        nombre: "Nike",
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
                    ],
                },
                costoEnvio: 70,
                ubicacion: "Col. Hato de enmedio",
                calificacion: 1,
                estado:"entregado",   
            }
        ],
        mensajes: [
            {
                encabezado: "¡Se le ha asignado un nuevo pedido, pedido#100!",
                contenido: "Por favor revise su apartado de tomados.",
                estado:true
            },
            {
                encabezado: "¡Se le ha asignado un nuevo pedido, pedido#10!",
                contenido: "Por favor revise su apartado de tomados.",
                estado:false
            },
            {
                encabezado: "¡Se le ha asignado un nuevo pedido, pedido#15!",
                contenido: "Por favor revise su apartado de tomados.",
                estado:true
            }
        ]
    },
    {
        id:2,
        primerNombre: "Juana",
        primerApellido: "Godoy",
        usuario: "juana1234",
        contrasena:"1234",
        numTelefono: "8752-9521",
        genero:"F",
        edad: 28,
        calificacion: 5,
        pedidoTomados:[
            {
                id:4,
                factura:{
                    id:4,
                    fecha: "12/7/10",
                    cliente: {
                        primerNombre: "Sam",
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
                        
                    ],
                },
                costoEnvio: 70,
                ubicacion: "Col. Hato de enmedio",
                calificacion: 4,
                estado:null   
            }
        ],
        pedidoEntregados: [
            {
                id:5,
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
                costoEnvio: 60,
                ubicacion: "Aldea de Suyapa",
                calificacion: 4,
                estado:"entregado",   
            },
            {
                id:6,
                factura:{
                    id:6,
                    fecha: "12/7/10",
                    cliente: {
                        primerNombre: "Miriam",
                        primerApellido: "Martinez",
                        numTelefono:"5896-5235"
                    },
                    empresa:{
                        nombre: "Nike",
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
                    ],
                },
                costoEnvio: 70,
                ubicacion: "Col. Hato de enmedio",
                calificacion: 1,
                estado:"entregado",   
            }
        ],
        mensajes: [
            {
                encabezado: "¡Se le ha asignado un nuevo pedido, pedido#100!",
                contenido: "Por favor revise su apartado de tomados.",
                estado:true
            },
            {
                encabezado: "¡Se le ha asignado un nuevo pedido, pedido#10!",
                contenido: "Por favor revise su apartado de tomados.",
                estado:false
            },
        ]
    },

]

var repartidor;

//localstorage
var localstorage=window.localStorage;

const verificarLogin = () =>{
    console.log("Entra aqui");
    repartidor= repartidores.find(element => element.usuario===document.getElementById('usuario').value && document.getElementById('password').value===element.contrasena);
    console.log(repartidor);

    if(repartidor==undefined){
        document.getElementById('anchor-verificar-ingreso').removeAttribute('href');
        localstorage.removeItem('repartidor');
    }else{
        document.getElementById('anchor-verificar-ingreso').setAttribute('href','principal.html');
        localstorage.setItem('repartidor', JSON.stringify(repartidor));
    }

    document.getElementById('usuario').value="";
    document.getElementById('password').value="";
}
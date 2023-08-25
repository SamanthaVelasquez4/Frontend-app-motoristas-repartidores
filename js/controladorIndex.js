
var repartidor;

//localstorage
var localstorage=window.localStorage;
localstorage.removeItem('repartidor');
const modalWarning= new bootstrap.Modal(document.getElementById('modalWarning'));


const verificarLogin = async() =>{
    //console.log("Entra aqui");
    let body={
        usuario: document.getElementById('usuario').value,
        contrasena: document.getElementById('password').value
    }
    try{
        let respuesta = await fetch('http://localhost:5555/motoristas/login',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", //MIME type 
            },
            body: JSON.stringify(body)
        });

        let a = await respuesta.json();
        if(a.status){
            localstorage.setItem('repartidor', JSON.stringify(a.respuesta));
            window.location.href="principal.html"
        }else{
            localstorage.removeItem('repartidor');
            document.getElementById('usuario').value="";
            document.getElementById('password').value="";
            document.getElementById('error').style.display="block";
        }
    }catch{
        modalWarning.show();
        console.log('entra aqui')
    }
}
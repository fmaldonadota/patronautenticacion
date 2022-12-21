
$( document ).ready(function() {


    $("#ingresar").click(function() {
        var usuario = $("#usuario").val();
        var password = $("#password").val();       
        login(usuario,password);
        document.getElementById("login").reset();
	});
    $( "#aceptar" ).click(function() {
        $('#mymodal').modal('hide');
        
    });
    $('#password').keyup(function (e) {
    
  });
});

function login(usuario,password){
    $.ajax({
        url: "controlador/login.php",
        data: {opcion: '1', usuario:usuario, password:password },
        type: 'get',
        dataType: 'json',
        success: function (verificacion) {
            if(verificacion>0){
                redireccion(usuario,password);
            }else{
               siBloqueado(usuario,password);
            }
            
        } 
    });
}

function redireccion(usuario,password){
     $.ajax({
        url: "controlador/login.php",
        data: {opcion: '2', usuario:usuario, password:password },
        type: 'get',
        dataType: 'json',
        success: function (json) {
            if (json[0].estado==1){
                window.location="autentificacion.html?u="+usuario+"";
            }else{
                 window.location="rautentificacion.html?u="+usuario+"";
            }
        } 
    });
}

function siBloqueado(usuario,password){
     $.ajax({
        url: "controlador/login.php",
        data: {opcion: '3', usuario:usuario, password:password },
        type: 'get',
        dataType: 'json',
        success: function (verificacion) {
            if(verificacion>0){
                $('#mymodal').modal('show');
                  $('#mensaje').text('- Su usuario se encuentra bloqueado - Comuniquese con el banco');
            }else{
                $('#mymodal').modal('show');
                 if (usuario=="" || password==""){
                    $('#mensaje').text('Ingrese un Usuario y Clave');
                }else{
                    $('#mensaje').text('Usuario o clave incorrecta');  
                }
            }
        } 
    });
}




function nobackbutton(){
   window.location.hash="no-back-button";
   window.location.hash="Again-No-back-button" //chrome
   window.onhashchange=function(){window.location.hash="no-back-button";}
}

function enter(evt){
  var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode === 13) {
        var usuario = $("#usuario").val();
        var password = $("#password").val();       
        login(usuario,password);
    }
}

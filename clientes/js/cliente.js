$( document ).ready(function() {
	enviarDatos();
});

function enviarDatos(){
	var usuario = getUrlParameter('u');
 	$.ajax({
		url: "controlador/cliente.php",
		type: "GET",
		data: {opcion: '1',usuario:usuario},
		success: function (data){
				procesaLlamada(jQuery.parseJSON(data));
		}
	});
}
function procesaLlamada(data) {
	var str= (data[0].nombres+ ' '+data[0].apellidos).toUpperCase();
	    $("#nombre").html(str);		
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
function nobackbutton(){
   window.location.hash="no-back-button";
   window.location.hash="Again-No-back-button" //chrome
   window.onhashchange=function(){window.location.hash="no-back-button";}
}
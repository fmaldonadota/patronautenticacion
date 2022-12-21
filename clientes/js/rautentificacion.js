$( document ).ready(function() {

	piezasAleatorias();
	obtenerPosiciones();

	$( "#ingresar" ).click(function() {
		obtenerAutentificacion();
	});
	$( "#cancelar" ).click(function() {
		location.reload();
		
	});
	$( "#aceptar" ).click(function() {
		$('#mymodal').modal('hide');
		
	});
	$( "#aceptar2" ).click(function() {
		window.location="index.html";
		
	});
	$( "#confirmar" ).click(function() {
		enviarDatos(matriz.slice(0,-1));
		
	});
  
});

var conte=0;
var numcajasusadas=0;
var jaladas;
var contJaladas=0;
var posiciones = new Array();
function piezasAleatorias(){
	

	var piezas 	= ["torre","caballo","alfil","rey","reina","peon"];
	var colores = ["b","n"];

	text="";
	for (i = 0; i = piezas.length; i++) {
			piezaAleatoria = Math.floor(Math.random()*(piezas.length)); 
			piezaSeleccionada = piezas[piezaAleatoria]; 
			piezas.splice(piezaAleatoria, 1); 
			colorAleatorio = Math.floor(Math.random()*(colores.length)); 
			color = colores[colorAleatorio]; 
	    text += '<div class="verPieza" id="'+piezaSeleccionada+'-'+color+'" draggable="true" ondragstart="drag(event)" ondblclick="cambiarColor(this)"><img id="'+piezaSeleccionada+'" src="piezas/'+piezaSeleccionada+'-'+color+'.png" draggable="false"></div>';
	}

	document.getElementById("piezas").innerHTML = text;
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    id=$(event.target).parent().attr("id");
    if(id=="piezas"){
    	jaladas=id;
    }else{
    	jaladas="tabla"
    }
}

function drop(ev) {
	id=$(event.target).attr("id");
	
	if(posiciones.contains(id)){
		if(jaladas=='piezas'){
			contJaladas++;
		}
		if (contJaladas<=4){
			ev.preventDefault();
		    var data = ev.dataTransfer.getData("text");
		    ev.target.appendChild(document.getElementById(data));
		}
		if (contJaladas>4){
			contJaladas=4;
			$('#mymodal').modal('show');
			$('#mensaje').text('Ya no se puede colocar mas piezas');
		}	
	}
}


function obtenerAutentificacion(){
	//var matriz = new Array();
	matriz="";
	cont=0;
	verificacion=0;
	for (i = 0; i <4; i++) {
		for (j = 0; j <4; j++) {
			if ($('#'+i+''+j).children().length > 0) {
				var children = $('#'+i+''+j).children().attr("id");
        		matriz+= i+';'+j+';'+children+'|';
        		verificacion++;
   			}
			//cont++;
		}
	}
	if (verificacion<4 || verificacion==0){
		$('#mymodal').modal('show');
		$('#mensaje').text('Ingese las todas las Cordenadas para la Autentificación');
	}
	if(verificacion==4){
		$('#mymodal2').modal('show');
	}
	
}

function cambiarColor(elemento) {
  	var id = $(elemento).attr("id");
  	var result = id.split('-');
  	if (result[1]=="n"){
  		cambio="b"
  	}
  	if (result[1]=="b"){
  		cambio="n"
  	}
  	var urlImagen="piezas/"+result[0]+"-"+cambio+".png";
	$("#"+result[0]).attr("src",urlImagen);
	$("#"+id).attr("id",result[0]+"-"+cambio);
}


function obtenerPosiciones(){

	var cont=0;
	for (i = 0; i <4; i++) {
		for (j = 0; j <4; j++) {
			posiciones[cont]=i+""+j;
			cont++;
		}
	}

}

Array.prototype.contains = function(element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
}

function enviarDatos(clave){
	var usuario = getUrlParameter('u');
 	$.ajax({
		url: "controlador/autentificacion.php",
		type: "GET",
		data: {opcion: '2',usuario:usuario,autentificacion:clave},
		success: function (json){
		console.log(json[0]);
		if (json[0]==1){
			$('#mymodal2').modal('hide');
			$('#mymodal3').modal('show'); 
            }
		}
	});
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
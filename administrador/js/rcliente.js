	$(document).ready(function(){
		verCliente();	
	});
	

	function verCliente(){

		$.ajax({
			url: "controlador/cliente.php",
			type: "GET",
			data: {opcion: '2'},
			success: function (data){
				procesaLlamada(jQuery.parseJSON(data));
			}
		});
		
	}

	function procesaLlamada(data) {
	    texto = "";
	    for (i = 0; i < data.length; i++) {
	        texto += '<tr>';
	        texto += '<td>' + data[i].cedula+ '</td>';
	        texto += '<td>' + data[i].nombres+ '</td>';
	        texto += '<td>' + data[i].apellidos+ '</td>';
	        texto += '<td>' + data[i].correo+ '</td>';
	        texto += '</tr>';
	    }
	    $("#tabla").html(texto);		
	}
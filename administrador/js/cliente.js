	
	$(document).ready(function(){

		$('#mensaje2').hide();
		$('#mensaje3').hide();
	    $("#passwordAleatoria").click(function() {
	  		$("#password").val(password(10));
		});
		$("#registrar").click(function() {
			validarFormulario();
		});
		$("#confirmar").click(function() {
			versiExiste();
	  		$('#mymodal').modal('hide');
		});
		$("#cancelar").click(function() {
	  		document.getElementById("formulario").reset();
		});
		$("#aceptar").click(function() {
	  		$('#mymodal1').modal('hide');
		});

	});


	function validarFormulario(){

		var cedula = document.getElementById('cedula').value;
		var apellidos = document.getElementById('apellidos').value;
		var nombres = document.getElementById('nombres').value;
		var correo = document.getElementById('correo').value;
		var usuario = document.getElementById('usuario').value;
		var password = document.getElementById('password').value;

		if(cedula=="" || apellidos=="" || nombres=="" || correo=="" || usuario=="" || password==""){
			$('#mymodal1').modal('show');
			$('#mensaje').text('Ingrese todos los datos para registrar al cliente');

		}else{
			$('#mymodal').modal('show');
		}	

	}


	function insertarUsuario(){
		
		var cedula = document.getElementById('cedula').value;
		var apellidos = document.getElementById('apellidos').value;
		var nombres = document.getElementById('nombres').value;
		var correo = document.getElementById('correo').value;
		var usuario = document.getElementById('usuario').value;
		var password = document.getElementById('password').value;

		$.ajax({
			url: "controlador/cliente.php",
			type: "GET",
			data: {opcion: '1',cedula:cedula,apellidos:apellidos,nombres:nombres,correo:correo,usuario:usuario,password:password},
			success: function (confirmacion){
				if(confirmacion>0){
					$('#mensaje3').hide();
					$('#mensaje2').show();
					document.getElementById("formulario").reset();
				}
			}
		});
	}

	function versiExiste(){
		
		var usuario = document.getElementById('usuario').value;

		$.ajax({
			url: "controlador/cliente.php",
			type: "GET",
			data: {opcion: '3',usuario:usuario},
			success: function (confirmacion){
				if(confirmacion==0){
					insertarUsuario();
				}else{
					$('#mensaje3').show();
					document.getElementById("formulario").reset();
				}
			}
		});
	}
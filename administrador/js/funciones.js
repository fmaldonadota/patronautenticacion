
function soloNumeros(evt){
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57))
  return false;

  return true;
}

function soloLetras(e){
   key = e.keyCode || e.which;
   tecla = String.fromCharCode(key).toLowerCase();
   letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
   especiales = "8-37-39-46";

   tecla_especial = false
   for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla)==-1 && !tecla_especial){
        return false;
    }
}

function soloLetrasMinusculas(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode < 97 || charCode > 122)
        return false;
}      

function password(Length) {

    Upper =  true;
    Numbers = true;
    Lower = true;
     
    if (!Upper && !Lower && !Numbers)
        return "";
 
    var Ret = "";
    var Num;
    var Repeat;
 
    Chars = 26 * 2 + 10;    //26 (a-z) + 26 (A-Z) + 10 (0-9)
    //a-z = 97-122
    //A-Z = 65-90
    //0-9 = 48-57
 
    for (i = 1; i <= Length; i++)
    {
        Repeat = false;
 
        Num = Math.floor(Math.random()*Chars);
 
        if (Num < 26)
            if (Lower)
                Ret = Ret + String.fromCharCode(Num + 97);
            else
                Repeat = true;
        else if (Num < 52)
            if (Upper)
                Ret = Ret + String.fromCharCode(Num - 26 + 65);
            else
                Repeat = true;
        else if (Num < 62)
            if (Numbers)
                Ret = Ret + String.fromCharCode(Num - 52 + 48);
            else
                Repeat = true;
 
        if (Repeat)
            i--;
    }
 
    return Ret;

}



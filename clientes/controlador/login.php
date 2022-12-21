<?php
require_once('../php/database.php');
if(isset($_GET['opcion'])){
    $opcion = $_GET['opcion'];
    switch ($opcion) {
        case "1":
            verificarUsuario();
        break;
        case "2":
            verEstado();
        break;
        case "3":
            verificarBloqueado();
        break;
    }
}
function verificarUsuario(){
	$pdo = Database::connect();
    $sql = "SELECT * from clientes where usuario='".$_GET['usuario']."' and password='".$_GET['password']."' and bloqueado=0 and intentos<3";
    $statement=$pdo->prepare($sql);
    $statement->execute();
    echo $statement->rowCount();
    Database::disconnect();
}

function verificarBloqueado(){
    $pdo = Database::connect();
    $sql = "SELECT * from clientes where usuario='".$_GET['usuario']."' and password='".$_GET['password']."' and bloqueado=1";
    $statement=$pdo->prepare($sql);
    $statement->execute();
    echo $statement->rowCount();
    Database::disconnect();
}

function verEstado(){
    $pdo = Database::connect();
    $sql = "SELECT estado from clientes where usuario='".$_GET['usuario']."' and password='".$_GET['password']."'";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    Database::disconnect();
    echo $json;   
}
?>
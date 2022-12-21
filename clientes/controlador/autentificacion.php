<?php

require_once('../php/database.php');

if(isset($_GET['opcion'])){
    $opcion = $_GET['opcion'];
    switch ($opcion) {
        case "1":
            verificarAutentificacion();
        break;
        case "2":
            insertarAutentificacion();
        break;
        case "3":
            verIntentos();
        break;
        case "4":
           insertarIntentos();
        break;
        case "5":
           bloquearCliente();
        break;
    }
}

function verificarAutentificacion(){

    $pdo = Database::connect();
    $sql = "SELECT * from clientes where usuario='".$_GET['usuario']."' and autentificacion='".$_GET['autentificacion']."'";
    $statement=$pdo->prepare($sql);
    $statement->execute();
    echo $statement->rowCount();
    Database::disconnect();
}

function insertarAutentificacion(){
	$pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "Update clientes set autentificacion='".$_GET['autentificacion']."',estado=1 where usuario='".$_GET['usuario']."'";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    echo $statement->rowCount();
    Database::disconnect();
}

function insertarIntentos(){
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "Update clientes set intentos=intentos+1 where usuario='".$_GET['usuario']."'";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    echo $statement->rowCount();
    Database::disconnect();
}
function bloquearCliente(){
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "Update clientes set bloqueado=1 where usuario='".$_GET['usuario']."'";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    echo $statement->rowCount();
    Database::disconnect();
}


function verIntentos(){
    $pdo = Database::connect();
    $sql = "SELECT intentos from clientes where usuario='".$_GET['usuario']."'";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    Database::disconnect();
    echo $json;   
}


?>
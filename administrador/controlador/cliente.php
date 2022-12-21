<?php

require_once('../php/database.php');

if(isset($_GET['opcion'])){
    $opcion = $_GET['opcion'];
    switch ($opcion) {
        case "1":
         insertarAutentificacion();
        break;
        case "2":
            verClientes();
        break;
        case "3":
            comprobarCliente();
        break;
    }
    
}

function insertarAutentificacion(){
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT clientes (cedula,apellidos,nombres,usuario,correo,password,estado) values(?,?,?,?,?,?,?)";
    $insetar = $pdo->prepare($sql);
    $insetar->execute(array($_GET['cedula'],$_GET['apellidos'],$_GET['nombres'],$_GET['usuario'],$_GET['correo'],$_GET['password'],0));
    echo $insetar->rowCount();
    Database::disconnect();

}

function verClientes(){
    $pdo = Database::connect();
    $sql = "SELECT cedula,nombres,apellidos,correo from clientes";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    Database::disconnect();
    echo $json; 
}

function comprobarCliente(){
    $pdo = Database::connect();
    $sql = "SELECT * from clientes where usuario='".$_GET['usuario']."'";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    echo $statement->rowCount();
    Database::disconnect();
}

?>
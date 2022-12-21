<?php
require_once('../php/database.php');
if(isset($_GET['opcion'])){
    $opcion = $_GET['opcion'];
    switch ($opcion) {
        case "1":
            verDatos();
        break;
    }
}
function verDatos(){
    $pdo = Database::connect();
    $sql = "SELECT nombres,apellidos from clientes where usuario='".$_GET['usuario']."'";
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    Database::disconnect();
    echo $json;   
}
?>
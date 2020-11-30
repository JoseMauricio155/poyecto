<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Allow, Access-Control-Allow-Origin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD");
header("Allow: GET, POST, PUT, DELETE, OPTIONS, HEAD");
require_once 'database.php';
require_once 'jwt.php';
if($_SERVER['REQUEST_METHOD']=="OPTIONS"){
    exit();
}

$header = apache_request_headers();
$jwt = trim($header['Authorization']);
switch (JWT::verify($jwt, CONFIG::SECRET_JWT)) {
    case 1:
        header("HTTP/1.1 401 Unauthorized");
        echo "El token no es válido";
        exit();
        break;
    case 2:
        header("HTTP/1.1 408 Request Timeout");
        echo "La sesión caduco";
        exit();
        break;
}
//Si no entra ni en uno ni en dos pasa aquí abajo
switch($_SERVER['REQUEST_METHOD']){
    case "GET":
        if(isset($_GET['id'])){
            $productos = new DataBase('operacion');
            $where = array('id_producto'=>$_GET['id']);
            $res = $productos->Read($where);
        }else{
            $productos = new DataBase('operacion');
            $res = $productos->ReadAll();
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
    case "POST":
        if(isset($_POST['id_producto'])&& isset($_POST['tipo'])&& isset($_POST['cantidad'])){
            
            $productos = new DataBase('operacion');
            $datos = array(
                'id_producto'=>$_POST['id_producto'],
                'tipo'=>$_POST['tipo'],
                'cantidad'=>$_POST['cantidad'],
                'fecha'=>date("Y-m-d H:i:s") 
            );
            try{
                $reg = $productos->create($datos);
                $res = array("result"=>"ok","msg"=>"Se guardo el producto en inventario", "id"=>$reg);
            }catch(PDOException $e){
                $res = array("result"=>"no","msg"=>$e->getMessage());
            }
        
        }else{
            $res = array("result"=>"no","msg"=>"Faltan datos");
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
    
    default:
        header("HTTP/1.1 401 Bad Request");
}
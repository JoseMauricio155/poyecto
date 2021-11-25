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
        if(isset($_GET['id_venta'])){
            $productos = new DataBase('ventas');
            $where = array('id_venta'=>$_GET['id_venta']);
            $res = $productos->Read($where);
        }else{
            $productos = new DataBase('ventas');
            $res = $productos->ReadAll();
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
    case "POST":
        if(isset($_POST['total'])){
            
            $productos = new DataBase('ventas');
            $datos = array(
                'total'=>$_POST['total'],
                'fecha'=>date("Y-m-d H:i:s") 
            );
            try{
                $reg = $productos->create($datos);
                $res = array("result"=>"ok","msg"=>"Se realizo la venta", "id"=>$reg);
            }catch(PDOException $e){
                $res = array("result"=>"no","msg"=>$e->getMessage());
            }
        
        }else{
            $res = array("result"=>"no","msg"=>"Faltan datos");
        }
        header("HTTP/1.1 200 OK");
        echo json_encode($res);
    break;
    case "PUT":
       
    break;
    case "DELETE":
        if(isset($_GET['id'])){
            
            $productos = new DataBase('inventario');
            $where = array('id_producto'=>$_GET['id']);
            $reg = $productos->delete($where);
            $res = array("result"=>"ok","msg"=>"Se elimino el producto", "num"=>$reg);
        
        }else{
            $res = array("result"=>"no","msg"=>"Faltan datos");
        }
        echo json_encode($res);
    break;
    default:
        header("HTTP/1.1 401 Bad Request");
    }
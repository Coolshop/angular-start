<?php
/**
 * User: Alessandro Vidotto
 * Date: 16/06/16
 * Time: 17:26
 */

session_start();

$token = $_POST['token'] ? $_POST['token'] : $_GET['token'];

$action = $_GET['action'];

if(!$token || $token!=$_SESSION['token']){
    throw new Exception();
}

$return = new stdClass();

switch($action){
    case 'list':
        $return = $_SESSION['data'];
        break;
    case 'add':
        if(!$_SESSION["data"]){
            $_SESSION["data"] = array();
        }
        $obj = new stdClass();
        $obj->title = $_POST['title'] ? $_POST['title'] : $_GET['title'];
        $obj->content = $_POST['content'] ? $_POST['content'] : $_GET['content'];
        $obj->id = uniqid();
        $_SESSION["data"][] = $obj;
        $return = $_SESSION['data'];
        break;
    case 'remove':
        $id = $_POST['id'] ? $_POST['id'] : $_GET['id'];
        $ele = false;
        foreach($_SESSION["data"] as $key => $val){
            if($val->id == $id){
                $ele = $key;
                break;
            }
        }
        if($ele!==false){
            array_splice($_SESSION["data"],$ele,1);
        }
        $return = $_SESSION['data'];
        break;
    default:
        throw new Exception();
        break;
}
echo json_encode($return);
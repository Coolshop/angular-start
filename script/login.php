<?php
/**
 * User: Alessandro Vidotto
 * Date: 16/06/16
 * Time: 17:14
 */

session_start();

$json = file_get_contents('php://input');
$post = json_decode($json);

$username = $post->username;
$password = $post->password;

$return = new stdClass();
if(!$username || !$password){
    throw new Exception();
}
if($password!=""){
    session_regenerate_id(true);
    $_SESSION["token"] = uniqid("cs_",true);
    $user = new stdClass();
    $user->username = $username;
    $return->token = $_SESSION["token"];
    $return->user = $user;
}

echo json_encode($return);
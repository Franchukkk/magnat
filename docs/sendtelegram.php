<?php
try {
    $userEmail =  $_POST["userEmail"];

} catch (\Throwable $th) {
        $userEmail = "ERROR IN MESSAGE";
}

$token = "6955843433:AAHq4PsIKlhlh9ED95MXctOJxMHziCney1Y";
$chat_id = 1398506404;

$userEmail = urlencode("$userEmail");



$urlQuery = "https://api.telegram.org/bot". $token ."/sendMessage?chat_id=". $chat_id ."&text=" . 
    "**НОВЕ ЗАМОВЛЕННЯ**". "%0A". "%0A".
    "E-mail покупця: ". $userEmail;


    
$result = file_get_contents($urlQuery);
?>


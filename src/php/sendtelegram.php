<?php
try {
    $userTel = $_POST["userTel"];

} catch (\Throwable $th) {
    $userTel = "ERROR IN MESSAGE";
}

$token = "6955843433:AAHq4PsIKlhlh9ED95MXctOJxMHziCney1Y"; // api телеграм бота
$chat_id = "-1001904336913";

$userTel = urlencode("$userTel");

$urlQuery = "https://api.telegram.org/bot". $token ."/sendMessage?chat_id=". $chat_id ."&text=" . 
    "<b>Передзвоніть мені</b>". "%0A". "%0A".
    "Номер покупця: <b>$userTel</b>";

$urlQuery .= "&parse_mode=HTML";
    
$result = file_get_contents($urlQuery);
?>


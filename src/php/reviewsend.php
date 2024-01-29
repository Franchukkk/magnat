<?php
// var_dump($_POST["userName"]);
try {
    $userName =  $_POST["userName"];
    $userFirstName =  $_POST["userFirstName"];
    $userReview =  $_POST["userReview"];
    $userRate =  $_POST["userRate"];

} catch (\Throwable $th) {
    $userName = "ERROR IN MESSAGE";
    $userFirstName = "ERROR IN MESSAGE";
    $userReview = "ERROR IN MESSAGE";
    $userRate = "ERROR IN MESSAGE";
}

$token = "6955843433:AAHq4PsIKlhlh9ED95MXctOJxMHziCney1Y"; // api телеграм бота
$chat_id = "-1001904336913";

var_dump($userName);


var_dump($userName);

$urlQuery = "https://api.telegram.org/bot". $token ."/sendMessage?chat_id=". $chat_id ."&text=" . 
    "<b>Коментар</b>%0A%0A".
    "Ім'я покупця: <b>$userName</b> %0A%0A".
    "Прізвище покупця: <b>$userFirstName</b> %0A%0A".
    "Оцінка: <b>$userRate</b> %0A%0A".
    "Коментар: <b>$userReview</b>";

$urlQuery .= "&parse_mode=HTML";
    
$result = file_get_contents($urlQuery);
?>




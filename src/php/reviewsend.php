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

// $userName = urlencode($userPhone);
// $userFirstName = urlencode($userEmail);
// $userReview = urlencode($userName);
// $userRate = urlencode($userFirstName);

var_dump($userName);

$urlQuery = "https://api.telegram.org/bot". $token ."/sendMessage?chat_id=". $chat_id ."&text=" . 
    "Коментар%0A%0A".
    "Ім'я покупця: ". $userName. "%0A". "%0A".
    "Прізвище покупця: ". $userFirstName. "%0A". "%0A".
    "Оцінка: ". $userRate. "%0A". "%0A".
    "Коментар: ". $userReview;


    
$result = file_get_contents($urlQuery);
?>




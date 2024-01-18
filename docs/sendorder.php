<?php
try {
    $userPhone =  $_POST["userPhone"];
    $userEmail =  $_POST["userEmail"];
    $userName =  $_POST["userName"];
    $userFirstName =  $_POST["userFirstName"];
    $paymenttype =  $_POST["paymenttype"];
    $deliveryMethod =  $_POST["deliveryMethod"];
    $city =  $_POST["city"];
    $postNumber =  $_POST["postNumber"];
    $phpObject = $_POST["orderProducts"];

} catch (\Throwable $th) {
    $userPhone = "ERROR IN MESSAGE";
    $userEmail = "ERROR IN MESSAGE";
    $userName = "ERROR IN MESSAGE";
    $userFirstName = "ERROR IN MESSAGE";
    $paymenttype = "ERROR IN MESSAGE";
    $deliveryMethod = "ERROR IN MESSAGE";
    $city = "ERROR IN MESSAGE";
    $postNumber = "ERROR IN MESSAGE";
    $jsonData = "ERROR IN MESSAGE";
    $phpObject = "ERROR IN MESSAGE";
}

$token = "6955843433:AAHq4PsIKlhlh9ED95MXctOJxMHziCney1Y"; // api телеграм бота
$chat_id = 1398506404;

$userPhone = urlencode("$userPhone");
$userEmail = urlencode("$userEmail");
$userName = urlencode("$userName");
$userFirstName = urlencode("$userFirstName");
$paymenttype = urlencode("$paymenttype");
$deliveryMethod = urlencode("$deliveryMethod");
$city = urlencode("$city");
$postNumber = urlencode("$postNumber");
$phpObject = urlencode("$phpObject");

echo($phpObject);

$urlQuery = "https://api.telegram.org/bot". $token ."/sendMessage?chat_id=". $chat_id ."&text=" . 
    "Замовлення". "%0A". "%0A".
    "Номер покупця: ". $userPhone. "%0A". "%0A".
    "E-mail покупця: ". $userEmail. "%0A". "%0A".
    "Ім'я покупця: ". $userName. "%0A". "%0A".
    "Прізвище покупця: ". $userFirstName. "%0A". "%0A".
    "Тип оплати: ". $paymenttype. "%0A". "%0A".
    "Метод доставки: ". $deliveryMethod. "%0A". "%0A".
    "місто: ". $city. "%0A". "%0A".
    "замовлення: ". $phpObject. "%0A". "%0A".
    "Номер відділення: ". $postNumber;


    
$result = file_get_contents($urlQuery);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="bg-order-popup">
        <a class="to-main" href="index.html"></a>
        <div class="orders-successful">
            <h2>ви успішно оформили замовлення!</h2><img src="img/галочка.svg" alt="" />
            <p>Ми звʼяжемося з вами найближчим часом для підтвердження замовлення.</p>
            <a class="btn-style-one" href="index.html">на головну</a>
        </div>
    </div>
</body>
</html>

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
    $phpObject = json_decode($_POST["orderProducts"]);

} catch (\Throwable $th) {
    $userPhone = "ERROR IN MESSAGE";
    $userEmail = "ERROR IN MESSAGE";
    $userName = "ERROR IN MESSAGE";
    $userFirstName = "ERROR IN MESSAGE";
    $paymenttype = "ERROR IN MESSAGE";
    $deliveryMethod = "ERROR IN MESSAGE";
    $city = "ERROR IN MESSAGE";
    $postNumber = "ERROR IN MESSAGE";
}

$token = "6955843433:AAHq4PsIKlhlh9ED95MXctOJxMHziCney1Y"; // api телеграм бота
$chat_id = "-1001904336913";

$userPhone = urlencode("$userPhone");
$userEmail = urlencode("$userEmail");
$userName = urlencode("$userName");
$userFirstName = urlencode("$userFirstName");
$paymenttype = urlencode("$paymenttype");
$deliveryMethod = urlencode("$deliveryMethod");
$city = urlencode("$city");
$postNumber = urlencode("$postNumber");

foreach ($phpObject as $item) {
    // Перевірка наявності ключа 'product'
    if (property_exists($item, 'product')) {
        $product = $item->product;  
        $productName = $product->head;
        $productColor = $item->color;
        $productSize = $item->size;
        $productQuantity = $item->quantity;

        // Додати інформацію про товар до тексту повідомлення з тегами форматування
        $textObj .= "Товар: <b>$productName</b>,%0A Колір: <b>$productColor</b>,%0A Розмір: <b>$productSize</b>,%0A Кількість: <b>$productQuantity</b>%0A%0A";
    }
}

// Оновлений фрагмент коду для відправки повідомлення з використанням HTML-підтримки
$urlQuery = "https://api.telegram.org/bot". $token ."/sendMessage?chat_id=". $chat_id ."&text=" . 
    "<b>Замовлення</b>%0A%0A".
    "Номер покупця: <b>$userPhone</b>%0A". "%0A".
    "E-mail покупця: <b>$userEmail</b>%0A". "%0A".
    "Ім'я покупця: <b>$userName</b>%0A". "%0A".
    "Прізвище покупця: <b>$userFirstName</b>%0A". "%0A".
    "Тип оплати: <b>$paymenttype</b>%0A". "%0A".
    "Метод доставки: <b>$deliveryMethod</b>%0A". "%0A".
    "Місто: <b>$city</b>%0A". "%0A".
    "Номер відділення: <b>$postNumber</b>%0A". "%0A".
    "$textObj";

// Додано параметр parse_mode=HTML
$urlQuery .= "&parse_mode=HTML";

$result = file_get_contents($urlQuery);

?>


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
            <h2>ваш номер телефону успішно передано!</h2><img src="img/галочка.svg" alt="" />
            <p>Дякуємо за співпрацю.</p>
            <a class="btn-style-one" href="index.html">на головну</a>
        </div>
    </div>
</body>
</html>

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


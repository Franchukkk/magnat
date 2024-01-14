<?php
// Получаем данные из POST-запроса
$myObjectJSON = $_POST['myObject'];

// Декодируем JSON строку в PHP ассоциативный массив
$myObject = json_decode($myObjectJSON, true);

// Теперь $myObject содержит переданный JavaScript объект
print_r($myObject);
?>

<?php
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $orders = json_decode(file_get_contents("php://input"));
  
    // Виведіть об'єкт orders
    print_r($orders);
  }
  
?>
<?php

$data = json_decode(file_get_contents('php://input'), true);


$jsonFile = 'scores.json';
$currentData = file_get_contents($jsonFile);
$arrayData = json_decode($currentData, true);


$arrayData[] = $data;


$newData = json_encode($arrayData, JSON_PRETTY_PRINT);
file_put_contents($jsonFile, $newData);


http_response_code(200);
?>

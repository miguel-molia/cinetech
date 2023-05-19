<?php

$username = "root";
$password = "root";
try {
    $bdd = new PDO("mysql:host=localhost;dbname=cinetech;charset=utf8mb4", $username, $password);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

?>
<?php

$servername = "mgabryelwm257.mysql.db:3306";
$username = "mgabryelwm257";
$password = "Marcin4455";
$dbname = "mgabryelwm257";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$url = isset($_REQUEST['domena'])?$_REQUEST['domena']:"";
$sql = "SELECT domena FROM MyClients WHERE domena='$url'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["domena"];
    }
} else {
    echo "0 results";
}

$conn->close();


?>
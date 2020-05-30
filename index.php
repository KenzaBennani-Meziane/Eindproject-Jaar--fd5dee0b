<center>

        <h3>Post aanmaken</h3>
        <form action="index.php" method="post" id="form">
            <input type="text" name="naam" placeholder="Naam"><br>
            <input type="text" name="coach" placeholder="Coach"><br>
            <textarea form="form" width="100" type="text" name="issue" placeholder="Text..."></textarea><br>
            <input type="submit" name="submit">
        </form>

</center>

<?php
$host = '127.0.0.1';
$db   = 'scrum';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
   PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
   PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
   PDO::ATTR_EMULATE_PREPARES   => false,
];
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
$result = $pdo->query('SELECT * FROM issues');

    foreach($result as $row){
        echo "Naam: " . $row['naam'] . ' ';
        echo "Issue: " . $row['issue'] .' ';
          $coach = $row['idCoach'];
          $resultCoaches = $pdo->query("SELECT * FROM COACHES WHERE ID= " . $coach);
          foreach($resultCoaches as $res) {
            echo "Coach: " . $res['naamCoach'] .' ';
          }
        echo "Tijd: " . $row['ArrivalDate'] . '<br>';
    }
?>
<?php
if(isset($_POST["submit"])){
    try {

        if(!empty($_POST["naam"]) && !empty($_POST["issue"]) && !empty($_POST["coach"]) ) {
            $stmt = $pdo->prepare(
                "INSERT INTO issues (naam, issue, idCoach)
                VALUES ('".$_POST["naam"]."', '".$_POST["issue"]."', '".$_POST["coach"]."');"
            );
            $stmt->execute();
            header("Location: index.php");
        } else {
            throw new Exception("Je hebt niet alles ingevult");
        }
    } catch (Exception $e) {
        echo "<p>Error: ".$e->getMessage()."</p>";
    }
}

?>

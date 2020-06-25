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
$resultIssues = $pdo->query('SELECT * FROM issues');

$test = NULL;

foreach($resultIssues as $r_Issues){

    $resultStudents = $pdo->query("SELECT * FROM STUDENTS WHERE naamStudent=  '".$r_Issues['naam']."' ");
      foreach($resultStudents as $r_Students) {
        echo "Student: " . $r_Students['naamStudent'] .' ';
        $test = (int)$r_Students['ID'];
      }

    echo "Issue: " . $r_Issues['issue'] .' ';

    $resultCoaches = $pdo->query("SELECT * FROM COACHES WHERE ID= " . $r_Issues['idCoach']);
      foreach($resultCoaches as $r_Coaches) {
        echo "Coach: " . $r_Coaches['naamCoach'] .' ';
      }

    echo "Tijd: " . $r_Issues['ArrivalDate'] . '<br>';
}
echo "test " . $test;

if(isset($_POST["submit"])){
  
    try {

        if(!empty($_POST["naam"]) && !empty($_POST["issue"]) && !empty($_POST["coach"]) ) {
            $stmt = $pdo->prepare(
                "INSERT INTO issues (naam, issue, idCoach, idStudent)
                VALUES (:naam, :issue, :idCoach, :idStudent );"
            );
            $stmt->execute(array(':naam' => $_POST['naam'], ':issue' => $_POST['issue'], ':idCoach' => $_POST['coach'], ':idStudent' => $test));
            header("Location: index.php");
        } else {
            throw new Exception("Je hebt niet alles ingevult");
        }
    } catch (Exception $e) {
        echo "<p>Error: ".$e->getMessage()."</p>";
    }
}

?>

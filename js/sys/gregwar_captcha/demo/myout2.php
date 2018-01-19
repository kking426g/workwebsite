<?php
session_start();
include(__DIR__ . '/../CaptchaBuilderInterface.php');
include(__DIR__ . '/../PhraseBuilderInterface.php');
include(__DIR__ . '/../CaptchaBuilder.php');
include(__DIR__ . '/../PhraseBuilder.php');

use Gregwar\Captcha\CaptchaBuilder;
    $builder = new CaptchaBuilder;
    $builder->build();
    $userInput = $_POST["userInput2"];
?>
<?php

// Example: storing the phrase in the session to test for the user
// input later
// $_SESSION['phrase'] = $builder->getPhrase();
?>
<?php echo $_POST["userInput2"];
?>
<?php
// var_dump($_SESSION['my_phrase']);
if($_SESSION['my_phrase']['form2']  == $userInput) {
    echo "ok";
}
else {
    echo "error";
}

?>

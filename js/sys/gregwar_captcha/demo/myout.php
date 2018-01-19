<?php
session_start();
include(__DIR__ . '/../CaptchaBuilderInterface.php');
include(__DIR__ . '/../PhraseBuilderInterface.php');
include(__DIR__ . '/../CaptchaBuilder.php');
include(__DIR__ . '/../PhraseBuilder.php');

use Gregwar\Captcha\CaptchaBuilder;
    $builder = new CaptchaBuilder;
    $builder->build();
    $userInput = $_POST["userInput"];
?>
<?php

// Example: storing the phrase in the session to test for the user
// input later
// $_SESSION['phrase'] = $builder->getPhrase();
?>
<?php echo $_POST["userInput"];
?>
<?php
// var_dump($_SESSION['my_phrase']);
if($_SESSION['my_phrase']['form1']  == $userInput) {
    echo "ok";
}

?>

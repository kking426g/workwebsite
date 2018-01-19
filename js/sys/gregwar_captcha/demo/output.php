<?php
session_start();
include(__DIR__ . '/../CaptchaBuilderInterface.php');
include(__DIR__ . '/../PhraseBuilderInterface.php');
include(__DIR__ . '/../CaptchaBuilder.php');
include(__DIR__ . '/../PhraseBuilder.php');

use Gregwar\Captcha\CaptchaBuilder;

// header('Content-type: image/jpeg');
$phraseBuilder = new Gregwar\Captcha\PhraseBuilder();

$phraseBuilder->build(4);

$builder = CaptchaBuilder::create(null, $phraseBuilder);

$builder->setMaxBehindLines(1);

$builder->build()->output();

$source = $_GET['namespace'];
$_SESSION['my_phrase'][$source]= $builder->getPhrase();

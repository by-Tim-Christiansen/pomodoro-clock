<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require 'vendor/autoload.php';

$email = $_POST['email'];
$message = $_POST['message'];

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
try {

    $mail->SMTPDebug = 2;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'hauke.grothues@gmail.com';
    $mail->Password = 'Pemonboys98';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    //Recipients
    $mail->setFrom("hauke.grothues@gmail.com", "Pomodoro-Timer User");
    $mail->addAddress('hauke.grothues@gmail.com', 'Hauke Grothues');

    //Content
    $mail->isHTML(true);
    $mail->Subject = "[Pomodoro Timer]";
    $mail->Body    = $message;
    $mail->AltBody = strip_tags($message);

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}

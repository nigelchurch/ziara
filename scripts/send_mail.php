<?php


ini_set('display_errors', 1);
error_reporting(E_ALL);


require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['query'];
    $quote = $_POST['last-quote'];

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'novaembeddedsmtp@gmail.com';
        $mail->Password = 'tmsg blkb nhbi yxqy';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        //Recipients
        $mail->setFrom($email, $name);
        // $mail->addAddress('andy@ziaraheritage.com');
        $mail->addAddress('ziaraheritage@gmail.com');
        // $mail->addAddress('nigelchurch@hotmail.com');

        $mail->addBCC('nigelchurch@hotmail.com');

        //Content
        $mail->isHTML(true);
        $mail->Subject = 'Msg from Ziara website about: ' . $subject;
        $mail->Body    = '<br>Last quote was:<br>' . $quote . '<br><br>User query is:<br>' . $message;

        $mail->send();

        header('Location: ../contact.html?status=success');

            
        } catch (Exception $e) {
            // Email sending failed
            header('Location: ../contact.html?status=failed');

    }

    exit();
}

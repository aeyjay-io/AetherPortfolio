<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

// ======================================
// ENVIRONMENT
// ======================================

$dotenv = Dotenv\Dotenv::createImmutable(
    __DIR__ . '/../'
);

$dotenv->load();


// ======================================
// SESSION / CSRF
// ======================================

session_start();

if (empty($_SESSION['csrf_token'])) {

    $_SESSION['csrf_token'] = bin2hex(
        random_bytes(32)
    );

}

// ======================================
// CONTACT FORM RATE LIMIT
// ======================================

$rateLimitSeconds = 60;

if (
    isset($_SESSION['contact_last_submission']) &&
    (time() - $_SESSION['contact_last_submission']) < $rateLimitSeconds
) {

    $remaining = $rateLimitSeconds -
        (time() - $_SESSION['contact_last_submission']);

    http_response_code(429);

    header(
        'Content-Type: application/json; charset=UTF-8'
    );

    echo json_encode([
        'success' => false,
        'message' =>
            'Please wait ' .
            $remaining .
            ' seconds before sending another message.'
    ]);

    exit;
}


// ======================================
// JSON RESPONSE HELPER
// ======================================

function jsonResponse(
    bool $success,
    string $message,
    int $statusCode = 200
): never {

    http_response_code($statusCode);

    header(
        'Content-Type: application/json; charset=UTF-8'
    );

    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);

    exit;
}


// ======================================
// CONTACT FORM HANDLER
// ======================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    jsonResponse(
        false,
        'Method Not Allowed.',
        405
    );

}


// ======================================
// CSRF PROTECTION
// ======================================

if (
    empty($_POST['csrf_token']) ||
    empty($_SESSION['csrf_token']) ||
    !hash_equals(
        $_SESSION['csrf_token'],
        (string) $_POST['csrf_token']
    )
) {

    jsonResponse(
        false,
        'Invalid security token.',
        403
    );

}


// ======================================
// HONEYPOT ANTI-BOT
// ======================================

if (!empty($_POST['website'] ?? '')) {

    jsonResponse(
        false,
        'Invalid submission.',
        400
    );

}


// ======================================
// GET FORM DATA
// ======================================

$name = trim(
    (string) ($_POST['name'] ?? '')
);

$email = trim(
    (string) ($_POST['email'] ?? '')
);

$projectType = trim(
    (string) ($_POST['project_type'] ?? '')
);

$budget = trim(
    (string) ($_POST['budget'] ?? '')
);

$timeline = trim(
    (string) ($_POST['timeline'] ?? '')
);

$message = trim(
    (string) ($_POST['message'] ?? '')
);


// ======================================
// NORMALIZE MESSAGE
// ======================================

$message = preg_replace(
    "/\r\n|\r|\n/",
    PHP_EOL,
    $message
) ?? '';


// ======================================
// INPUT LENGTH LIMITS
// ======================================

if (
    strlen($name) > 100 ||
    strlen($email) > 254 ||
    strlen($projectType) > 100 ||
    strlen($budget) > 100 ||
    strlen($timeline) > 100 ||
    strlen($message) > 5000
) {

    jsonResponse(
        false,
        'One or more fields are too long.',
        400
    );

}


// ======================================
// REQUIRED FIELD VALIDATION
// ======================================

if (
    $name === '' ||
    $email === '' ||
    $projectType === '' ||
    $budget === '' ||
    $timeline === '' ||
    $message === ''
) {

    jsonResponse(
        false,
        'Please complete all required fields.',
        400
    );

}


// ======================================
// EMAIL VALIDATION
// ======================================

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    jsonResponse(
        false,
        'Please enter a valid email address.',
        400
    );

}


// ======================================
// NAME VALIDATION
// ======================================

if (
    !preg_match(
        "/^[\p{L}\p{N}\s.'-]+$/u",
        $name
    )
) {

    jsonResponse(
        false,
        'Please enter a valid name.',
        400
    );

}


// ======================================
// EMAIL DESTINATION
// ======================================

$recipient = 'ajllanera.mmiv@gmail.com';


// ======================================
// EMAIL SUBJECT
// ======================================

$subject =
    'New Portfolio Contact — ' .
    $projectType;


// ======================================
// EMAIL CONTENT
// ======================================

$emailBody =
    "New message from your AetherPortfolio\n\n" .

    "Name: " . $name . "\n" .
    "Email: " . $email . "\n" .
    "Project Type: " . $projectType . "\n" .
    "Budget: " . $budget . "\n" .
    "Timeline: " . $timeline . "\n\n" .

    "Message:\n" .
    $message;


// ======================================
// SEND EMAIL USING SMTP
// ======================================

$mail = new PHPMailer(true);

try {

    // ==================================
    // SMTP CONFIGURATION
    // ==================================

    $mail->isSMTP();

    $mail->Host =
        $_ENV['SMTP_HOST'];

    $mail->SMTPAuth = true;

    $mail->Username =
        $_ENV['SMTP_USERNAME'];

    $mail->Password =
        $_ENV['SMTP_PASSWORD'];

    $mail->SMTPSecure =
        PHPMailer::ENCRYPTION_STARTTLS;

    $mail->Port =
        (int) $_ENV['SMTP_PORT'];


    // ==================================
    // SENDER
    // ==================================

    $mail->setFrom(
        $_ENV['SMTP_USERNAME'],
        'AetherPortfolio'
    );


    // ==================================
    // RECIPIENT
    // ==================================

    $mail->addAddress(
        $recipient
    );


    // ==================================
    // REPLY TO VISITOR
    // ==================================

    $mail->addReplyTo(
        $email,
        $name
    );


    // ==================================
    // EMAIL CONTENT
    // ==================================

    $mail->isHTML(false);

    $mail->Subject =
        $subject;

    $mail->Body =
        $emailBody;


    // ==================================
    // SEND
    // ==================================

    $mail->send();

    $_SESSION['contact_last_submission'] = time();


    // ==================================
    // SUCCESS RESPONSE
    // ==================================

    jsonResponse(
        true,
        'Message sent successfully!'
    );


} catch (Exception $e) {

    // ==================================
    // EMAIL FAILURE
    // ==================================

    jsonResponse(
        false,
        'Unable to send your message at this time.',
        500
    );

}
<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Get form values
    $name    = strip_tags(trim($_POST["name"]));
    $name    = str_replace(["\r", "\n"], " ", $name);

    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $number  = trim($_POST["number"]);
    $message = trim($_POST["message"]);

    // Validate fields
    if (empty($name) || empty($email) || empty($number) || empty($message) ||
        !filter_var($email, FILTER_VALIDATE_EMAIL)) {

        http_response_code(400);
        echo "Please fill all fields correctly.";
        exit;
    }

    // Your receiving email - CHANGE THIS
    $recipient = "your-email@example.com";

    // Email subject (since no subject field)
    $email_subject = "New Contact Form Message";

    // Email content
    $email_content  = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone Number: $number\n\n";
    $email_content .= "Message:\n$message\n";

    // Email headers
    $email_headers = "From: $name <$email>";

    // Send email
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank you! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Error sending message.";
    }

} else {
    http_response_code(403);
    echo "Invalid request.";
}

?>

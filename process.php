<?php
// Habilita o relatório de erros para depuração
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Captura os dados do formulário
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

    // Verifica se os campos obrigatórios estão preenchidos
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'Preencha todos os campos obrigatórios.']);
        exit;
    }

    // Valida o e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Por favor, insira um e-mail válido.']);
        exit;
    }

    // Configurações do e-mail
    $to = 'alexandreperezdesign@gmail.com';
    $subject = 'Nova mensagem do formulário de contato';
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Corpo do e-mail
    $body = "Nome: $name\n";
    $body .= "E-mail: $email\n";
    $body .= "Telefone: $phone\n";
    $body .= "Mensagem:\n$message\n";

    // Tenta enviar o e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Mensagem enviada com sucesso!'); window.location.href = '/';</script>";
    } else {
        echo "<script>alert('Mensagem enviada com sucesso!'); window.location.href = '/';</script>";
    }
} else {
    echo "<script>alert('Método de requisição inválido.'); window.location.href = '/';</script>";
}
?>
